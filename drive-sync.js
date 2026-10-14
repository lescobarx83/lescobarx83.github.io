/**
 * ============================================================================
 * NOC KNOWLEDGE HUB — GOOGLE DRIVE SYNC PIPELINE (drive-sync.js)
 * ============================================================================
 * Arquitectura de sincronización resiliente para portafolio técnico en GitHub Pages:
 * - SIN API Key de Google Cloud obligatoria (seguro y privado).
 * - Enlace directo a la carpeta compartida pública oficial:
 *   https://drive.google.com/drive/folders/1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK?usp=sharing
 * - Carga primaria: ./data/articles.json (con caché de 1 hora en localStorage).
 * - Fallback Embebido en JS (EMBEDDED_ARTICLES_FALLBACK): garantiza que el sitio
 *   funcione al 100% incluso al abrirse localmente vía file:/// sin servidor local.
 * - Soporte Opcional para Google Apps Script (gasBridgeUrl): permite leer
 *   subcarpetas semanales de Drive con formato "Título de la Investigación [cat] (YYYY-MM-DD)".
 * ============================================================================
 */

(function (window) {
    'use strict';

    const DRIVE_CONFIG = {
        // ID de la carpeta pública compartida de Google Drive
        folderId: '1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK',
        // URL pública canónica directa de la carpeta en Google Drive
        publicFolderUrl: 'https://drive.google.com/drive/folders/1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK?usp=sharing',
        // Puente opcional con Google Apps Script (Web App) para lectura dinámica sin API Key
        gasBridgeUrl: '', 
        // No se requiere API Key de Google Cloud
        apiKey: '', 
        // TTL de la caché en localStorage (1 hora)
        cacheTTL: 3600000,
        // Nombres de claves en localStorage (v2 para invalidar datos de prueba previos)
        cacheKey: 'noc_drive_articles_cache_v2',
        timestampKey: 'noc_drive_articles_timestamp_v2',
        settingsKey: 'noc_drive_sync_settings'
    };

    // Restaurar configuración personalizada si el usuario configuró gasBridgeUrl desde terminal
    try {
        const savedSettings = localStorage.getItem(DRIVE_CONFIG.settingsKey);
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            if (parsed.gasBridgeUrl) DRIVE_CONFIG.gasBridgeUrl = parsed.gasBridgeUrl;
            if (parsed.folderId) DRIVE_CONFIG.folderId = parsed.folderId;
        }
    } catch (e) {
        console.warn('[DriveSync] No se pudo leer configuración previa de localStorage:', e);
    }

    /**
     * Dataset Embebido de Respaldo:
     * Documentos de investigación reales alojados en la carpeta pública de Google Drive:
     * https://drive.google.com/drive/folders/1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK?usp=sharing
     * Subcarpeta: Inferencia Neuromórfica Over-the-Air y Comunicaciones Semánticas ISAC Asistidas por RIS en Redes 6G-IoT (2026-10-13)
     */
    const EMBEDDED_ARTICLES_FALLBACK = [
        {
            id: 'art-6g-isac-neuromorphic',
            title: 'Inferencia Neuromórfica Over-the-Air y Comunicaciones Semánticas Orientadas a Objetivos en Sistemas ISAC Asistidos por Metasuperficies Dispersivas para Redes 6G-IoT de Cero Energía',
            title_en: 'Goal-Oriented Semantic Communications and Over-the-Air Neuromorphic Inference in Dispersive Metasurface-Assisted ISAC Systems for Zero-Energy 6G-IoT Networks',
            category: 'infra',
            categoryLabel: 'Telecom & Redes 6G-IoT',
            categoryLabel_en: 'Telecom & 6G-IoT Networks',
            date: '2026-10-13',
            readTime: '18 min',
            doi: 'REF: 6G-ISAC-2026-01',
            featured: true,
            driveLink: 'https://drive.google.com/drive/folders/1GuH6Op6iSUKXhKaBDLBmGamLg-bVXFua',
            author: 'Leonardo Escobar',
            authorRole: 'ICT Engineer & Telecom Infrastructure Specialist',
            tags: ['6G-IoT', 'ISAC', 'Neuromorphic SNN', 'Over-the-Air Computation', 'RIS Metasurfaces', 'Semantic Communications', 'Cramér-Rao Bound', 'Zero-Energy IoT'],
            abstract: 'La evolución hacia las redes inalámbricas 6G y el IoT masivo exige la convergencia nativa de percepción electromagnética, transmisión orientada a tareas y computación en el borde. Sin embargo, los paradigmas basados en ANN convencionales y modulaciones ortogonales densas enfrentan cuellos de botella termodinámicos en nodos con presupuestos de microjulios. Este estudio investiga la intersección teórica entre sensado y comunicación integrados neuromórficos (N-ISAC), computación analógica en el aire (AirComp) asistida por superficies inteligentes reconfigurables (RIS) y comunicación semántica con consolidación sináptica continua.',
            abstract_en: 'The transition toward 6G wireless networks and massive IoT demands native convergence of electromagnetic sensing, task-oriented communication, and distributed edge computation. However, conventional continuous-valued ANNs and dense orthogonal modulations face severe thermodynamic bottlenecks on microjoule sensor nodes. This study investigates the theoretical intersection of neuromorphic integrated sensing and communications (N-ISAC), analog over-the-air computation (AirComp) assisted by reconfigurable intelligent surfaces (RIS), and goal-oriented semantic communications with continual synaptic consolidation.',
            sections: [
                {
                    heading: '1. Introducción y Planteamiento del Problema Científico',
                    content: 'El diseño clásico de sistemas inalámbricos ha operado durante más de siete décadas bajo el axioma de separación de Shannon, el cual optimiza la reconstrucción fiel de secuencias simbólicas a nivel de bit con independencia de su significado semántico o de su utilidad pragmática para la tarea de inferencia en el receptor (Calvanese Strinati et al., 2024; Zhang et al., 2025).<br><br>Con la llegada de la arquitectura IMT-2030 para redes 6G, se proyectan densidades de conexión superiores a 10⁷ dispositivos/km² y latencias de extremo a extremo inferiores a 1 ms, al tiempo que el sector de las TIC enfrenta el mandato de reducir sus emisiones de carbono en un 91% para 2050 mientras las redes de acceso por radio (RAN) consumen más del 70% de la energía de la infraestructura (Liu et al., 2026; Wen et al., 2024). En este escenario, ejecutar algoritmos convencionales de deep learning en el borde físico resulta inviable: una operación de multiplicación y acumulación (MAC) en punto flotante de 32 bits en CMOS de 45 nm consume ε_MAC = 4.6 pJ frente a solo ε_AC = 0.9 pJ (y hasta 0.1 pJ en hardware neuromórfico por eventos).'
                },
                {
                    heading: '2. Marcos Teóricos de Frontera (2024–2026) y Brechas del Estado del Arte',
                    content: 'La literatura reciente propone el paradigma de Sensado, Comunicación y Computación Integrados (ISCC / N-ISAC). No obstante, el análisis riguroso de las publicaciones 2024–2026 revela tres brechas fundamentales:<br><br><strong>(a) Incompatibilidad dispersiva en metasuperficies:</strong> La recepción e inferencia neuromórfica con neuronas biológicas Leaky Integrate-and-Fire (LIF) reduce la energía en un orden de magnitud (Deng et al., 2025; Park et al., 2026). Sin embargo, al acoplarse con superficies inteligentes reconfigurables (RIS) en bandas ultraanchas (IR-UWB), la respuesta Lorentziana resonante del metamaterial introduce dispersión temporal que distorsiona los pulsos de nanosegundos y degrada la tasa de error de bloque (BLER).<br><br><strong>(b) Degradación de la Cota de Cramér-Rao (CRB):</strong> En radares biestáticos bajo incertidumbre de símbolos, cuando los flujos transmitidos son trenes de impulsos semánticos comprimidos y no gaussianos, la capacidad de estimación cinemática sufre pérdidas de precisión.<br><br><strong>(c) Olvido catastrófico y deriva de fase:</strong> El desfasaje electromagnético en canales inalámbricos envejecidos bajo desplazamientos de distribución no estacionarios provoca la pérdida del conocimiento previamente consolidado en el borde.'
                },
                {
                    heading: '3. Formulación de Tres Hipótesis Científicas Falsables',
                    content: 'Para superar estas brechas, se formulan tres hipótesis científicas originales con modelos analíticos cerrados y umbrales cuantitativos de refutación:<br><br><strong>Hipótesis 1 (Dual-Q AirSNN-ISAC):</strong> Ajustar de manera conjunta el precodificador transmisor, el combinador receptor y la matriz de desfasaje de múltiples RIS permite emular analógicamente capas densas a la velocidad de la luz en el dominio electromagnético, reduciendo el error de inferencia por debajo del umbral de Shannon tradicional en un 38% bajo presupuestos de energía de microjulios.<br><br><strong>Hipótesis 2 (TTFS-CRB Desacoplada):</strong> El mapeo semántico en tiempo de primer disparo (Time-to-First-Spike, TTFS) preserva la matriz de información de Fisher para el radar biestático, garantizando cotas de error de posición sub-centimétricas incluso con secuencias ultra-esparsas.<br><br><strong>Hipótesis 3 (Bessel-FC con Consolidación Sináptica Continua):</strong> La regularización neuromórfica con funciones de base Bessel desacopla la deriva Doppler del canal respecto a los pesos sinápticos, eliminando el olvido catastrófico en canales vehiculares de alta velocidad.'
                },
                {
                    heading: '4. Ecuaciones Fundamentales del Modelo Físico-Matemático',
                    content: 'La superposición electromagnética en el canal analógico Over-the-Air (AirComp) implementa la suma de entradas ponderadas a través de la física de ondas:<br><br><code>y(t) = ∑_{k=1}^K h_k^T Φ g_k s_k(t) + w(t)</code><br><br>donde <code>Φ = diag(e^{jθ_1}, ..., e^{jθ_M})</code> representa la matriz de fases de la superficie inteligente reconfigurable (RIS), <code>s_k(t)</code> es el tren de impulsos temporales neuromórficos (LIF spikes) emitidos por los nodos IoT sensores, y <code>y(t)</code> es la señal agregada que llega directamente a la antena del receptor sin requerir decodificación intermedia de paquetes individuales.'
                },
                {
                    heading: '5. Conclusiones y Hoja de Ruta para Redes 6G de Cero Energía',
                    content: '1) La computación analógica en el aire convierte el canal inalámbrico de un obstáculo con desvanecimiento en un coprocesador matemático masivamente paralelo a coste energético cero.<br>2) La integración de codificación neuromórfica TTFS reduce la huella de transmisión a microjulios por ciclo de decisión, habilitando sensores IoT alimentados exclusivamente por recolección ambiental (Ambient RF & Solar Harvesting).<br>3) El documento completo, derivaciones formales de Fisher Information Matrix y código de simulación se encuentran resguardados en el repositorio oficial de Google Drive.'
                }
            ],
            references: [
                'Calvanese Strinati, E., et al. (2024). "Goal-Oriented and Semantic Communications for 6G: Architectures and Mathematical Foundations". IEEE Communications Surveys & Tutorials.',
                'Zhang, Y., et al. (2025). "Theoretical Limits and Waveform Design for Integrated Sensing and Communications (ISAC) in 6G Networks". IEEE Transactions on Wireless Communications.',
                'Liu, X., et al. (2026). "Neuromorphic Wireless Edge Computing: Energy-Harvesting Spiking Neural Networks and Over-the-Air Inference". IEEE Journal on Selected Areas in Communications.',
                'Wen, C., et al. (2024). "Integrated Sensing, Communication, and Computation (ISCC): A Unified Theoretical Framework". IEEE Transactions on Signal Processing.',
                'Deng, L., et al. (2025). "Spiking Neural Networks for Ultra-Low Power Edge Intelligence: Hardware-Algorithm Co-Design". Nature Communications / IEEE Micro.',
                'Park, S., et al. (2026). "Reconfigurable Intelligent Surfaces for Over-the-Air Computing: Frequency Dispersion and Analog Neural Emulation". IEEE Transactions on Signal Processing.',
                'Rivetti, M., et al. (2026). "Continual Learning at the Wireless Edge: Overcoming Catastrophic Forgetting in Non-Stationary Channels". IEEE Transactions on Machine Learning in Communications.',
                'Gupta, R., et al. (2024). "Zero-Energy IoT: Ambient Energy Harvesting and Event-Driven Neuromorphic Sensing". IEEE Internet of Things Journal.'
            ]
        },
        {
            id: 'art-6g-isac-guia-conceptual',
            title: 'Guía Conceptual y Divulgativa: Inferencia Neuromórfica Over-the-Air y Comunicaciones Semánticas ISAC Asistidas por RIS en Redes 6G-IoT',
            title_en: 'Conceptual & Plain-Language Guide: Over-the-Air Neuromorphic Inference and Semantic Communications for RIS-Assisted 6G-IoT ISAC',
            category: 'dev',
            categoryLabel: 'Divulgación & IA Neuromórfica',
            categoryLabel_en: 'Outreach & Neuromorphic AI',
            date: '2026-10-13',
            readTime: '12 min',
            doi: 'REF: 6G-GUIDE-2026-02',
            featured: false,
            driveLink: 'https://drive.google.com/drive/folders/1GuH6Op6iSUKXhKaBDLBmGamLg-bVXFua',
            author: 'Leonardo Escobar',
            authorRole: 'Iniciativa Synesis Humano-IA & ICT Specialist',
            tags: ['Divulgación Científica', '6G-IoT', 'Guía Conceptual', 'SNN', 'Analogías de Ingeniería', 'Zero-Energy', 'AirComp'],
            abstract: 'Guía complementaria redactada con analogías intuitivas de la vida cotidiana para comprender la convergencia de redes neuronales biológicas (SNN), radares de detección inalámbrica (ISAC), cálculo matemático por superposición de ondas en el aire (AirComp) y comunicaciones semánticas en el Internet de las Cosas masivo de sexta generación.',
            abstract_en: 'Companion guide written with intuitive real-world analogies to demystify the convergence of biological spiking neural networks (SNNs), wireless radar sensing (ISAC), wave-based analog over-the-air computation (AirComp), and goal-oriented semantic communications in massive 6G IoT networks.',
            sections: [
                {
                    heading: '1. Introducción Sencilla: ¿Qué Problema Resuelve esta Investigación?',
                    content: 'Imagina que en una ciudad del futuro cercano hay diez millones de diminutos sensores por cada kilómetro cuadrado: etiquetas del tamaño de una estampilla pegadas en puentes para detectar grietas, parches médicos en pacientes, sensores agrícolas en cultivos y semáforos conectados con vehículos autónomos. Para que todo ese ecosistema funcione, nuestras redes inalámbricas actuales tienen tres grandes problemas que parecen imposibles de resolver al mismo tiempo:<br><br>1. <strong>El derroche de energía de la IA actual:</strong> Los programas de inteligencia artificial convencionales funcionan como una calculadora gigantesca que nunca descansa; hacen millones de multiplicaciones por segundo incluso cuando no está pasando nada nuevo. Si pusiéramos esa inteligencia dentro de un sensor pequeño, su batería se agotaría en pocos minutos.<br><br>2. <strong>Enviar datos crudos en lugar de enviar significado:</strong> Hoy en día, las telecomunicaciones intentan copiar cada \'uno y cero\' de un archivo con precisión fotográfica, sin importar si esos datos sirven para tomar una decisión o si son puro relleno (por ejemplo, transmitir horas de video de una calle vacía cuando solo necesitamos saber si cruzó un peatón).<br><br>3. <strong>Tener sistemas separados para comunicar, vigilar el entorno y calcular:</strong> Tradicionalmente usamos un aparato para transmitir datos (como el Wi-Fi o el 5G), otro aparato distinto como radar para detectar objetos en movimiento, y un tercer aparato (un servidor informático) para procesar la información.<br><br>Esta investigación une por primera vez tres revoluciones científicas recientes (2024–2026) para que una <strong>sola onda de radio</strong> sea capaz de hacer las tres cosas a la vez —comunicar solo el significado importante, detectar objetos como un radar y realizar cálculos matemáticos mientras viaja por el aire— gastando apenas unas millonésimas de julio de energía.'
                },
                {
                    heading: '2. Los Cuatro Pilares Teóricos Explicados con Analogías de la Vida Cotidiana',
                    content: '<strong>Pilar 1: Computación Neuromórfica y Redes de Impulsos (El \'Timbre de Puerta\' frente a la \'Bombilla Encendida\')</strong><br>Las redes neuronales clásicas (ANN) funcionan como un edificio donde todas las bombillas deben estar permanentemente encendidas. En cambio, las redes de impulsos (SNN) imitan al cerebro humano: funcionan como un timbre de puerta; no consumen electricidad durante el 99% del tiempo, y solo emiten un brevísimo \'clic\' eléctrico en el instante exacto en que detectan un cambio relevante en el ambiente.<br><br><strong>Pilar 2: Sensado y Comunicación Integrados - ISAC (El \'Murciélago Inteligente\')</strong><br>Un murciélago emite chasquidos que rebotan en los insectos para ubicarlos en la oscuridad (radar) y al mismo tiempo usa esos mismos sonidos para coordinarse con su bandada (comunicación). ISAC unifica el radar y la radio en una sola señal electromagnética compartida.<br><br><strong>Pilar 3: Computación Analógica en el Aire - AirComp (La \'Sinfonía en el Aire\')</strong><br>Si diez personas cantan en coro, sus voces se combinan naturalmente en la sala sin que nadie tenga que sumar los decibelios en una hoja de papel. AirComp aprovecha la superposición de ondas electromagnéticas en el aire: la propia física suma las señales de miles de sensores a la velocidad de la luz.<br><br><strong>Pilar 4: Comunicación Semántica Orientada a Objetivos (Ideas en vez de Letras)</strong><br>Si quieres advertir a un conductor que se acerca un obstáculo, no necesitas transmitir una foto de 4K de 50 megabytes; basta con enviar el significado exacto: \'frenar en 15 metros\'. La comunicación semántica descarta todo lo irrelevante para la meta.'
                },
                {
                    heading: '3. Tabla Traductora: De Fórmulas Matemáticas a Conceptos Intuitivos',
                    content: '<code>Término Matemático / Formal  →  Significado Cotidiano Intuitivo\n---------------------------------------------------------------------------\nSNN (Spiking Neural Network)    →  Cerebro artificial que ahorra energía disparando solo ante novedades.\nISAC (Integrated Sensing & Comm) →  Una misma onda de radio que actúa como linterna-radar y mensajería.\nAirComp (Over-the-Air Comp.)   →  Suma matemática instantánea resuelta en el aire por la física de ondas.\nRIS (Reconfigurable Surfaces)   →  Espejo electromagnético inteligente que redirige y sintoniza ondas.\nCota de Cramér-Rao (CRB)        →  El límite físico de nitidez con que el radar puede ubicar un objeto.\nConsolidación Sináptica         →  Capacidad del sistema de aprender cosas nuevas sin olvidar lo viejo.</code>'
                },
                {
                    heading: '4. Glosario Accesible para Estudiantes e Ingenieros',
                    content: '<strong>Microjulio (µJ):</strong> Una millonésima parte de un julio; la energía minúscula que consume encender un LED durante una fracción de parpadeo.<br><strong>Zero-Energy IoT:</strong> Dispositivos que no requieren cambiar pilas ni enchufes; operan capturando energía residual de la luz solar, vibraciones o las propias ondas de radio del ambiente.<br><strong>Banda Ultraancha (IR-UWB):</strong> Transmisiones mediante pulsos electromagnéticos extremadamente cortos (nanosegundos) con altísima resolución espacial y bajo consumo de potencia.'
                }
            ],
            references: [
                'Iniciativa Synesis Humano-IA (2026). "Guía Conceptual y Divulgativa de Co-Investigación Científica".',
                'Calvanese Strinati, E., et al. (2024). "Goal-Oriented and Semantic Communications for 6G". IEEE Comms Surveys & Tutorials.',
                'Liu, X., et al. (2026). "Neuromorphic Wireless Edge Computing for 6G Massive IoT". IEEE JSAC.'
            ]
        }
    ];

    /**
     * Mapeo de categorías con etiquetas bilingües
     */
    function getCategoryLabel(cat, lang) {
        const labels = {
            'all': { es: 'Todos', en: 'All' },
            'infra': { es: 'Telecom & Redes 6G-IoT', en: 'Telecom & 6G-IoT Networks' },
            'dev': { es: 'Divulgación & IA Neuromórfica', en: 'Outreach & Neuromorphic AI' },
            'os': { es: 'Linux & OS', en: 'Linux & OS' },
            'db': { es: 'Bases de Datos & SQL', en: 'Databases & SQL' },
            'ideas': { es: 'Ideas & Opinión', en: 'Ideas & Opinion' }
        };
        return (labels[cat] && labels[cat][lang]) ? labels[cat][lang] : cat;
    }

    /**
     * Convierte los papers de papers-data.js al esquema unificado de artículos
     */
    function convertLegacyPapersToArticles() {
        if (typeof window.papersDatabase === 'undefined') return [];
        const result = [];
        const categoryMap = {
            'paper-ha': { cat: 'infra', label: 'Infraestructura & Telecom', label_en: 'Infrastructure & Telecom' },
            'paper-kunpeng': { cat: 'os', label: 'Linux & ARM64', label_en: 'Linux & ARM64' },
            'paper-opengauss': { cat: 'db', label: 'Bases de Datos & SQL', label_en: 'Databases & SQL' },
            'paper-websockets': { cat: 'dev', label: 'IA & Sockets', label_en: 'AI & Sockets' },
            'paper-hardening': { cat: 'os', label: 'Seguridad & Linux', label_en: 'Security & Linux' },
            'paper-datagov': { cat: 'ideas', label: 'Ideas & Opinión', label_en: 'Ideas & Opinion' },
            'paper-bbr': { cat: 'infra', label: 'Redes & Telecom', label_en: 'Networking & Telecom' },
            'paper-migration': { cat: 'infra', label: 'Arquitectura & Cloud', label_en: 'Architecture & Cloud' }
        };

        for (const [id, paper] of Object.entries(window.papersDatabase)) {
            const mapping = categoryMap[id] || { cat: 'infra', label: 'Infraestructura', label_en: 'Infrastructure' };
            result.push({
                id: id,
                title: paper.title,
                title_en: paper.title,
                category: mapping.cat,
                categoryLabel: mapping.label,
                categoryLabel_en: mapping.label_en,
                date: '2026-08-20',
                readTime: '~12 min',
                doi: paper.doi || 'REF: NOC-2026',
                featured: id === 'paper-ha',
                driveLink: DRIVE_CONFIG.publicFolderUrl,
                author: 'Leonardo Escobar',
                authorRole: 'ICT Engineer & Datacenter Specialist',
                tags: [mapping.label, 'Huawei', 'Enterprise'],
                abstract: paper.abstract,
                abstract_en: paper.abstract,
                sections: paper.sections || [],
                references: paper.references || []
            });
        }
        return result;
    }

    /**
     * Lee la caché de localStorage si aún es válida según el TTL
     */
    function getFromCache() {
        try {
            const cachedData = localStorage.getItem(DRIVE_CONFIG.cacheKey);
            const timestamp = localStorage.getItem(DRIVE_CONFIG.timestampKey);
            if (!cachedData || !timestamp) return null;

            const age = Date.now() - parseInt(timestamp, 10);
            // Si la caché contenía el ID de muestra antiguo, invalidar inmediatamente
            if (cachedData.includes('1-SAMPLE-DRIVE-FOLDER') || !cachedData.includes('1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK')) {
                localStorage.removeItem(DRIVE_CONFIG.cacheKey);
                localStorage.removeItem(DRIVE_CONFIG.timestampKey);
                return null;
            }

            if (age < DRIVE_CONFIG.cacheTTL) {
                const parsed = JSON.parse(cachedData);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn('[DriveSync] Error al leer caché:', e);
        }
        return null;
    }

    /**
     * Guarda artículos en la caché de localStorage
     */
    function saveToCache(articles) {
        try {
            localStorage.setItem(DRIVE_CONFIG.cacheKey, JSON.stringify(articles));
            localStorage.setItem(DRIVE_CONFIG.timestampKey, Date.now().toString());
        } catch (e) {
            console.warn('[DriveSync] Error al guardar caché en localStorage:', e);
        }
    }

    /**
     * Lee artículos desde el puente opcional de Google Apps Script (Web App)
     * Compatible con subcarpetas semanales: "Título del Paper [categoría] (YYYY-MM-DD)"
     */
    async function fetchFromGasBridge() {
        if (!DRIVE_CONFIG.gasBridgeUrl) return null;

        try {
            const response = await fetch(DRIVE_CONFIG.gasBridgeUrl, {
                method: 'GET',
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`GAS Bridge HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Si el puente devuelve directamente un array de artículos
            if (Array.isArray(data)) {
                return data;
            }
            if (data && Array.isArray(data.articles)) {
                return data.articles;
            }

            // Si el puente devuelve lista de carpetas semanales
            if (data && Array.isArray(data.folders)) {
                return data.folders.map(folder => {
                    // Parsear formato: "Título de la Investigación [cat] (YYYY-MM-DD)"
                    const rawName = folder.name || 'Sin Título';
                    let category = 'infra';
                    let date = new Date().toISOString().split('T')[0];
                    let cleanTitle = rawName;

                    const catMatch = rawName.match(/\[([a-zA-Z0-9]+)\]/);
                    if (catMatch) {
                        const candidateCat = catMatch[1].toLowerCase();
                        if (['infra', 'os', 'db', 'dev', 'ideas'].includes(candidateCat)) {
                            category = candidateCat;
                        }
                        cleanTitle = cleanTitle.replace(catMatch[0], '').trim();
                    }

                    const dateMatch = rawName.match(/\(([0-9]{4}-[0-9]{2}-[0-9]{2})\)/);
                    if (dateMatch) {
                        date = dateMatch[1];
                        cleanTitle = cleanTitle.replace(dateMatch[0], '').trim();
                    }

                    cleanTitle = cleanTitle.replace(/^[-_\s]+|[-_\s]+$/g, '');

                    return {
                        id: 'drive-' + (folder.id || Math.random().toString(36).substring(2, 9)),
                        title: cleanTitle,
                        title_en: cleanTitle,
                        category: category,
                        categoryLabel: getCategoryLabel(category, 'es'),
                        categoryLabel_en: getCategoryLabel(category, 'en'),
                        date: date,
                        readTime: '~10 min',
                        doi: `DRIVE:${(folder.id || 'NOC').substring(0, 8).toUpperCase()}`,
                        featured: false,
                        driveLink: folder.url || `https://drive.google.com/drive/folders/${folder.id}`,
                        author: 'Leonardo Escobar',
                        authorRole: 'ICT Engineer @ Huawei Technologies',
                        tags: ['Google Drive', getCategoryLabel(category, 'es')],
                        abstract: folder.description || `Investigación técnica documentada en Google Drive sobre ${cleanTitle}.`,
                        abstract_en: folder.description || `Technical research documented in Google Drive regarding ${cleanTitle}.`,
                        sections: [
                            {
                                heading: 'Documento en Google Drive',
                                content: `Esta publicación técnica está sincronizada desde el Google Drive oficial del autor. Puedes consultar los archivos originales, PDFs y diagramas en la carpeta de investigación.`
                            }
                        ],
                        references: ['Google Drive Knowledge Repository: Leonardo Escobar']
                    };
                });
            }
        } catch (err) {
            console.warn('[DriveSync] Falló conexión al puente de Google Apps Script:', err.message);
        }
        return null;
    }

    /**
     * Fallback estático a data/articles.json
     */
    async function fetchStaticFallback() {
        try {
            const resp = await fetch('data/articles.json');
            if (resp.ok) {
                const staticData = await resp.json();
                if (Array.isArray(staticData) && staticData.length > 0) {
                    return staticData;
                }
            }
        } catch (e) {
            // Se silencia error de CORS en protocolo file:/// y se activa el fallback embebido
            console.info('[DriveSync] fetch(data/articles.json) no disponible (protocolo local). Utilizando EMBEDDED_ARTICLES_FALLBACK.');
        }
        return null;
    }

    /**
     * API Pública del Módulo DriveSync
     */
    const DriveSync = {
        config: DRIVE_CONFIG,

        /**
         * Obtiene todos los artículos unificados con tolerancia total a fallos:
         * 1. Caché local (localStorage)
         * 2. Puente Google Apps Script (si está configurado)
         * 3. Archivo data/articles.json (HTTP/HTTPS)
         * 4. Dataset JS Embebido (EMBEDDED_ARTICLES_FALLBACK)
         * 5. Fusión con papersDatabase (papers-data.js)
         */
        async getArticles(forceRefresh = false) {
            if (!forceRefresh) {
                const cached = getFromCache();
                if (cached) {
                    return cached;
                }
            }

            let loadedArticles = [];

            // 1. Intentar puente Google Apps Script si está configurado
            if (DRIVE_CONFIG.gasBridgeUrl) {
                const gasArticles = await fetchFromGasBridge();
                if (gasArticles && gasArticles.length > 0) {
                    loadedArticles = gasArticles;
                }
            }

            // 2. Intentar cargar data/articles.json
            const staticArticles = await fetchStaticFallback();
            if (staticArticles && staticArticles.length > 0) {
                const existingIds = new Set(loadedArticles.map(a => a.id));
                for (const art of staticArticles) {
                    if (!existingIds.has(art.id)) {
                        loadedArticles.push(art);
                        existingIds.add(art.id);
                    }
                }
            }

            // 3. Si por seguridad local (file:///) no se cargó articles.json, recurrir al fallback embebido
            if (loadedArticles.length === 0) {
                loadedArticles = [...EMBEDDED_ARTICLES_FALLBACK];
            }

            // 4. Solo investigaciones auténticas de Google Drive (no se inyectan papers legados o inventados)

            // Guardar en caché y retornar
            saveToCache(loadedArticles);
            return loadedArticles;
        },

        /**
         * Busca un artículo por su ID
         */
        async getArticleById(id) {
            const articles = await this.getArticles();
            return articles.find(a => a.id === id) || null;
        },

        /**
         * Retorna la URL pública de la carpeta en Google Drive
         */
        getPublicFolderUrl() {
            return DRIVE_CONFIG.publicFolderUrl;
        },

        /**
         * Retorna la estampa de tiempo de la última sincronización
         */
        getLastSyncDate() {
            const ts = localStorage.getItem(DRIVE_CONFIG.timestampKey);
            if (!ts) return null;
            return new Date(parseInt(ts, 10));
        },

        /**
         * Fuerza una sincronización inmediata
         */
        async syncNow() {
            localStorage.removeItem(DRIVE_CONFIG.cacheKey);
            localStorage.removeItem(DRIVE_CONFIG.timestampKey);
            const freshArticles = await this.getArticles(true);
            window.dispatchEvent(new CustomEvent('noc-drive-synced', { detail: { articles: freshArticles } }));
            return freshArticles;
        },

        /**
         * Configura el puente de Google Apps Script u opciones de sincronización
         */
        configure(options = {}) {
            if (typeof options === 'string') {
                DRIVE_CONFIG.gasBridgeUrl = options;
            } else if (typeof options === 'object') {
                if (options.gasBridgeUrl !== undefined) DRIVE_CONFIG.gasBridgeUrl = options.gasBridgeUrl;
                if (options.folderId) DRIVE_CONFIG.folderId = options.folderId;
            }

            localStorage.setItem(DRIVE_CONFIG.settingsKey, JSON.stringify({
                gasBridgeUrl: DRIVE_CONFIG.gasBridgeUrl,
                folderId: DRIVE_CONFIG.folderId
            }));

            return this.syncNow();
        }
    };

    window.DriveSync = DriveSync;

})(window);
