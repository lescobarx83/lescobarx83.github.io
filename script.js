document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('datacenter-preloader');
    const keypadLed = document.getElementById('keypad-led-ring');
    const keypadStatus = document.getElementById('keypad-status-code');
    const fingerGlow = document.getElementById('fingerprint-glow');
    const arenaiRow = document.getElementById('arenai-slot-row');

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
    const revealSections = document.querySelectorAll('#awards, #infrastructure, #rack, #experience, #skills, #contact');
    revealSections.forEach(section => {
        // Add reveal class to section header
        const header = section.querySelector('.header-center');
        if (header) header.classList.add('reveal-section');

        // Add reveal class to grid children
        const children = section.querySelectorAll('.award-card, .arch-card, .timeline-card, .skill-box, .direct-contact-card, .e9000h-hardware-outer');
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
                    if (sibling === entry.target) delay = i * 100;
                });
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                childObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal-child').forEach(el => childObserver.observe(el));

    // =========================================================================
    // NAV BACKGROUND SOLIDIFY ON SCROLL
    // =========================================================================
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navContainer.style.background = 'rgba(5, 6, 8, 0.92)';
                navContainer.style.borderColor = 'rgba(230, 0, 18, 0.2)';
            } else {
                navContainer.style.background = '';
                navContainer.style.borderColor = '';
            }
        }, { passive: true });
    }

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
    // HERO SUBTITLE TYPEWRITER EFFECT
    // =========================================================================
    const typedLine = document.querySelector('.typed-line');
    const typingCursor = document.querySelector('.typing-cursor');

    if (typedLine) {
        const phrases = [
            'ICT Engineer & Especialista en Infraestructura',
            '3er Lugar Mundial — Global ICT Competition',
            'Delivery & Services Engineer — Huawei Technologies',
            'Cum Laude Probatus — ULACIT',
            'Semifinalista Mundial — Innovación ICT 2025-2026'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

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
                phraseIndex = (phraseIndex + 1) % phrases.length;
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
        'nav.home': { es: 'Inicio', en: 'Home' },
        'nav.about': { es: 'Sobre Mí', en: 'About Me' },
        'nav.awards': { es: 'Logros', en: 'Awards' },
        'nav.infra': { es: 'Infraestructura', en: 'Infrastructure' },
        'nav.projects': { es: 'Proyectos', en: 'Projects' },
        'nav.experience': { es: 'Experiencia', en: 'Experience' },
        'nav.skills': { es: 'Habilidades', en: 'Skills' },
        'nav.contact': { es: 'Contacto', en: 'Contact' },
        
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
        'about.hobbiesText': { es: 'Más allá del ámbito tecnológico, cultivo el pensamiento estratégico mediante el gaming competitivo y la música, actividades que complementan la agilidad mental requerida en entornos críticos.', en: 'Beyond the technological realm, I cultivate strategic thinking through competitive gaming and music, activities that complement the mental agility required in mission-critical environments.' }
    };

    let currentLang = localStorage.getItem('lang') || 'es';

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
        langLabel.textContent = lang === 'es' ? 'EN' : 'ES';
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
                                            'arenai_blade.md': { type: 'file', owner: 'leonardo', perms: '-rw-r--r--', content: '# ArenAI Blade\nSlot 01 Hardware interface project.' },
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
});
