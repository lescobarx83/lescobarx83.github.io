/**
 * ============================================================================
 * NOC KNOWLEDGE HUB — AUTOMATED GOOGLE DRIVE SYNC SCRIPT (scripts/sync-drive.js)
 * ============================================================================
 * Escanea la carpeta pública principal de Google Drive, descubre cada subcarpeta
 * (cada subcarpeta representa una Investigación Científica) y reconoce sus dos
 * archivos correspondientes:
 *  1. La Investigación Científica / Paper Técnico principal.
 *  2. Su Diccionario / Guía Conceptual y Divulgativa (inicia con 'Guía Conceptual y Divulgativa').
 * 
 * Uso:
 *   node scripts/sync-drive.js
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_FOLDER_ID = '1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK';
const ROOT_FOLDER_URL = `https://drive.google.com/embeddedfolderview?id=${ROOT_FOLDER_ID}#list`;
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'articles.json');

async function fetchHtml(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return await res.text();
}

async function fetchDocText(docId) {
  try {
    const res = await fetch(`https://docs.google.com/document/d/${docId}/export?format=txt`);
    if (res.ok) {
      const txt = await res.text();
      if (txt && txt.trim().length > 0) return txt;
    }
  } catch (e) {}

  // Fallback to ODT content.xml if format=txt is empty
  try {
    const res = await fetch(`https://docs.google.com/document/d/${docId}/export?format=odt`);
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      const tempPath = path.join(__dirname, `temp_${docId}.odt`);
      fs.writeFileSync(tempPath, buf);
      const child = require('child_process');
      try {
        child.execSync(`tar -xf "${tempPath}" content.xml`, { cwd: __dirname });
        const xmlPath = path.join(__dirname, 'content.xml');
        if (fs.existsSync(xmlPath)) {
          const xml = fs.readFileSync(xmlPath, 'utf8');
          const clean = xml.replace(/<text:p[^>]*>/g, '\n\n')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/&amp;/g, '&')
                           .replace(/&lt;/g, '<')
                           .replace(/&gt;/g, '>')
                           .replace(/&quot;/g, '"')
                           .replace(/&apos;/g, "'")
                           .replace(/[ \t]+/g, ' ')
                           .trim();
          fs.unlinkSync(tempPath);
          fs.unlinkSync(xmlPath);
          return clean;
        }
      } catch (err) {}
    }
  } catch (e) {}

  return '';
}

function parseDocSections(text) {
  if (!text) return { sections: [], references: [], abstract: '' };

  const lines = text.split('\n');
  const sections = [];
  let currentHeading = '';
  let currentContent = [];
  let abstract = '';

  // Extract Abstract / Resumen
  const absMatch = text.match(/(?:Resumen|Abstract)\s*\n+([\s\S]*?)(?=\n+(?:Palabras clave|Keywords|\d+\.|\d+\.\d+|1\.|Abstract))/i);
  if (absMatch) {
    abstract = absMatch[1].replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/^(\d+\.|\d+\.\d+|Pilar \d+:|Hipótesis \d+:|Glosario|Tabla Traductora)/i) && line.length < 140) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join('\n\n').replace(/\n\n+/g, '<br><br>')
        });
      }
      currentHeading = line;
      currentContent = [];
    } else if (line.match(/^(Referencias|Bibliografía)/i) && line.length < 50) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join('\n\n').replace(/\n\n+/g, '<br><br>')
        });
      }
      currentHeading = 'Referencias';
      currentContent = [];
    } else if (currentHeading) {
      if (line) currentContent.push(line);
    }
  }

  if (currentHeading && currentHeading !== 'Referencias') {
    sections.push({
      heading: currentHeading,
      content: currentContent.join('\n\n').replace(/\n\n+/g, '<br><br>')
    });
  }

  let references = [];
  const refIndex = text.indexOf('Referencias');
  if (refIndex !== -1) {
    const refBlock = text.substring(refIndex + 'Referencias'.length);
    references = refBlock.split(/\n\s*\n/)
      .map(r => r.replace(/\n/g, ' ').trim())
      .filter(r => r.length > 20 && !r.startsWith('Nota.') && !r.startsWith('Tabla'));
  }

  return { sections, references, abstract };
}

async function syncDrive() {
  console.log(`[DriveSync] Escaneando carpeta principal: ${ROOT_FOLDER_ID}...`);
  const rootHtml = await fetchHtml(ROOT_FOLDER_URL);

  // Discover subfolders
  const folderRegex = /id="entry-([a-zA-Z0-9_-]+)"[^>]*>.*?flip-entry-title">([^<]+)<\/div>/g;
  const folders = [];
  let match;
  while ((match = folderRegex.exec(rootHtml)) !== null) {
    folders.push({
      id: match[1],
      name: match[2].trim(),
      url: `https://drive.google.com/drive/folders/${match[1]}`
    });
  }

  console.log(`[DriveSync] Se encontraron ${folders.length} subcarpetas de investigación en Drive.`);

  const investigations = [];

  for (const folder of folders) {
    console.log(`\n--> Procesando subcarpeta: "${folder.name}" (${folder.id})...`);
    
    // Parse date and category from folder name if present
    const dateMatch = folder.name.match(/\(([0-9]{4}-[0-9]{2}-[0-9]{2})\)/);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

    let category = 'infra';
    let categoryLabel = 'Telecom & Infraestructura';
    let categoryLabel_en = 'Telecom & Infrastructure';

    const lower = folder.name.toLowerCase();
    if (lower.includes('fotónica') || lower.includes('terahercios') || lower.includes('fotónica')) {
      category = 'infra';
      categoryLabel = 'Telecom & Fotónica 6G';
      categoryLabel_en = 'Telecom & 6G Photonics';
    } else if (lower.includes('molecular') || lower.includes('adn') || lower.includes('iobnt')) {
      category = 'dev';
      categoryLabel = 'Nanotecnología & IoBNT';
      categoryLabel_en = 'Nanotechnology & IoBNT';
    } else if (lower.includes('neuromórfica') || lower.includes('isac') || lower.includes('6g-iot')) {
      category = 'infra';
      categoryLabel = 'Telecom & Redes 6G-IoT';
      categoryLabel_en = 'Telecom & 6G-IoT Networks';
    }

    // Read files inside this subfolder
    const subfolderUrl = `https://drive.google.com/embeddedfolderview?id=${folder.id}#list`;
    let subfolderHtml = '';
    try {
      subfolderHtml = await fetchHtml(subfolderUrl);
    } catch (e) {
      console.warn(`   No se pudo leer la subcarpeta ${folder.id}:`, e.message);
      continue;
    }

    const fileRegex = /id="entry-([a-zA-Z0-9_-]+)"[^>]*>.*?flip-entry-title">([^<]+)<\/div>/g;
    const files = [];
    let fMatch;
    while ((fMatch = fileRegex.exec(subfolderHtml)) !== null) {
      files.push({
        id: fMatch[1],
        title: fMatch[2].trim()
      });
    }

    console.log(`   Archivos encontrados en la subcarpeta: ${files.length}`);
    files.forEach(f => console.log(`    - ${f.title} (${f.id})`));

    // Identify the two files:
    // 1. Diccionario / Guía Conceptual y Divulgativa (inicia con 'Guía Conceptual y Divulgativa')
    // 2. La Investigación como tal (el Paper Técnico)
    let guideFile = files.find(f => f.title.toLowerCase().startsWith('guía conceptual'));
    let paperFile = files.find(f => !f.title.toLowerCase().startsWith('guía conceptual'));

    if (!paperFile && files.length > 0) paperFile = files[0];

    // Download & Parse Paper
    console.log(`   Descargando Paper Técnico: "${paperFile.title}"...`);
    const paperText = await fetchDocText(paperFile.id);
    const paperParsed = parseDocSections(paperText);

    // Download & Parse Guide (if present)
    let guideData = null;
    if (guideFile) {
      console.log(`   Descargando Diccionario/Guía: "${guideFile.title}"...`);
      const guideText = await fetchDocText(guideFile.id);
      const guideParsed = parseDocSections(guideText);
      guideData = {
        title: guideFile.title,
        title_en: guideFile.title,
        guideId: guideFile.id,
        guideUrl: `https://docs.google.com/document/d/${guideFile.id}/edit`,
        abstract: guideParsed.abstract || `Guía complementaria y diccionario conceptual para comprender la investigación sobre ${paperFile.title}.`,
        abstract_en: `Companion plain-language guide and conceptual dictionary for understanding ${paperFile.title}.`,
        sections: guideParsed.sections,
        references: guideParsed.references
      };
    }

    const cleanFolderTitle = folder.name.replace(/\([0-9]{4}-[0-9]{2}-[0-9]{2}\)/, '').trim();

    investigations.push({
      id: `inv-${folder.id.substring(0, 10)}`,
      folderId: folder.id,
      folderName: folder.name,
      driveLink: folder.url,
      date: date,
      category: category,
      categoryLabel: categoryLabel,
      categoryLabel_en: categoryLabel_en,
      readTime: '~20 min',
      doi: `REF: DRIVE-${folder.id.substring(0, 8).toUpperCase()}`,
      featured: investigations.length === 0,
      author: 'Leonardo Escobar',
      authorRole: 'Iniciativa Synesis Humano-IA & ICT Specialist',
      tags: [categoryLabel, 'Google Drive', 'Paper + Diccionario'],
      
      // Archivo 1: Paper Técnico
      title: paperFile.title,
      title_en: paperFile.title,
      paperId: paperFile.id,
      paperUrl: `https://docs.google.com/document/d/${paperFile.id}/edit`,
      abstract: paperParsed.abstract || `Investigación científica original documentada en Google Drive: ${cleanFolderTitle}.`,
      abstract_en: `Original scientific research documented in Google Drive: ${cleanFolderTitle}.`,
      sections: paperParsed.sections,
      references: paperParsed.references,

      // Archivo 2: Diccionario / Guía Conceptual
      guide: guideData
    });
  }

  if (investigations.length > 0) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(investigations, null, 2), 'utf8');
    console.log(`\n[DriveSync] ¡ÉXITO! Se actualizaron ${investigations.length} investigaciones en ${OUTPUT_FILE}`);
  } else {
    console.warn('[DriveSync] No se pudieron extraer carpetas.');
  }
}

syncDrive().catch(e => {
  console.error('[DriveSync] Error en sincronización:', e);
  process.exit(1);
});
