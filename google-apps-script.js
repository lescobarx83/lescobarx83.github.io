/**
 * ============================================================================
 * GOOGLE APPS SCRIPT — DRIVE KNOWLEDGE HUB BRIDGE (Code.gs)
 * ============================================================================
 * Instrucciones de Implementación (1 minuto, 100% gratuito y sin API Key):
 * 1. Abre https://script.google.com/home y crea un "Nuevo proyecto".
 * 2. Pega todo este código en el archivo `Code.gs`.
 * 3. Haz clic en "Implementar" -> "Nueva implementación".
 * 4. Tipo: "Aplicación web" (Web App).
 * 5. Ejecutar como: "Yo" (tu cuenta de Google).
 * 6. Quién tiene acceso: "Cualquier usuario" (Anyone).
 * 7. Copia la URL de la aplicación web resultante (termina en `/exec`).
 * 8. Pégala en `drive-sync.js` en el campo `gasBridgeUrl` o ingrésala en la web.
 * ============================================================================
 */

function doGet(e) {
  try {
    var rootFolderId = "1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK";
    var rootFolder = DriveApp.getFolderById(rootFolderId);
    var subfolders = rootFolder.getFolders();
    var investigations = [];

    while (subfolders.hasNext()) {
      var folder = subfolders.next();
      var folderName = folder.getName();
      var folderId = folder.getId();
      var folderUrl = folder.getUrl();

      // Fecha
      var dateMatch = folderName.match(/\(([0-9]{4}-[0-9]{2}-[0-9]{2})\)/);
      var date = dateMatch ? dateMatch[1] : Utilities.formatDate(folder.getLastUpdated(), "GMT", "yyyy-MM-dd");

      // Categoría
      var category = "infra";
      var categoryLabel = "Telecom & Redes 6G";
      var lower = folderName.toLowerCase();
      if (lower.indexOf("molecular") !== -1 || lower.indexOf("adn") !== -1 || lower.indexOf("iobnt") !== -1) {
        category = "dev";
        categoryLabel = "Nanotecnología & IoBNT";
      } else if (lower.indexOf("fotónica") !== -1 || lower.indexOf("terahercios") !== -1) {
        category = "infra";
        categoryLabel = "Telecom & Fotónica 6G";
      } else if (lower.indexOf("neuromórfica") !== -1 || lower.indexOf("isac") !== -1) {
        category = "infra";
        categoryLabel = "Telecom & Redes 6G-IoT";
      }

      // Archivos dentro de la subcarpeta
      var files = folder.getFiles();
      var paperFile = null;
      var guideFile = null;

      while (files.hasNext()) {
        var file = files.next();
        var fileName = file.getName();
        if (fileName.indexOf("Guía Conceptual") === 0 || fileName.indexOf("Guía Conceptual y Divulgativa") === 0) {
          guideFile = file;
        } else {
          paperFile = file;
        }
      }

      if (!paperFile && guideFile) {
        paperFile = guideFile;
        guideFile = null;
      }

      var invObj = {
        id: "inv-" + folderId.substring(0, 10),
        folderId: folderId,
        folderName: folderName,
        driveLink: folderUrl,
        date: date,
        category: category,
        categoryLabel: categoryLabel,
        categoryLabel_en: categoryLabel,
        readTime: "~20 min",
        doi: "REF: DRIVE-" + folderId.substring(0, 8).toUpperCase(),
        featured: investigations.length === 0,
        author: "Leonardo Escobar",
        authorRole: "Iniciativa Synesis Humano-IA & ICT Specialist",
        tags: [categoryLabel, "Google Drive", "Paper + Diccionario"],

        // 1. Archivo de Investigación Técnica
        title: paperFile ? paperFile.getName() : folderName,
        title_en: paperFile ? paperFile.getName() : folderName,
        paperId: paperFile ? paperFile.getId() : folderId,
        paperUrl: paperFile ? paperFile.getUrl() : folderUrl,
        abstract: "Investigación científica original sincronizada desde la subcarpeta de Google Drive: " + folderName + ".",
        abstract_en: "Original scientific research synchronized from Google Drive subfolder: " + folderName + ".",
        sections: [
          {
            heading: "Documento en Google Drive",
            content: "Investigación científica completa disponible en la subcarpeta oficial de Google Drive. Puedes abrir el documento original o consultar su Guía Conceptual y Diccionario complementario."
          }
        ],
        references: ["Google Drive Research Hub: Leonardo Escobar"],

        // 2. Archivo Diccionario / Guía Conceptual y Divulgativa
        guide: guideFile ? {
          title: guideFile.getName(),
          title_en: guideFile.getName(),
          guideId: guideFile.getId(),
          guideUrl: guideFile.getUrl(),
          abstract: "Guía conceptual y diccionario divulgativo para comprender la investigación de forma intuitiva con analogías y glosario.",
          abstract_en: "Companion conceptual guide and plain-language dictionary for intuitive understanding.",
          sections: [
            {
              heading: "Guía Conceptual y Diccionario",
              content: "Esta investigación incluye una guía conceptual y diccionario divulgativo redactado con analogías sencillas para comprender términos técnicos y modelos matemáticos."
            }
          ],
          references: ["Iniciativa Synesis Humano-IA"]
        } : null
      };

      investigations.push(invObj);
    }

    var output = JSON.stringify(investigations);
    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    var errorOutput = JSON.stringify({ error: err.toString() });
    return ContentService.createTextOutput(errorOutput).setMimeType(ContentService.MimeType.JSON);
  }
}
