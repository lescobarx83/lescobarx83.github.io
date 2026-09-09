document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('datacenter-preloader');
    const keypadLed = document.getElementById('keypad-led-ring');
    const keypadStatus = document.getElementById('keypad-status-code');
    const fingerGlow = document.getElementById('fingerprint-glow');
    const arenaiRow = document.getElementById('arenai-slot-row');

    let currentLang = localStorage.getItem('lang') || 'es';

    // CHECK IF USER IS RETURNING FROM A PROJECT (ARENAI)
    const returnedFromProject = sessionStorage.getItem('returnedFromProject');

    if (returnedFromProject === 'true') {
        // =========================================================================
        // ANIMACIÓN B (RETORNO DE ARENAI): CONTINUIDAD FÍSICA Y ACOPLAMIENTO EN RACK
        // =========================================================================
        sessionStorage.removeItem('returnedFromProject');

        if (preloader) {
            preloader.classList.add('skip-doors');
        }

        // Turn on Spotlight & Illumination Immediately
        document.body.classList.add('spotlight-on');
        document.body.classList.remove('noc-power-off');
        document.body.classList.add('noc-power-on');

        // Step 1: Set Slot 01 to EXTRACTED OUTWARD state INITIAL STATE (so it's pulled out when page loads)
        if (arenaiRow) {
            arenaiRow.classList.add('blade-ejected-waiting');
        }

        // Step 2: Smooth Scroll to Rack Section
        const rackSection = document.getElementById('rack');
        if (rackSection) {
            rackSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Step 3: Trigger Mechanical Slide-In & Lock-In Insertion ONLY WHEN ARRIVED AT THE RACK
        setTimeout(() => {
            if (arenaiRow) {
                arenaiRow.classList.remove('blade-ejected-waiting');
                arenaiRow.classList.add('blade-inserting');
                setTimeout(() => {
                    arenaiRow.classList.remove('blade-inserting');
                }, 1000);
            }
        }, 650);

    } else {
        // =========================================================================
        // ANIMACIÓN A (INICIO / RECARGA): PUERTAS DE CRISTAL + FOCO DEL TECHO
        // =========================================================================
        if (preloader) {
            // Step 1: Biometric Scanning Phase (400ms)
            setTimeout(() => {
                if (keypadStatus) keypadStatus.textContent = 'VERIFICANDO...';
                if (fingerGlow) fingerGlow.style.opacity = '1';
            }, 400);

            // Step 2: Access Granted Phase (1100ms)
            setTimeout(() => {
                if (keypadLed) {
                    keypadLed.className = 'keypad-led-ring led-green';
                }
                if (keypadStatus) {
                    keypadStatus.textContent = 'ACCESO OK';
                    keypadStatus.style.color = 'var(--accent-emerald)';
                }
            }, 1100);

            // Step 3: OPEN GLASS DOORS FIRST (1600ms) - Doors slide apart smoothly into the dark hallway
            setTimeout(() => {
                preloader.classList.add('opened');
            }, 1600);

            // Step 4: AFTER DOORS ARE FULLY OPENED (2750ms), TURN ON OVERHEAD CEILING SPOTLIGHT & ILLUMINATE INTERFACE
            setTimeout(() => {
                document.body.classList.add('spotlight-on');
                document.body.classList.remove('noc-power-off');
                document.body.classList.add('noc-power-on');
            }, 2750);

            // Step 5: Disappear preloader overlay AFTER sliding doors animation completes (3200ms)
            setTimeout(() => {
                preloader.classList.add('doors-done');
            }, 3200);
        }
    }

    // =========================================================================
    // ANIMACIÓN B (IDA DE PORTAFOLIO A ARENAI): EXTRACTION MECÁNICA & ZOOM AL PUERTO
    // =========================================================================
    const arenaiTrigger = document.getElementById('arenai-slot-trigger');
    const teleportOverlay = document.getElementById('blade-teleport-overlay');

    if (arenaiTrigger && arenaiRow && teleportOverlay) {
        arenaiTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = arenaiTrigger.getAttribute('href');

            // Scroll focus onto the server rack so the ejection is centered
            const rackSection = document.getElementById('rack');
            if (rackSection) {
                rackSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Step 1: Clean 3D Blade Slot Slide Out & Lever Lock Open
            arenaiRow.classList.add('blade-eject-epic');
            
            // Step 2: Balanced Smooth Focus on Slot Entry
            setTimeout(() => {
                teleportOverlay.classList.add('active');
                document.body.classList.add('entering-arenai');
            }, 400);

            // Step 3: Set Return Flag & Navigate to ArenAI
            setTimeout(() => {
                sessionStorage.setItem('returnedFromProject', 'true');
                window.location.href = targetUrl;
            }, 1150);
        });
    }

    // Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Navigation Drawer Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Hero NOC Diagnostics Live Dynamic Telemetry Fluctuation
    const cpuEl = document.getElementById('hero-cpu');
    const cpuBar = document.getElementById('hero-cpu-bar');
    const ramEl = document.getElementById('hero-ram');
    const ramBar = document.getElementById('hero-ram-bar');
    const ioEl = document.getElementById('hero-io');
    const ioBar = document.getElementById('hero-io-bar');

    if (cpuEl && ramEl && ioEl) {
        setInterval(() => {
            // CPU Fluctuation (11% - 24%)
            const cpuVal = (11 + Math.random() * 13).toFixed(1);
            cpuEl.textContent = cpuVal + '%';
            if (cpuBar) cpuBar.style.width = cpuVal + '%';

            // RAM Fluctuation (17.8 GB - 21.4 GB / 64 GB)
            const ramVal = (17.8 + Math.random() * 3.6).toFixed(1);
            const ramPct = ((ramVal / 64) * 100).toFixed(1);
            ramEl.textContent = `${ramVal} GB / 64 GB`;
            if (ramBar) ramBar.style.width = ramPct + '%';

            // Disk I/O Fluctuation (12.1 MB/s - 29.8 MB/s)
            const ioVal = (12.1 + Math.random() * 17.7).toFixed(1);
            const ioPct = Math.min(100, (ioVal * 2.2)).toFixed(1);
            ioEl.textContent = `${ioVal} MB/s`;
            if (ioBar) ioBar.style.width = ioPct + '%';
        }, 2200);
    }

    // =========================================================================
    // SCROLL REVEAL ANIMATIONS — Premium Entry Effects
    // =========================================================================

    // Add reveal classes to sections and their child cards
    const revealSections = document.querySelectorAll('#featured-paper, #publications, #blueprints, #lobby');
    revealSections.forEach(section => {
        // Add reveal class to section header
        const header = section.querySelector('.header-center');
        if (header) header.classList.add('reveal-section');

        // Add reveal class to grid children
        const children = section.querySelectorAll('.featured-paper-card, .pub-card, .blueprints-container, .author-lobby-card, .hub-card');
        children.forEach(child => child.classList.add('reveal-child'));
    });

    // IntersectionObserver for section headers
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-section').forEach(el => sectionObserver.observe(el));

    // IntersectionObserver for staggered children
    const childObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? parent.querySelectorAll('.reveal-child') : [];
                let delay = 0;
                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) delay = i * 80;
                });
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                childObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal-child').forEach(el => childObserver.observe(el));

    // =========================================================================
    // NAV BACKGROUND SOLIDIFY ON SCROLL
    // =========================================================================
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navContainer.classList.add('scrolled');
            } else {
                navContainer.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // =========================================================================
    // NAV SCROLL-SPY (ACTIVE LINK ON SCROLL)
    // =========================================================================
    const spySections = document.querySelectorAll('section[id]');
    const inPageNavLinks = document.querySelectorAll('.nav-menu .nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 220;

        spySections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            inPageNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}` || (currentSectionId === 'featured-paper' && href === '#publications')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }, { passive: true });


    // =========================================================================
    // MAINTENANCE BANNER DISMISS LOGIC
    // =========================================================================
    const maintenanceBanner = document.getElementById('maintenance-banner');
    const dismissBtn = document.getElementById('dismiss-maintenance');

    if (maintenanceBanner && dismissBtn) {
        // Check if previously dismissed this session
        if (sessionStorage.getItem('maintenanceDismissed') === 'true') {
            maintenanceBanner.classList.add('dismissed');
        }

        dismissBtn.addEventListener('click', () => {
            maintenanceBanner.classList.add('dismissed');
            sessionStorage.setItem('maintenanceDismissed', 'true');
        });
    }

    // =========================================================================
    // HERO SUBTITLE TYPEWRITER EFFECT (BILINGUAL)
    // =========================================================================
    const typedLine = document.querySelector('.typed-line');
    const typingCursor = document.querySelector('.typing-cursor');

    const phrasesDict = {
        es: [
            'Research Papers, Guías de Campo & Arquitecturas',
            'openEuler, openGauss, Kunpeng & Alta Disponibilidad',
            'Sistemas Distribuidos, Sockets & Mitigación de Latencia',
            'Documentación Técnica basada en Infraestructura Real'
        ],
        en: [
            'Research Papers, Field Guides & Architectures',
            'openEuler, openGauss, Kunpeng & High Availability',
            'Distributed Systems, WebSockets & Latency Mitigation',
            'Technical Documentation grounded in Production Infrastructure'
        ]
    };

    if (typedLine) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;

        function typeWriter() {
            const activePhrases = phrasesDict[currentLang] || phrasesDict.es;
            const currentPhrase = activePhrases[phraseIndex % activePhrases.length];

            if (isDeleting) {
                typedLine.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 25;
            } else {
                typedLine.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 55;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2800; // Pause at full phrase
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % activePhrases.length;
                typeSpeed = 400; // Short pause before next phrase
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start typing after preloader finishes
        setTimeout(typeWriter, 3200);
    }

    // =========================================================================
    // AMBIENT PARTICLE FIELD (Floating datacenter dust motes)
    // =========================================================================
    const canvas = document.getElementById('particle-field');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 45;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedY = -(Math.random() * 0.3 + 0.1);
                this.speedX = (Math.random() - 0.5) * 0.15;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.fadeDirection = Math.random() > 0.5 ? 0.003 : -0.003;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += this.fadeDirection;

                if (this.opacity <= 0.05 || this.opacity >= 0.6) {
                    this.fadeDirection *= -1;
                }

                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                    this.y = canvas.height + 10;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // =========================================================================
    // DARK / LIGHT THEME TOGGLE
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (themeToggleBtn && themeIcon) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeIcon.setAttribute('name', 'sunny-outline');
        }

        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeIcon.setAttribute('name', 'sunny-outline');
            } else {
                localStorage.setItem('theme', 'dark');
                themeIcon.setAttribute('name', 'moon-outline');
            }
        });
    }

    // =========================================================================
    // ABOUT SIDEBAR TOGGLE
    // =========================================================================
    const aboutLink = document.querySelector('.nav-link[href="#about"]');
    const aboutSidebar = document.getElementById('about-sidebar');
    const aboutOverlay = document.getElementById('about-overlay');
    const sidebarClose = document.getElementById('sidebar-close');

    function openSidebar() {
        if(aboutSidebar && aboutOverlay) {
            aboutSidebar.classList.add('active');
            aboutOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    function closeSidebar() {
        if(aboutSidebar && aboutOverlay) {
            aboutSidebar.classList.remove('active');
            aboutOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if(aboutLink) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            openSidebar();
        });
    }

    if(sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if(aboutOverlay) aboutOverlay.addEventListener('click', closeSidebar);

    // =========================================================================
    // i18n LANGUAGE TOGGLE (ES/EN)
    // =========================================================================
    const langToggleBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');

    const i18nDict = {
        // Navigation
        'nav.home': { es: 'Inicio', en: 'Home' },
        'nav.publications': { es: 'Publicaciones & Papers', en: 'Publications & Papers' },
        'nav.blueprints': { es: 'Arquitecturas & Labs', en: 'Architectures & Labs' },
        'nav.lobby': { es: 'Lobby Portafolio', en: 'Portfolio Lobby' },
        'nav.cv': { es: 'CV Completo', en: 'Full CV' },
        
        // Hero Section
        'hero.badge': { es: '[ ENGINEERING RESEARCH &amp; FIELD NOTES ] &bull; DATACENTER &amp; ICT SYSTEMS', en: '[ ENGINEERING RESEARCH &amp; FIELD NOTES ] &bull; DATACENTER &amp; ICT SYSTEMS' },
        'hero.text': { 
            es: 'Portal de divulgación e investigación técnica en infraestructura de centro de datos, sistemas operativos empresariales (openEuler), motores de bases de datos de alto rendimiento (openGauss), arquitecturas distribuidas de alta disponibilidad y analítica de datos. Documentación de laboratorio, papers técnicos y metodologías aplicadas desde la experiencia en producción.', 
            en: 'Technical research and publication portal in datacenter infrastructure, enterprise operating systems (openEuler), high-performance database engines (openGauss), high-availability distributed architectures, and data analytics. Laboratory documentation, research papers, and applied production methodologies.' 
        },
        'hero.ctaExplore': { es: 'Explorar Publicaciones', en: 'Explore Publications' },
        'hero.ctaBlueprints': { es: 'Arquitecturas & Labs', en: 'Architectures & Labs' },
        'hero.ctaLobby': { es: 'Lobby al Portafolio', en: 'Portfolio Lobby' },
        'hero.diagTitle': { es: 'DATACENTER CLUSTER DIAGNOSTICS', en: 'DATACENTER CLUSTER DIAGNOSTICS' },
        'hero.diagCpu': { es: 'CPU LOAD (ENTERPRISE LINUX OS)', en: 'CPU LOAD (ENTERPRISE LINUX OS)' },
        'hero.diagRam': { es: 'MEMORY (DATABASE MATRIX CLUSTER)', en: 'MEMORY (DATABASE MATRIX CLUSTER)' },
        'hero.diagIo': { es: 'DISK I/O (NVMe SAS ARRAY)', en: 'DISK I/O (NVMe SAS ARRAY)' },

        // Publications Section
        'pub.tag': { es: 'Base de Conocimiento', en: 'Knowledge Base' },
        'pub.heading': { es: 'Publicaciones, Papers & Guías Técnicas', en: 'Publications, Papers & Technical Guides' },
        'pub.subtitle': { es: 'Artículos científicos, whitepapers, checklists de hardening y especificaciones de arquitectura derivadas de implementaciones reales.', en: 'Scientific articles, whitepapers, hardening checklists, and architecture specifications derived from real deployments.' },

        // Lobby Section
        'lobby.tag': { es: 'Punto de Acceso', en: 'Access Point' },
        'lobby.heading': { es: 'Lobby al Portafolio del Autor', en: 'Author Portfolio Lobby' },
        'lobby.subtitle': { es: 'Este knowledge hub técnico es documentado y mantenido por Leonardo Escobar. A continuación puedes explorar su portafolio profesional, plataformas interactivas y trayectoria laboral completa.', en: 'This technical knowledge hub is documented and maintained by Leonardo Escobar. Explore below his professional portfolio, interactive platforms, and full career track.' },
        'hero.log1': { es: '<span class="log-ok">[OK]</span> Hardware: High-Density Blade Chassis', en: '<span class="log-ok">[OK]</span> Hardware: High-Density Blade Chassis' },
        'hero.log2': { es: '<span class="log-ok">[OK]</span> Slot 01 Horizontal Blade: ArenAI Online', en: '<span class="log-ok">[OK]</span> Slot 01 Horizontal Blade: ArenAI Online' },
        'hero.log3': { es: '<span class="log-ok">[OK]</span> Global Rank: 3rd Place Global ICT Competition', en: '<span class="log-ok">[OK]</span> Global Rank: 3rd Place Global ICT Competition' },
        'hero.log4': { es: '<span class="log-ok">[OK]</span> Academic Honor: Cum Laude Probatus (ULACIT)', en: '<span class="log-ok">[OK]</span> Academic Honor: Cum Laude Probatus (ULACIT)' },

        // Awards Section
        'awards.tag': { es: 'Reconocimientos & Educación', en: 'Awards & Education' },
        'awards.heading': { es: 'Distinciones Internacionales & Formación', en: 'International Honors & Education' },
        'awards.subtitle': { es: 'Reconocimientos mundiales en competencias de tecnología e innovación y sólida formación académica con honores.', en: 'Global recognitions in technology & innovation competitions, coupled with high-honor academic excellence.' },
        'awards.card1Badge': { es: 'MUNDIAL 2024-2025', en: 'GLOBAL 2024-2025' },
        'awards.card1Title': { es: '3er Lugar Mundial - Cómputo & Servidores', en: '3rd Place Global - Computing & Servers' },
        'awards.card1Text': { 
            es: 'Galardonado con el <strong>3er Lugar a Nivel Mundial</strong> en la categoría de <strong>Computing</strong>, demostrando dominio técnico avanzado en la arquitectura de servidores <strong>Kunpeng Computing</strong>, el sistema operativo empresarial <strong>openEuler</strong> y la base de datos de misión crítica <strong>openGauss</strong>.', 
            en: 'Awarded <strong>3rd Place Worldwide</strong> in the <strong>Computing</strong> track, demonstrating advanced technical mastery in <strong>Kunpeng Computing</strong> server architecture, enterprise <strong>openEuler</strong> operating systems, and mission-critical <strong>openGauss</strong> relational databases.' 
        },
        'awards.card2Badge': { es: 'MUNDIAL 2025-2026', en: 'GLOBAL 2025-2026' },
        'awards.card2Title': { es: 'Semifinalista Mundial - Innovación & Desarrollo', en: 'Global Semifinalist - Innovation & Development' },
        'awards.card2Text': { 
            es: '<strong>Semifinalista Global</strong> en la categoría de <strong>Innovación</strong> con el proyecto <strong>ArenAI</strong>: plataforma creada para transformar y mejorar las condiciones de la educación en el entorno escolar y colegial latinoamericano mediante <strong>gamificación</strong> y modelos basados en investigaciones sobre la <strong>psicología de los adolescentes</strong>. Desarrollada en equipo por <strong>Leonardo Escobar</strong> (diseño gráfico, UI/UX y viabilidad económica), <strong>Yereth Soto Zúñiga</strong> (lógica del sistema y sockets) y <strong>Reishell Fernández</strong> (procesamiento cloud de IA y base creativa) con un stack de alta eficiencia que integra <strong>Node.js</strong>, <strong>Electron</strong>, <strong>TypeScript (TS)</strong>, <strong>JavaScript (JS)</strong>, <strong>Python</strong>, comunicación en tiempo real mediante <strong>Sockets / WebSockets</strong> y contenedores <strong>Docker</strong> para garantizar interactividad, baja latencia y estricta privacidad de datos en el aula.', 
            en: '<strong>Global Semifinalist</strong> in the <strong>Innovation</strong> track with the <strong>ArenAI</strong> project: an educational platform engineered to transform learning conditions across Latin American schools through <strong>gamification</strong> and research-backed models in <strong>adolescent psychology</strong>. Developed collaboratively by <strong>Leonardo Escobar</strong> (graphic design, UI/UX, and economic feasibility), <strong>Yereth Soto Zúñiga</strong> (system logic and sockets), and <strong>Reishell Fernández</strong> (cloud AI processing and creative direction) with a high-efficiency stack integrating <strong>Node.js</strong>, <strong>Electron</strong>, <strong>TypeScript (TS)</strong>, <strong>JavaScript (JS)</strong>, <strong>Python</strong>, real-time communication via <strong>Sockets / WebSockets</strong>, and <strong>Docker</strong> containers to ensure interactive engagement, low latency, and strict student data privacy in the classroom.' 
        },
        'awards.card3Badge': { es: 'GRADO CON HONORES', en: 'HONORS DEGREE' },
        'awards.card3Title': { es: 'Ingeniería Informática', en: 'Computer Science Engineering' },
        'awards.card3Univ': { es: 'Universidad Latinoamericana de Ciencias y Tecnología (ULACIT)', en: 'Latin American University of Science and Technology (ULACIT)' },
        'awards.card3Text': { 
            es: 'Graduado de Bachillerato en Ingeniería Informática con la distinción de honor <strong>Cum Laude Probatus</strong>. Estudios complementarios en <strong>Artes Humanísticas</strong> y dominio profesional del idioma <strong>Inglés B2+ / C1</strong>.', 
            en: 'Graduated with a Bachelor of Science in Computer Engineering with <strong>Cum Laude Probatus</strong> honors. Complementary studies in <strong>Humanistic Arts</strong> and professional English proficiency (B2+ / C1).' 
        },

        // Dedicated Spaces / Hub Section
        'hub.tag': { es: 'Explorar', en: 'Explore' },
        'hub.heading': { es: 'Espacios Dedicados', en: 'Dedicated Spaces' },
        'hub.subtitle': { es: 'Este portafolio es el punto de entrada. Cada área tiene su propio espacio, diseñado para lo que hace bien.', en: 'This portfolio is the entry point. Each area has its own dedicated space, engineered for its specific purpose.' },
        'hub.notesBadge': { es: '5 artículos', en: '5 articles' },
        'hub.notesTitle': { es: 'Notas Técnicas', en: 'Technical Notes' },
        'hub.notesDesc': { es: 'Artículos sobre openEuler, openGauss, alta disponibilidad, WebSockets y gobernanza de datos. Referencia real desde producción.', en: 'Articles on openEuler, openGauss, high availability, WebSockets, and data governance. Real production references.' },
        'hub.notesCta': { es: 'Explorar notas', en: 'Explore notes' },
        'hub.arenaiBadge': { es: '🏆 Semifinalista Mundial', en: '🏆 Global Semifinalist' },
        'hub.arenaiTitle': { es: 'ArenAI', en: 'ArenAI' },
        'hub.arenaiDesc': { es: 'Plataforma educativa con gamificación e inteligencia artificial para transformar el aprendizaje en el aula latinoamericana.', en: 'Educational platform with gamification and artificial intelligence to transform classroom learning in Latin America.' },
        'hub.arenaiCta': { es: 'Ver la plataforma', en: 'View platform' },
        'hub.cvBadge': { es: 'Huawei LATAM', en: 'Huawei LATAM' },
        'hub.cvTitle': { es: 'CV Interactivo', en: 'Interactive CV' },
        'hub.cvDesc': { es: 'Trayectoria profesional, certificaciones, habilidades técnicas y logros en formato interactivo. Descargable en PDF.', en: 'Professional career, certifications, technical skills, and achievements in interactive format. Downloadable as PDF.' },
        'hub.cvCta': { es: 'Ver CV completo', en: 'View full CV' },

        // Infrastructure Section
        'infra.tag': { es: 'Dominio Técnico', en: 'Technical Mastery' },
        'infra.heading': { es: 'Capacidades de Infraestructura & Servicios', en: 'Infrastructure & Services Capabilities' },
        'infra.subtitle': { es: 'Soluciones integrales desde el hardware de centro de datos hasta la analítica de datos y desarrollo de software.', en: 'Comprehensive solutions ranging from datacenter hardware to data analytics and software development.' },
        'infra.tier1Tag': { es: 'CÓMPUTO & STORAGE', en: 'COMPUTE & STORAGE' },
        'infra.tier1Title': { es: 'Servidores Blade & Cómputo de Alto Rendimiento', en: 'Blade Servers & High-Performance Computing' },
        'infra.tier1Text': { 
            es: 'Administración y despliegue de <strong>servidores blade</strong>, plataformas de <strong>cómputo de alto rendimiento</strong> (x86 & ARM), sistemas de <strong>almacenamiento empresarial (Storage SAN/NAS)</strong> y redes de datos de alta velocidad.', 
            en: 'Administration and deployment of <strong>blade servers</strong>, <strong>high-performance compute platforms</strong> (x86 & ARM), <strong>enterprise storage systems (SAN/NAS)</strong>, and high-speed data networks.' 
        },
        'infra.tier2Tag': { es: 'SISTEMAS OPERATIVOS', en: 'OPERATING SYSTEMS' },
        'infra.tier2Title': { es: 'Sistemas Operativos Enterprise & Virtualización', en: 'Enterprise Operating Systems & Virtualization' },
        'infra.tier2Text': { 
            es: 'Gestión exhaustiva de entornos Linux empresariales (SUSE Linux Enterprise, Red Hat) y Windows Server. Plataformas virtualizadas (KVM / Proxmox) y automatización con scripting.', 
            en: 'Comprehensive management of enterprise Linux distributions (SUSE Linux Enterprise, Red Hat) and Windows Server. Virtualized environments (KVM / Proxmox) and automation scripting.' 
        },
        'infra.tier3Tag': { es: 'BASES DE DATOS & SOFTWARE', en: 'DATABASES & SOFTWARE' },
        'infra.tier3Title': { es: 'Bases de Datos de Misión Crítica & Backend', en: 'Mission-Critical Databases & Backend' },
        'infra.tier3Text': { 
            es: 'Despliegue y optimización de motores de bases de datos relacionales y distribuidos (PostgreSQL y clusters de alta disponibilidad). Desarrollo de aplicaciones backend en <strong>Node.js</strong> con Docker.', 
            en: 'Deployment and optimization of relational and distributed database engines (PostgreSQL and HA clusters). Backend development in <strong>Node.js</strong> with Docker.' 
        },

        // Rack / Projects Section
        'rack.tag': { es: 'Despliegues de Hardware', en: 'Hardware Deployments' },
        'rack.heading': { es: 'Proyectos', en: 'Projects' },
        'rack.subtitle': { es: 'Gabinete de proyectos diseñado como réplica interactiva de chasis de servidor. Haz clic sobre ArenAI para ingresar a la plataforma.', en: 'Project cabinet engineered as an interactive server chassis replica. Click on ArenAI to enter the platform.' },
        'rack.actionExplore': { es: 'Explorar', en: 'Explore' },

        // Experience Section
        'exp.tag': { es: 'Trayectoria Profesional', en: 'Career Trajectory' },
        'exp.heading': { es: 'Experiencia en Huawei Technologies', en: 'Experience at Huawei Technologies' },
        'exp.subtitle': { es: '+2 años de trayectoria profesional en gestión de infraestructura, análisis de datos y servicios tecnológicos en Huawei Latinoamérica.', en: '+2 years of professional track record in infrastructure management, data analytics, and tech services at Huawei Latin America.' },
        'exp.role1Period': { es: 'Actualidad', en: 'Present' },
        'exp.role1Company': { es: 'Huawei Technologies — Latinoamérica', en: 'Huawei Technologies — Latin America' },
        'exp.role1Text': { 
            es: 'Liderazgo del ciclo de vida completo de plataformas de gestión críticas, garantizando la continuidad operativa desde la infraestructura física hasta la lógica backend. Implementaciones de extremo a extremo, resolución de incidentes con adhesión a SLAs y soporte de TI interdepartamental.', 
            en: 'End-to-end lifecycle management of mission-critical platforms, ensuring continuous operations from physical infrastructure up to backend logic. Full-stack implementations, SLA-driven incident resolution, and interdepartmental IT support.' 
        },
        'exp.role2Period': { es: 'Abril 2025 — Marzo 2026', en: 'April 2025 — March 2026' },
        'exp.role2Title': { es: 'SmartCare Engineer (Data Analyst)', en: 'SmartCare Engineer (Data Analyst)' },
        'exp.role2Company': { es: 'Huawei Technologies — Latinoamérica', en: 'Huawei Technologies — Latin America' },
        'exp.role2Text': { 
            es: 'Coadministración de plataforma de análisis de datos. Gobernanza de datos y desarrollo de recomendaciones estratégicas, presentando perspectivas accionables directamente a ejecutivos CXO para el desarrollo de negocios.', 
            en: 'Co-administration of the enterprise data analytics platform. Data governance and strategic insights modeling, presenting actionable business intelligence directly to CXO executives.' 
        },
        'exp.role3Period': { es: 'Abril 2024 — Mayo 2025', en: 'April 2024 — May 2025' },
        'exp.role3Title': { es: 'Engineer Intern', en: 'Engineer Intern' },
        'exp.role3Company': { es: 'Huawei Technologies — Latinoamérica', en: 'Huawei Technologies — Latin America' },
        'exp.role3Text': { 
            es: 'Coadministración de plataforma de telecomunicaciones virtualizada completa en entorno de alta disponibilidad (activo-activo). Gestión administrativa y resolución de problemas mediante sistema de tiquetes, manteniendo un tiempo de actividad del 100%.', 
            en: 'Co-management of a fully virtualized telecom platform in an active-active high-availability environment. System administration and ticket-based troubleshooting maintaining 100% uptime.' 
        },

        // Skills Section
        'skills.tag': { es: 'Competencias', en: 'Core Competencies' },
        'skills.heading': { es: 'Habilidades & Stack Técnico', en: 'Skills & Technical Stack' },
        'skills.subtitle': { es: 'Sistemas operativos, desarrollo de software, bases de datos e infraestructura de centro de datos.', en: 'Operating systems, software engineering, databases, and datacenter infrastructure.' },
        'skills.osTitle': { es: '<ion-icon name="terminal-outline"></ion-icon> Sistemas Operativos & Virtualización', en: '<ion-icon name="terminal-outline"></ion-icon> Operating Systems & Virtualization' },
        'skills.dbTitle': { es: '<ion-icon name="server-outline"></ion-icon> Bases de Datos & Backend', en: '<ion-icon name="server-outline"></ion-icon> Databases & Backend' },
        'skills.infraTitle': { es: '<ion-icon name="hardware-chip-outline"></ion-icon> Infraestructura & Redes', en: '<ion-icon name="hardware-chip-outline"></ion-icon> Infrastructure & Networking' },

        // Contact Section
        'contact.tag': { es: 'Conexión Directa', en: 'Direct Connection' },
        'contact.heading': { es: 'Contacto Profesional & Redes', en: 'Professional Contact & Networks' },
        'contact.subtitle': { es: 'Puedes contactarme directamente a través de LinkedIn para oportunidades profesionales o enviarme un correo electrónico.', en: 'You can reach out directly via LinkedIn for professional opportunities or send me an email.' },
        'contact.c1Label': { es: 'Contacto Principal', en: 'Primary Contact' },
        'contact.c1Title': { es: 'Perfil de LinkedIn', en: 'LinkedIn Profile' },
        'contact.c1Desc': { es: 'Mensajería directa y red profesional en LinkedIn.', en: 'Direct messaging and professional network on LinkedIn.' },
        'contact.c2Label': { es: 'Correo Electrónico Directo', en: 'Direct Email' },
        'contact.c2Desc': { es: 'Contacto por correo para consultas, proyectos o vacantes.', en: 'Email for inquiries, projects, or professional opportunities.' },
        'contact.c2Action': { es: 'Enviar correo a lescobar2004@gmail.com', en: 'Send email to lescobar2004@gmail.com' },
        'contact.c3Label': { es: 'Repositorios & Código', en: 'Repositories & Code' },
        'contact.c3Desc': { es: 'Proyectos, desarrollo de código y repositorios públicos.', en: 'Projects, code development, and public repositories.' },
        'contact.c4Label': { es: 'Idiomas de Contacto', en: 'Communication Languages' },
        'contact.c4Title': { es: 'Español e Inglés', en: 'Spanish & English' },
        'contact.c4Desc': { es: 'Acepto mensajes y comunicaciones en Español e Inglés.', en: 'I welcome inquiries and communications in both Spanish and English.' },
        'contact.c4Langs': { es: 'Español (Nativo) | English (B2+ / C1)', en: 'Spanish (Native) | English (B2+ / C1)' },

        // About Sidebar
        'about.tag': { es: 'Sobre Mí', en: 'About Me' },
        'about.heading': { es: 'Perfil Personal', en: 'Personal Profile' },
        'about.subtitle': { es: 'Más allá de la infraestructura: motivación, filosofía y visión.', en: 'Beyond infrastructure: motivation, philosophy, and vision.' },
        'about.quote': { es: '“More efficiency, less drama.”', en: '“More efficiency, less drama.”' },
        'about.quoteAuthor': { es: '— Core Philosophy', en: '— Core Philosophy' },
        'about.originTitle': { es: 'Background', en: 'Background' },
        'about.originText': { es: 'Mi trayectoria en la ingeniería comenzó con una curiosidad innata por la arquitectura de sistemas. Esta vocación analítica evolucionó hacia la infraestructura tecnológica, donde abordo cada desafío como un rompecabezas lógico y estructurado.', en: 'My engineering journey began with an innate curiosity for systems architecture. This analytical vocation naturally evolved towards technological infrastructure, where I approach every challenge as a logical, structured puzzle.' },
        'about.philosophyTitle': { es: 'Work Ethos', en: 'Work Ethos' },
        'about.philosophyText': { es: 'Eficiencia y rigor técnico. Mi enfoque se centra en la excelencia operativa. Concibo la optimización continua como un estándar, asegurando soluciones robustas y definitivas sin comprometer la calidad del despliegue.', en: 'Efficiency and technical rigor. My approach focuses on operational excellence. I view continuous optimization as a standard, ensuring robust and definitive solutions without compromising deployment quality.' },
        'about.visionTitle': { es: 'Future Vision', en: 'Future Vision' },
        'about.visionText': { es: 'Mi objetivo a mediano plazo es liderar la gestión estratégica de proyectos, donde mis decisiones de arquitectura e infraestructura generen un impacto cuantificable en la eficiencia organizacional.', en: 'My medium-term goal is to lead strategic project management, where my architectural and infrastructure decisions generate a quantifiable impact on organizational efficiency.' },
        'about.hobbiesTitle': { es: 'Off-Duty', en: 'Off-Duty' },
        'about.hobbiesText': { es: 'Más allá del ámbito tecnológico, cultivo el pensamiento estratégico mediante el gaming competitivo y la música, actividades que complementan la agilidad mental requerida en entornos críticos.', en: 'Beyond the technological realm, I cultivate strategic thinking through competitive gaming and music, activities that complement the mental agility required in mission-critical environments.' },

        // Footer
        'footer.bio': { es: 'ICT Engineer en Huawei Technologies Latinoamérica &bull; 3rd Place Global ICT Competition &bull; Cum Laude Probatus (ULACIT)', en: 'ICT Engineer at Huawei Technologies Latin America &bull; 3rd Place Global ICT Competition &bull; Cum Laude Probatus (ULACIT)' },
        'footer.rights': { es: '&copy; 2026 Leonardo Escobar. Todos los derechos reservados.', en: '&copy; 2026 Leonardo Escobar. All rights reserved.' }
    };

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18nDict[key] && i18nDict[key][lang]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = i18nDict[key][lang];
                } else {
                    el.innerHTML = i18nDict[key][lang];
                }
            }
        });
        if (langLabel) {
            langLabel.textContent = lang === 'es' ? 'EN' : 'ES';
        }
        document.documentElement.lang = lang;
    }

    if (langToggleBtn) {
        applyTranslations(currentLang);
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            localStorage.setItem('lang', currentLang);
            applyTranslations(currentLang);
        });
    }

    // =========================================================================
    // FEATURE-COMPLETE SIMULATED LINUX TERMINAL (NOC SHELL)
    // =========================================================================
    const terminalBtn = document.getElementById('terminal-toggle');
    const terminalModal = document.getElementById('terminal-modal');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalPrompt = document.querySelector('.terminal-prompt');
    const terminalTitle = document.querySelector('.terminal-title');

    if (terminalBtn && terminalModal && terminalInput && terminalOutput) {
        let cmdHistory = [];
        let historyIndex = -1;
        let currentPath = '/home/leonardo';
        let currentUser = 'leonardo';

        // Rich hierarchical file system with metadata
        let fileSystem = {
            '/': {
                type: 'dir',
                owner: 'root',
                perms: 'drwxr-xr-x',
                children: {
                    'home': {
                        type: 'dir',
                        owner: 'root',
                        perms: 'drwxr-xr-x',
                        children: {
                            'leonardo': {
                                type: 'dir',
                                owner: 'leonardo',
                                perms: 'drwxr-xr-x',
                                children: {
                                    '.bashrc': { type: 'file', owner: 'leonardo', perms: '-rw-r--r--', content: '# .bashrc\nalias ll="ls -la"\nalias cls="clear"\nexport PATH=$PATH:/usr/local/bin' },
                                    'about.txt': { type: 'file', owner: 'leonardo', perms: '-rw-r--r--', content: 'Leonardo Escobar\nICT Engineer & Infrastructure Specialist.\n\n"More efficiency, less drama."\nPassionate about datacenters, Linux, and high availability.' },
                                    'contact.txt': { type: 'file', owner: 'leonardo', perms: '-rw-r--r--', content: 'Email: lescobarx83@gmail.com\nLinkedIn: /in/leonardo-escobar-a4441a228\nGitHub: github.com/lescobarx83' },
                                    'certifications.txt': { type: 'file', owner: 'leonardo', perms: '-rw-r--r--', content: 'HCIA - Routing & Switching (Huawei)\nHCIA - Cloud Computing (Huawei)\nULACIT - Cum Laude Probatus' },
                                    'projects': {
                                        type: 'dir',
                                        owner: 'leonardo',
                                        perms: 'drwxr-xr-x',
                                        children: {
                                            'arenai_blade.md': { type: 'file', owner: 'leonardo', perms: '-rw-r--r--', content: '# ArenAI Blade\nPlataforma EdTech gamificada para colegios en Latinoamérica basada en psicología adolescente.\nStack: Node.js, Electron, TS, JS, Python, WebSockets y Docker.' },
                                            'datacenter_migration.txt': { type: 'file', owner: 'leonardo', perms: '-rw-r--r--', content: 'Migrated 50+ bare metal servers to VMware cluster with zero downtime.' }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'etc': {
                        type: 'dir',
                        owner: 'root',
                        perms: 'drwxr-xr-x',
                        children: {
                            'hostname': { type: 'file', owner: 'root', perms: '-rw-r--r--', content: 'noc-cr01.enterprise.internal' },
                            'resolv.conf': { type: 'file', owner: 'root', perms: '-rw-r--r--', content: 'nameserver 8.8.8.8\nnameserver 1.1.1.1' },
                            'passwd': { type: 'file', owner: 'root', perms: '-rw-r--r--', content: 'root:x:0:0:root:/root:/bin/bash\nleonardo:x:1000:1000:Leonardo,,,:/home/leonardo:/bin/bash' },
                            'os-release': { type: 'file', owner: 'root', perms: '-rw-r--r--', content: 'NAME="NOC Linux Enterprise"\nVERSION="2026.1 LTS"\nID=nocOS' }
                        }
                    },
                    'var': {
                        type: 'dir',
                        owner: 'root',
                        perms: 'drwxr-xr-x',
                        children: {
                            'log': {
                                type: 'dir',
                                owner: 'root',
                                perms: 'drwxr-xr-x',
                                children: {
                                    'syslog': { type: 'file', owner: 'root', perms: '-rw-r-----', content: 'Aug 21 12:00:01 noc-cr01 kernel: [0.000000] Linux version 6.8.0-enterprise\nAug 21 12:00:05 noc-cr01 systemd[1]: Started User Manager for UID 1000.\nAug 21 12:10:22 noc-cr01 sshd[4102]: Accepted publickey for leonardo from 192.168.1.50' },
                                    'auth.log': { type: 'file', owner: 'root', perms: '-rw-r-----', content: 'Aug 21 12:00:00 noc-cr01 sudo: pam_unix(sudo:session): session opened for user root' }
                                }
                            }
                        }
                    },
                    'bin': {
                        type: 'dir',
                        owner: 'root',
                        perms: 'drwxr-xr-x',
                        children: {
                            'bash': { type: 'file', owner: 'root', perms: '-rwxr-xr-x', content: 'ELF 64-bit LSB executable' },
                            'ls': { type: 'file', owner: 'root', perms: '-rwxr-xr-x', content: 'ELF 64-bit LSB executable' },
                            'cat': { type: 'file', owner: 'root', perms: '-rwxr-xr-x', content: 'ELF 64-bit LSB executable' }
                        }
                    }
                }
            }
        };

        const updatePrompt = () => {
            let displayPath = currentPath === `/home/${currentUser}` ? '~' : currentPath;
            const symbol = currentUser === 'root' ? '#' : '$';
            const promptStr = `${currentUser}@noc-cr01:${displayPath}${symbol}`;
            terminalPrompt.textContent = promptStr;
            terminalTitle.textContent = `${currentUser}@noc-cr01: ${displayPath}`;
            return promptStr;
        };

        const resolvePathNode = (path) => {
            let targetPath = path;
            if (!targetPath) targetPath = currentPath;
            if (targetPath === '~') targetPath = `/home/${currentUser}`;
            if (targetPath.startsWith('~')) targetPath = targetPath.replace('~', `/home/${currentUser}`);
            
            let parts = targetPath.startsWith('/') ? targetPath.split('/') : `${currentPath}/${targetPath}`.split('/');
            let cleanParts = [];

            for (let p of parts) {
                if (p === '' || p === '.') continue;
                if (p === '..') {
                    if (cleanParts.length > 0) cleanParts.pop();
                } else {
                    cleanParts.push(p);
                }
            }

            let resolvedPath = '/' + cleanParts.join('/');
            
            // Traverse object
            let current = fileSystem['/'];
            for (let part of cleanParts) {
                if (current && current.type === 'dir' && current.children[part]) {
                    current = current.children[part];
                } else {
                    return { node: null, path: resolvedPath };
                }
            }
            return { node: current, path: resolvedPath };
        };

        const printToTerminal = (text, isHtml = false) => {
            const div = document.createElement('div');
            if (isHtml) {
                div.innerHTML = text;
            } else {
                div.textContent = text;
            }
            terminalOutput.appendChild(div);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        };

        // COMMAND REGISTRY
        const commands = {
            'help': (args) => {
                printToTerminal(`<span class="term-cyan">GNU bash, version 5.2.15-release (x86_64-pc-linux-gnu)</span>
<span class="term-yellow">Navigation & Files:</span>
  <span class="term-green">ls [-la]</span>    List directory contents with details
  <span class="term-green">cd [dir]</span>    Change current directory
  <span class="term-green">pwd</span>         Print current working directory
  <span class="term-green">cat [file]</span>  Display file content
  <span class="term-green">touch [file]</span>Create empty file
  <span class="term-green">mkdir [dir]</span> Create directory
  <span class="term-green">rm [-rf]</span>    Remove file or directory
  <span class="term-green">cp / mv</span>     Copy / Move files

<span class="term-yellow">System & Utilities:</span>
  <span class="term-green">whoami / id</span> Show current user info
  <span class="term-green">grep [str]</span>  Search text pattern in file
  <span class="term-green">echo [txt]</span>  Print text (supports > redirection)
  <span class="term-green">top / ps</span>    Display system processes
  <span class="term-green">df / free</span>   Disk and memory stats
  <span class="term-green">ifconfig</span>    Display network interfaces
  <span class="term-green">uptime</span>      Show system uptime
  <span class="term-green">date</span>        Print current system date
  <span class="term-green">clear</span>       Clear terminal screen
  <span class="term-green">exit</span>        Close shell`, true);
            },

            'whoami': () => printToTerminal(currentUser),
            'id': () => printToTerminal(`uid=1000(${currentUser}) gid=1000(${currentUser}) groups=1000(${currentUser}),27(sudo),100(users)`),
            'pwd': () => printToTerminal(currentPath),

            'cd': (args) => {
                const target = args[0] || '~';
                const res = resolvePathNode(target);
                if (res.node && res.node.type === 'dir') {
                    currentPath = res.path;
                    updatePrompt();
                } else if (res.node) {
                    printToTerminal(`bash: cd: ${target}: Not a directory`);
                } else {
                    printToTerminal(`bash: cd: ${target}: No such file or directory`);
                }
            },

            'ls': (args) => {
                const flags = args.filter(a => a.startsWith('-')).join('');
                const targetPath = args.find(a => !a.startsWith('-')) || '.';
                const showAll = flags.includes('a');
                const longFmt = flags.includes('l');

                const res = resolvePathNode(targetPath);
                if (!res.node) {
                    printToTerminal(`ls: cannot access '${targetPath}': No such file or directory`);
                    return;
                }

                if (res.node.type === 'file') {
                    printToTerminal(targetPath);
                    return;
                }

                let entries = Object.keys(res.node.children);
                if (!showAll) entries = entries.filter(e => !e.startsWith('.'));

                if (longFmt) {
                    let totalSize = entries.length * 4;
                    let out = `<span class="term-dim">total ${totalSize}</span><br>`;
                    for (let name of entries) {
                        const child = res.node.children[name];
                        const perms = child.perms;
                        const owner = child.owner;
                        const size = child.type === 'dir' ? 4096 : (child.content ? child.content.length : 0);
                        const isDir = child.type === 'dir';
                        const styledName = isDir ? `<span class="term-cyan term-bold">${name}/</span>` : name;
                        out += `${perms} 1 ${owner} ${owner} ${size.toString().padStart(6, ' ')} Aug 21 12:00 ${styledName}<br>`;
                    }
                    printToTerminal(out, true);
                } else {
                    let out = '';
                    for (let name of entries) {
                        const child = res.node.children[name];
                        if (child.type === 'dir') {
                            out += `<span class="term-cyan term-bold">${name}/</span>  `;
                        } else {
                            out += `${name}  `;
                        }
                    }
                    printToTerminal(out, true);
                }
            },

            'cat': (args) => {
                if (args.length === 0) {
                    printToTerminal('cat: missing file operand');
                    return;
                }
                const res = resolvePathNode(args[0]);
                if (!res.node) {
                    printToTerminal(`cat: ${args[0]}: No such file or directory`);
                } else if (res.node.type === 'dir') {
                    printToTerminal(`cat: ${args[0]}: Is a directory`);
                } else {
                    printToTerminal(res.node.content);
                }
            },

            'touch': (args) => {
                if (args.length === 0) {
                    printToTerminal('touch: missing file operand');
                    return;
                }
                const target = args[0];
                const res = resolvePathNode(target);
                if (res.node) return; // File already exists

                // Split path into parent directory and filename
                const lastSlash = target.lastIndexOf('/');
                let parentPath = '.';
                let fileName = target;
                if (lastSlash !== -1) {
                    parentPath = target.substring(0, lastSlash) || '/';
                    fileName = target.substring(lastSlash + 1);
                }

                const parentRes = resolvePathNode(parentPath);
                if (parentRes.node && parentRes.node.type === 'dir') {
                    parentRes.node.children[fileName] = {
                        type: 'file',
                        owner: currentUser,
                        perms: '-rw-r--r--',
                        content: ''
                    };
                } else {
                    printToTerminal(`touch: cannot touch '${target}': No such file or directory`);
                }
            },

            'mkdir': (args) => {
                const target = args.find(a => !a.startsWith('-'));
                if (!target) {
                    printToTerminal('mkdir: missing operand');
                    return;
                }
                const res = resolvePathNode(target);
                if (res.node) {
                    printToTerminal(`mkdir: cannot create directory '${target}': File exists`);
                    return;
                }

                const lastSlash = target.lastIndexOf('/');
                let parentPath = '.';
                let dirName = target;
                if (lastSlash !== -1) {
                    parentPath = target.substring(0, lastSlash) || '/';
                    dirName = target.substring(lastSlash + 1);
                }

                const parentRes = resolvePathNode(parentPath);
                if (parentRes.node && parentRes.node.type === 'dir') {
                    parentRes.node.children[dirName] = {
                        type: 'dir',
                        owner: currentUser,
                        perms: 'drwxr-xr-x',
                        children: {}
                    };
                } else {
                    printToTerminal(`mkdir: cannot create directory '${target}': No such file or directory`);
                }
            },

            'rm': (args) => {
                const isRecursive = args.includes('-r') || args.includes('-rf');
                const target = args.find(a => !a.startsWith('-'));
                if (!target) {
                    printToTerminal('rm: missing operand');
                    return;
                }
                const res = resolvePathNode(target);
                if (!res.node) {
                    printToTerminal(`rm: cannot remove '${target}': No such file or directory`);
                    return;
                }
                if (res.node.type === 'dir' && !isRecursive) {
                    printToTerminal(`rm: cannot remove '${target}': Is a directory`);
                    return;
                }

                const lastSlash = target.lastIndexOf('/');
                let parentPath = '.';
                let name = target;
                if (lastSlash !== -1) {
                    parentPath = target.substring(0, lastSlash) || '/';
                    name = target.substring(lastSlash + 1);
                }

                const parentRes = resolvePathNode(parentPath);
                if (parentRes.node && parentRes.node.children[name]) {
                    delete parentRes.node.children[name];
                }
            },

            'echo': (args) => {
                const text = args.join(' ');
                if (text.includes('>')) {
                    const parts = text.split('>');
                    const content = parts[0].trim().replace(/^["']|["']$/g, '');
                    const fileName = parts[1].trim();
                    commands.touch([fileName]);
                    const res = resolvePathNode(fileName);
                    if (res.node) res.node.content = content;
                } else {
                    printToTerminal(text);
                }
            },

            'grep': (args) => {
                if (args.length < 2) {
                    printToTerminal('grep: pattern and file required');
                    return;
                }
                const pattern = args[0];
                const res = resolvePathNode(args[1]);
                if (!res.node || res.node.type === 'dir') {
                    printToTerminal(`grep: ${args[1]}: No such file or directory`);
                    return;
                }
                const lines = res.node.content.split('\n');
                const matches = lines.filter(l => l.includes(pattern));
                matches.forEach(m => printToTerminal(m.replace(pattern, `<span class="term-red term-bold">${pattern}</span>`), true));
            },

            'top': () => {
                printToTerminal(`<span class="term-cyan">top - 12:00:00 up 45 days,  2:14,  1 user,  load average: 0.08, 0.04, 0.01</span>
Tasks: <span class="term-bold">98 total</span>,   1 running,  97 sleeping
%Cpu(s):  <span class="term-green">1.2 us</span>,  <span class="term-cyan">0.4 sy</span>,  0.0 ni, 98.4 id
MiB Mem :   <span class="term-yellow">15980.4 total</span>,   <span class="term-green">8420.1 free</span>,   <span class="term-cyan">4200.3 used</span>
<br>
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1000 leonardo  20   0  125.4m  42.1m  18.4m S   1.2   0.3   0:04.12 node
    1 root      20   0   22.1m   8.2m   5.1m S   0.0   0.1   0:12.44 systemd
  412 root      20   0    4.2m   1.8m   1.2m S   0.0   0.0   0:00.08 sshd`, true);
            },

            'ps': () => {
                printToTerminal(`  PID TTY          TIME CMD
 1001 pts/0    00:00:00 bash
 1450 pts/0    00:00:00 ps`);
            },

            'df': () => {
                printToTerminal(`Filesystem     1K-blocks      Used Available Use% Mounted on
/dev/sda1      103080224  24128410  73685324  25% /
tmpfs            8181952         0   8181952   0% /dev/shm`);
            },

            'free': () => {
                printToTerminal(`               total        used        free      shared  buff/cache   available
Mem:        16363904     4301107     8622182      120400     3440615    11742397
Swap:        2097148           0     2097148`);
            },

            'ifconfig': () => {
                printToTerminal(`<span class="term-cyan">eth0:</span> flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
        inet <span class="term-green">192.168.1.100</span>  netmask 255.255.255.0  broadcast 192.168.1.255
        rx bytes: 48291041 (48.2 MB)  tx bytes: 1204912 (1.2 MB)

<span class="term-cyan">lo:</span> flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536
        inet <span class="term-green">127.0.0.1</span>  netmask 255.0.0.0`, true);
            },

            'uptime': () => printToTerminal(' 12:00:00 up 45 days,  2:14,  1 user,  load average: 0.08, 0.04, 0.01'),
            'date': () => printToTerminal(new Date().toString()),
            'clear': () => { terminalOutput.innerHTML = ''; },
            'history': () => printToTerminal(cmdHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n')),
            'exit': () => { terminalModal.classList.remove('active'); },
            'sudo': () => printToTerminal('leonardo is not in the sudoers file. This incident will be reported.'),
            'su': () => printToTerminal('su: Authentication failure')
        };

        const handleCommand = (cmdStr) => {
            const rawArgs = cmdStr.trim().split(' ').filter(arg => arg.length > 0);
            if (rawArgs.length === 0) return;
            
            const cmdName = rawArgs[0].toLowerCase();
            const args = rawArgs.slice(1);

            printToTerminal(`${updatePrompt()} ${cmdStr}`);

            if (commands[cmdName]) {
                commands[cmdName](args);
            } else {
                printToTerminal(`bash: ${cmdName}: command not found. Type "help" for available commands.`);
            }
        };

        const openTerminal = () => {
            terminalModal.classList.add('active');
            terminalInput.focus();
            if (terminalOutput.innerHTML === '') {
                printToTerminal('NOC Linux Enterprise Terminal [Version 2026.1-LTS]\nType "help" for a list of system commands.\n');
            }
        };

        terminalBtn.addEventListener('click', openTerminal);
        
        terminalClose.addEventListener('click', () => {
            terminalModal.classList.remove('active');
        });

        terminalModal.addEventListener('click', (e) => {
            if (e.target === terminalModal) {
                terminalModal.classList.remove('active');
            } else {
                terminalInput.focus();
            }
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = terminalInput.value;
                if (val.trim() !== '') {
                    cmdHistory.push(val);
                    historyIndex = cmdHistory.length;
                    handleCommand(val);
                } else {
                    printToTerminal(updatePrompt() + ' ');
                }
                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = cmdHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < cmdHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = cmdHistory[historyIndex];
                } else {
                    historyIndex = cmdHistory.length;
                    terminalInput.value = '';
                }
            }
        });
        
        updatePrompt();
    }

    // =========================================================================
    // PUBLICATIONS & PAPERS MULTI-FORMAT FILTERING
    // =========================================================================
    const filterBtns = document.querySelectorAll('.pub-filter-btn');
    const pubCards = document.querySelectorAll('.pub-card');
    const pubCountEl = document.getElementById('pub-count');

    if (filterBtns.length > 0 && pubCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                let visibleCount = 0;

                pubCards.forEach(card => {
                    const cardFormat = card.getAttribute('data-format');
                    if (filterValue === 'all' || cardFormat === filterValue) {
                        card.style.display = 'flex';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (pubCountEl) {
                    pubCountEl.textContent = visibleCount;
                }
            });
        });
    }

    // =========================================================================
    // BLUEPRINT TABS SWITCHER
    // =========================================================================
    const bpTabBtns = document.querySelectorAll('.bp-tab-btn');
    const bpTabContents = document.querySelectorAll('.bp-tab-content');

    if (bpTabBtns.length > 0 && bpTabContents.length > 0) {
        bpTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                bpTabBtns.forEach(b => b.classList.remove('active'));
                bpTabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetId = `tab-${btn.getAttribute('data-tab')}`;
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // =========================================================================
    // INTERACTIVE RESEARCH PAPER & GUIDES READER MODAL
    // =========================================================================
    const paperModalOverlay = document.getElementById('paper-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseBottomBtn = document.getElementById('modal-close-bottom-btn');
    const modalPaperType = document.getElementById('modal-paper-type');
    const modalPaperDoi = document.getElementById('modal-paper-doi');
    const modalPaperBody = document.getElementById('modal-paper-body');
    const papersDatabase = (typeof window !== 'undefined' && window.papersDatabase) ? window.papersDatabase : {};

    let currentActiveDoc = null;

    function openPaperModal(paperId) {
        let doc = papersDatabase[paperId];

        // Intelligent DOM Fallback: extract info directly from card if not in database
        if (!doc) {
            const cardEl = document.querySelector(`[data-paper="${paperId}"]`)?.closest('.pub-card, .note-card') 
                        || document.getElementById(`card-${paperId.replace('paper-', '')}`)
                        || document.getElementById(`note-${paperId.replace('paper-', '')}`);
            if (cardEl) {
                const title = cardEl.querySelector('.pub-title, .note-title')?.textContent || 'Documento Técnico';
                const type = cardEl.querySelector('.pub-type-badge, .note-category')?.textContent || 'DOCUMENTO TÉCNICO';
                const doi = cardEl.querySelector('.pub-doi-tag')?.textContent || 'REF: NOC-2026';
                const excerpt = cardEl.querySelector('.pub-excerpt, .note-excerpt')?.textContent || '';
                const category = cardEl.querySelector('.pub-category, .note-category')?.textContent || '';
                const hlItems = Array.from(cardEl.querySelectorAll('.pub-hl-item, .note-toc li')).map(el => el.textContent.trim());

                doc = {
                    type: type,
                    doi: doi,
                    title: title,
                    meta: `Autor: Leonardo Escobar &bull; Categoría: ${category} &bull; NOC Knowledge Hub`,
                    abstract: excerpt,
                    sections: [
                        {
                            heading: 'Puntos Clave y Especificaciones',
                            content: hlItems.length > 0 ? hlItems.map(item => `&bull; ${item}`).join('<br>') : 'Especificación técnica de ingeniería.'
                        }
                    ]
                };
            }
        }

        if (!doc || !paperModalOverlay || !modalPaperBody) return;
        currentActiveDoc = doc;

        if (modalPaperType) modalPaperType.textContent = doc.type;
        if (modalPaperDoi) modalPaperDoi.textContent = doc.doi;

        // External Link button toggle
        const modalExternalLink = document.getElementById('modal-external-link');
        if (modalExternalLink) {
            if (doc.externalUrl || doc.pdfUrl) {
                modalExternalLink.href = doc.externalUrl || doc.pdfUrl;
                modalExternalLink.style.display = 'inline-flex';
            } else {
                modalExternalLink.style.display = 'none';
            }
        }

        let bodyHtml = `
            <h1 class="modal-doc-title">${doc.title}</h1>
            <div class="modal-doc-meta">${doc.meta}</div>
            <div class="modal-doc-abstract">
                <strong>ABSTRACT:</strong>
                ${doc.abstract}
            </div>
        `;

        if (doc.sections && Array.isArray(doc.sections)) {
            doc.sections.forEach(sec => {
                bodyHtml += `<h2 class="modal-doc-h2">${sec.heading}</h2>`;
                if (sec.content) {
                    bodyHtml += `<p class="modal-doc-p">${sec.content}</p>`;
                }
                if (sec.code) {
                    bodyHtml += `<pre class="modal-doc-code">${sec.code}</pre>`;
                }
            });
        }

        if (doc.references && Array.isArray(doc.references)) {
            bodyHtml += `
                <div class="modal-doc-references">
                    <h2 class="modal-doc-h2"><ion-icon name="library-outline"></ion-icon> Fuentes &amp; Referencias Técnicas</h2>
                    <ul class="modal-doc-ref-list">
            `;
            doc.references.forEach(ref => {
                bodyHtml += `<li class="modal-ref-item">&bull; ${ref}</li>`;
            });
            bodyHtml += `</ul></div>`;
        }

        modalPaperBody.innerHTML = bodyHtml;
        modalPaperBody.scrollTop = 0;
        paperModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePaperModal() {
        if (paperModalOverlay) {
            paperModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Event delegation for all read paper buttons (existing & dynamic)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-read-paper, .pub-btn-read');
        if (btn) {
            e.preventDefault();
            const paperId = btn.getAttribute('data-paper');
            if (paperId) openPaperModal(paperId);
        }
    });

    // BibTeX Citation Copy Handler
    const modalCiteBtn = document.getElementById('modal-cite-btn');
    if (modalCiteBtn) {
        modalCiteBtn.addEventListener('click', () => {
            if (!currentActiveDoc) return;
            const cleanDoi = (currentActiveDoc.doi || 'NOC2026').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const bibtex = `@article{escobar2026_${cleanDoi},
  author    = {Escobar, Leonardo},
  title     = {${currentActiveDoc.title}},
  journal   = {NOC Datacenter Systems & Engineering Research Hub},
  year      = {2026},
  note      = {${currentActiveDoc.doi}}
}`;
            navigator.clipboard.writeText(bibtex).then(() => {
                const originalHtml = modalCiteBtn.innerHTML;
                modalCiteBtn.classList.add('copied');
                modalCiteBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> <span>¡Copiado!</span>';
                setTimeout(() => {
                    modalCiteBtn.classList.remove('copied');
                    modalCiteBtn.innerHTML = originalHtml;
                }, 2200);
            }).catch(() => {
                alert('Cita BibTeX:\n\n' + bibtex);
            });
        });
    }

    // Print / PDF Export Handler
    const modalPrintBtn = document.getElementById('modal-print-btn');
    if (modalPrintBtn) {
        modalPrintBtn.addEventListener('click', () => {
            window.print();
        });
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePaperModal);
    if (modalCloseBottomBtn) modalCloseBottomBtn.addEventListener('click', closePaperModal);
    if (paperModalOverlay) {
        paperModalOverlay.addEventListener('click', (e) => {
            if (e.target === paperModalOverlay) closePaperModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePaperModal();
    });
});

