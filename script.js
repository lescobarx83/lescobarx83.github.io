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
});
