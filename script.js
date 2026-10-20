document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('datacenter-preloader');
    const keypadLed = document.getElementById('keypad-led-ring');
    const keypadStatus = document.getElementById('keypad-status-code');
    const fingerGlow = document.getElementById('fingerprint-glow');
    const arenaiRow = document.getElementById('arenai-slot-row');

    let currentLang = localStorage.getItem('lang') || 'es';

    // =========================================================================
    // DATACENTER PRELOADER — ONE-TIME PER SESSION (sessionStorage) & FAST TRANSITION
    // =========================================================================
    const returnedFromProject = sessionStorage.getItem('returnedFromProject');
    const preloaderSeen = sessionStorage.getItem('noc_preloader_seen');
    const skipPreloaderBtn = document.getElementById('skip-preloader-btn');

    function bypassPreloaderImmediate() {
        if (preloader) {
            preloader.classList.add('skip-doors', 'doors-done');
        }
        document.body.classList.add('spotlight-on', 'noc-power-on');
        document.body.classList.remove('noc-power-off');
        sessionStorage.setItem('noc_preloader_seen', 'true');
    }

    if (skipPreloaderBtn) {
        skipPreloaderBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bypassPreloaderImmediate();
        });
    }

    if (returnedFromProject === 'true') {
        sessionStorage.removeItem('returnedFromProject');
        bypassPreloaderImmediate();

        // Step 1: Set Slot 01 to EXTRACTED OUTWARD state INITIAL STATE
        if (arenaiRow) {
            arenaiRow.classList.add('blade-ejected-waiting');
        }

        // Step 2: Smooth Scroll to Rack Section
        const rackSection = document.getElementById('rack');
        if (rackSection) {
            rackSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Step 3: Trigger Mechanical Slide-In & Lock-In Insertion
        setTimeout(() => {
            if (arenaiRow) {
                arenaiRow.classList.remove('blade-ejected-waiting');
                arenaiRow.classList.add('blade-inserting');
                setTimeout(() => {
                    arenaiRow.classList.remove('blade-inserting');
                }, 800);
            }
        }, 500);

    } else if (preloaderSeen === 'true') {
        // Preloader ya fue visto en esta sesión: omitir instantáneamente
        bypassPreloaderImmediate();
    } else {
        // Primera visita de la sesión: Ejecutar animación acelerada (0.6s total)
        if (preloader) {
            // Step 1: Biometric Scanning Phase (180ms)
            setTimeout(() => {
                if (keypadStatus) keypadStatus.textContent = 'VERIFICANDO...';
                if (fingerGlow) fingerGlow.style.opacity = '1';
            }, 180);

            // Step 2: Access Granted Phase (380ms)
            setTimeout(() => {
                if (keypadLed) {
                    keypadLed.className = 'keypad-led-ring led-green';
                }
                if (keypadStatus) {
                    keypadStatus.textContent = 'ACCESO OK';
                    keypadStatus.style.color = 'var(--accent-emerald)';
                }
            }, 380);

            // Step 3: OPEN GLASS DOORS (550ms) - Accelerated 0.6s smooth slide
            setTimeout(() => {
                preloader.classList.add('opened');
            }, 550);

            // Step 4: Turn on overhead spotlight & illuminate interface (850ms)
            setTimeout(() => {
                document.body.classList.add('spotlight-on', 'noc-power-on');
                document.body.classList.remove('noc-power-off');
            }, 850);

            // Step 5: Cleanly remove preloader overlay & mark session as seen (1150ms)
            setTimeout(() => {
                preloader.classList.add('doors-done');
                sessionStorage.setItem('noc_preloader_seen', 'true');
            }, 1150);
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
                if (href === `#${currentSectionId}` || (currentSectionId === 'articles-feed' && href === '#articles-feed')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }, { passive: true });

    // =========================================================================
    // 75% ICT RESEARCH & ENGINEERING FEED ENGINE (DRIVE SYNC PIPELINE)
    // =========================================================================
    const articlesContainer = document.getElementById('articles-container');
    const articlesSearchInput = document.getElementById('articles-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const feedPills = document.querySelectorAll('.feed-filter-pill');
    const feedCountBadge = document.getElementById('feed-count-badge');
    const feedEmptyState = document.getElementById('feed-empty-state');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const viewGridBtn = document.getElementById('view-grid-btn');
    const viewListBtn = document.getElementById('view-list-btn');
    const driveSyncBtn = document.getElementById('drive-sync-btn');
    const syncBtnLabel = document.getElementById('sync-btn-label');

    let allLoadedArticles = [];
    let currentCategoryFilter = 'all';
    let currentSearchTerm = '';
    let currentViewMode = localStorage.getItem('noc_view_mode') || 'grid';

    // Set initial view mode
    if (articlesContainer) {
        if (currentViewMode === 'list') {
            articlesContainer.classList.remove('view-mode-grid');
            articlesContainer.classList.add('view-mode-list');
            if (viewListBtn) viewListBtn.classList.add('active');
            if (viewGridBtn) viewGridBtn.classList.remove('active');
        } else {
            articlesContainer.classList.remove('view-mode-list');
            articlesContainer.classList.add('view-mode-grid');
            if (viewGridBtn) viewGridBtn.classList.add('active');
            if (viewListBtn) viewListBtn.classList.remove('active');
        }
    }

    if (viewGridBtn && viewListBtn && articlesContainer) {
        viewGridBtn.addEventListener('click', () => {
            currentViewMode = 'grid';
            localStorage.setItem('noc_view_mode', 'grid');
            viewGridBtn.classList.add('active');
            viewListBtn.classList.remove('active');
            articlesContainer.classList.remove('view-mode-list');
            articlesContainer.classList.add('view-mode-grid');
            renderFilteredArticles();
        });

        viewListBtn.addEventListener('click', () => {
            currentViewMode = 'list';
            localStorage.setItem('noc_view_mode', 'list');
            viewListBtn.classList.add('active');
            viewGridBtn.classList.remove('active');
            articlesContainer.classList.remove('view-mode-grid');
            articlesContainer.classList.add('view-mode-list');
            renderFilteredArticles();
        });
    }

    function updateSpotlightSection(articles) {
        if (!articles || articles.length === 0) return;
        const spotlightArticle = articles.find(a => a.featured) || articles[0];
        if (!spotlightArticle) return;

        const titleEl = document.getElementById('spotlight-title');
        const doiEl = document.getElementById('spotlight-doi');
        const catEl = document.getElementById('spotlight-cat');
        const dateEl = document.getElementById('spotlight-date');
        const timeEl = document.getElementById('spotlight-time');
        const abstractEl = document.getElementById('spotlight-abstract');
        const readBtn = document.getElementById('spotlight-read-btn');
        const driveBtn = document.getElementById('spotlight-drive-btn');

        if (titleEl) titleEl.textContent = currentLang === 'en' && spotlightArticle.title_en ? spotlightArticle.title_en : spotlightArticle.title;
        if (doiEl) doiEl.textContent = spotlightArticle.doi || 'REF: NOC-2026';
        if (catEl) catEl.innerHTML = `<ion-icon name="hardware-chip-outline"></ion-icon> <span>${currentLang === 'en' && spotlightArticle.categoryLabel_en ? spotlightArticle.categoryLabel_en : spotlightArticle.categoryLabel}</span>`;
        if (dateEl) dateEl.innerHTML = `<ion-icon name="calendar-outline"></ion-icon> <span>${spotlightArticle.date}</span>`;
        if (timeEl) timeEl.innerHTML = `<ion-icon name="time-outline"></ion-icon> <span>${spotlightArticle.readTime || '~12 min'}</span>`;
        if (abstractEl) abstractEl.textContent = currentLang === 'en' && spotlightArticle.abstract_en ? spotlightArticle.abstract_en : spotlightArticle.abstract;
        if (readBtn) readBtn.setAttribute('data-paper', spotlightArticle.id);
        if (driveBtn) {
            driveBtn.href = (spotlightArticle.driveLink && !spotlightArticle.driveLink.includes('SAMPLE'))
                ? spotlightArticle.driveLink
                : (window.DriveSync ? window.DriveSync.getPublicFolderUrl() : 'https://drive.google.com/drive/folders/1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK?usp=sharing');
        }
    }

    function renderFilteredArticles() {
        if (!articlesContainer) return;

        const term = currentSearchTerm.trim().toLowerCase();
        const filtered = allLoadedArticles.filter(art => {
            const matchesCat = (currentCategoryFilter === 'all') || (art.category === currentCategoryFilter);
            if (!matchesCat) return false;
            if (!term) return true;

            const titleMatch = (art.title && art.title.toLowerCase().includes(term)) || (art.title_en && art.title_en.toLowerCase().includes(term));
            const abstractMatch = (art.abstract && art.abstract.toLowerCase().includes(term)) || (art.abstract_en && art.abstract_en.toLowerCase().includes(term));
            const tagMatch = art.tags && art.tags.some(t => t.toLowerCase().includes(term));
            const doiMatch = art.doi && art.doi.toLowerCase().includes(term);
            const idMatch = art.id && art.id.toLowerCase().includes(term);

            return titleMatch || abstractMatch || tagMatch || doiMatch || idMatch;
        });

        if (feedCountBadge) {
            feedCountBadge.textContent = filtered.length;
        }

        if (filtered.length === 0) {
            articlesContainer.innerHTML = '';
            if (feedEmptyState) feedEmptyState.style.display = 'flex';
            return;
        }

        if (feedEmptyState) feedEmptyState.style.display = 'none';

        if (currentViewMode === 'grid') {
            articlesContainer.innerHTML = filtered.map(art => {
                const title = currentLang === 'en' && art.title_en ? art.title_en : art.title;
                const abstract = currentLang === 'en' && art.abstract_en ? art.abstract_en : art.abstract;
                const catLabel = currentLang === 'en' && art.categoryLabel_en ? art.categoryLabel_en : art.categoryLabel;
                const catClass = `cat-${art.category || 'infra'}`;
                const tagsHtml = (art.tags || []).slice(0, 3).map(t => `<span class="feed-tag-pill">${t}</span>`).join('');

                return `
                    <article class="feed-article-card glass-panel" data-paper="${art.id}" data-category="${art.category || 'infra'}">
                        <div>
                            <div class="feed-card-header">
                                <span class="feed-cat-badge ${catClass}">${catLabel}</span>
                                <span class="feed-card-doi">${art.doi || 'REF: NOC-2026'}</span>
                            </div>
                            <h3 class="feed-card-title">${title}</h3>
                            <p class="feed-card-excerpt">${abstract}</p>
                            <div class="feed-card-tags">${tagsHtml}</div>
                        </div>
                        <div class="feed-card-footer">
                            <span class="feed-time-info">
                                <ion-icon name="time-outline"></ion-icon> ${art.readTime || '~10 min'} &bull; ${art.date}
                            </span>
                            <button class="feed-read-btn btn-read-paper" data-paper="${art.id}">
                                <span>${currentLang === 'en' ? 'Read Paper' : 'Leer Paper'}</span>
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </button>
                        </div>
                    </article>
                `;
            }).join('');
        } else {
            // List / Logs Mode
            articlesContainer.innerHTML = filtered.map(art => {
                const title = currentLang === 'en' && art.title_en ? art.title_en : art.title;
                const catLabel = currentLang === 'en' && art.categoryLabel_en ? art.categoryLabel_en : art.categoryLabel;
                const catClass = `cat-${art.category || 'infra'}`;

                return `
                    <div class="feed-article-row" data-paper="${art.id}">
                        <div class="feed-row-left">
                            <span class="feed-row-doi">${art.doi || 'REF: NOC-2026'}</span>
                            <span class="feed-cat-badge ${catClass}">${catLabel}</span>
                            <h4 class="feed-row-title">${title}</h4>
                        </div>
                        <div class="feed-row-right">
                            <span class="feed-time-info"><ion-icon name="calendar-outline"></ion-icon> ${art.date}</span>
                            <button class="feed-read-btn btn-read-paper" data-paper="${art.id}">
                                <span>${currentLang === 'en' ? 'Open' : 'Abrir'}</span>
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    async function loadArticlesFeed(forceRefresh = false) {
        if (!articlesContainer) return;
        try {
            if (window.DriveSync) {
                allLoadedArticles = await window.DriveSync.getArticles(forceRefresh);
            } else {
                allLoadedArticles = [];
            }
            updateSpotlightSection(allLoadedArticles);
            renderFilteredArticles();
        } catch (e) {
            console.error('[Feed] Error cargando artículos:', e);
            renderFilteredArticles();
        }
    }

    // Filter pills listeners
    feedPills.forEach(pill => {
        pill.addEventListener('click', () => {
            feedPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategoryFilter = pill.getAttribute('data-cat') || 'all';
            renderFilteredArticles();
        });
    });

    // Real-time search listeners
    if (articlesSearchInput) {
        let debounceTimer = null;
        articlesSearchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            if (clearSearchBtn) {
                clearSearchBtn.style.display = currentSearchTerm ? 'flex' : 'none';
            }
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                renderFilteredArticles();
            }, 120);
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (articlesSearchInput) {
                articlesSearchInput.value = '';
                currentSearchTerm = '';
                clearSearchBtn.style.display = 'none';
                articlesSearchInput.focus();
                renderFilteredArticles();
            }
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            currentCategoryFilter = 'all';
            currentSearchTerm = '';
            if (articlesSearchInput) articlesSearchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            feedPills.forEach(p => {
                if (p.getAttribute('data-cat') === 'all') p.classList.add('active');
                else p.classList.remove('active');
            });
            renderFilteredArticles();
        });
    }

    // Drive Sync Trigger Button
    if (driveSyncBtn) {
        driveSyncBtn.addEventListener('click', async () => {
            driveSyncBtn.classList.add('syncing');
            if (syncBtnLabel) syncBtnLabel.textContent = currentLang === 'en' ? 'Syncing...' : 'Sincronizando...';

            try {
                if (window.DriveSync) {
                    allLoadedArticles = await window.DriveSync.syncNow();
                    updateSpotlightSection(allLoadedArticles);
                    renderFilteredArticles();
                }
                if (syncBtnLabel) syncBtnLabel.textContent = currentLang === 'en' ? 'Synced!' : '¡Sincronizado!';
                setTimeout(() => {
                    driveSyncBtn.classList.remove('syncing');
                    if (syncBtnLabel) syncBtnLabel.textContent = 'Drive Sync';
                }, 1600);
            } catch (err) {
                driveSyncBtn.classList.remove('syncing');
                if (syncBtnLabel) syncBtnLabel.textContent = 'Sync Error';
            }
        });
    }

    // Load initial feed
    loadArticlesFeed();

    // =========================================================================
    // HERO SUBTITLE TYPEWRITER EFFECT (BILINGUAL)
    // =========================================================================
    const typedLine = document.querySelector('.typed-line');
    const typingCursor = document.querySelector('.typing-cursor');

    const phrasesDict = {
        es: [
            'Investigación 6G-IoT, Inferencia Neuromórfica & ISAC',
            'Comunicaciones Semánticas Orientadas a Objetivos',
            'Computación Analógica en el Aire (AirComp) & Metasuperficies RIS',
            'Publicaciones Científicas Sincronizadas con Google Drive'
        ],
        en: [
            '6G-IoT Research, Neuromorphic Inference & ISAC',
            'Goal-Oriented Semantic Communications',
            'Analog Over-the-Air Computation (AirComp) & RIS Metasurfaces',
            'Scientific Publications Synchronized with Google Drive'
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
        // Preloader
        'preloader.skip': { es: 'Saltar intro', en: 'Skip intro' },

        // Navigation
        'nav.home': { es: 'Inicio', en: 'Home' },
        'nav.feed': { es: 'Investigaciones &amp; Artículos', en: 'Research &amp; Articles' },
        'nav.blueprints': { es: 'Arquitecturas &amp; Labs', en: 'Architectures &amp; Labs' },
        'nav.profile': { es: 'Perfil Ejecutivo &amp; Rack', en: 'Executive Profile &amp; Rack' },
        'nav.rackBtn': { es: 'Rack E9000H', en: 'E9000H Rack' },
        'nav.cv': { es: 'CV Completo', en: 'Full CV' },
        
        // Hero Section & Spotlight
        'hero.spotlightBadge': { es: 'INVESTIGACIÓN DE LA SEMANA', en: 'SPOTLIGHT RESEARCH OF THE WEEK' },
        'hero.driveSyncTag': { es: 'Google Drive Live Sync', en: 'Google Drive Live Sync' },
        'hero.readFeatured': { es: 'Leer Artículo Completo', en: 'Read Full Article' },
        'hero.viewInDrive': { es: 'Ver en Drive / PDF', en: 'View in Drive / PDF' },
        'hero.viewAll': { es: 'Feed Completo (75%)', en: 'Full Feed (75%)' },
        'author.bioShort': { 
            es: 'Ingeniero de infraestructura y plataformas de misión crítica. Especialista en servidores empresariales, Linux openEuler, bases de datos openGauss y analítica para directivos CXO.', 
            en: 'Infrastructure and mission-critical systems engineer. Specialist in enterprise servers, Linux openEuler, openGauss databases, and CXO data analytics.' 
        },
        'author.viewCv': { es: 'CV Interactivo Completo', en: 'Full Interactive CV' },
        'author.viewFullCv': { es: 'Ver CV Detallado &amp; Certificaciones', en: 'View Detailed CV &amp; Certifications' },

        // Articles Feed (75%)
        'feed.tag': { es: '[ 75% HUB PRINCIPAL ] &bull; INVESTIGACIONES &amp; ARTÍCULOS SEMANALES', en: '[ 75% MAIN HUB ] &bull; WEEKLY TECHNICAL RESEARCH &amp; ARTICLES' },
        'feed.heading': { es: 'ICT Research, Whitepapers &amp; Ideas', en: 'ICT Research, Whitepapers &amp; Ideas' },
        'feed.subtitle': { 
            es: 'Plataforma técnica continua sincronizada con Google Drive. Investigaciones empíricas, manuales de hardening, optimizaciones de bases de datos y arquitectura de sistemas probados en centros de datos de misión crítica.', 
            en: 'Continuous technical repository synced with Google Drive. Empirical research, hardening manuals, database optimizations, and system architectures verified in mission-critical datacenters.' 
        },
        'feed.searchPlaceholder': { es: 'Buscar por título, tecnología (openEuler, ARM, SQL...), palabra clave o ID...', en: 'Search by title, technology (openEuler, ARM, SQL...), keyword or ID...' },
        'feed.docsAvailable': { es: 'documentos técnicos', en: 'technical documents' },
        'feed.emptyTitle': { es: 'No se encontraron documentos técnicos', en: 'No technical documents found' },
        'feed.emptyDesc': { es: 'Intenta modificar los términos de búsqueda o selecciona otra categoría temática.', en: 'Try adjusting your search terms or select another thematic category.' },
        'feed.resetFilters': { es: 'Restablecer Filtros', en: 'Reset Filters' },
        'feed.driveRepoBtn': { es: 'Repositorio en Drive', en: 'Drive Repository' },

        // Categories
        'cat.all': { es: 'Todos', en: 'All' },
        'cat.infra': { es: 'Infraestructura &amp; Servidores', en: 'Infrastructure &amp; Servers' },
        'cat.os': { es: 'Linux &amp; OS', en: 'Linux &amp; OS' },
        'cat.db': { es: 'Bases de Datos', en: 'Databases &amp; SQL' },
        'cat.dev': { es: 'IA &amp; Automatización', en: 'AI &amp; Automation' },
        'cat.ideas': { es: 'Ideas &amp; Opinión', en: 'Ideas &amp; Opinion' },

        // Blueprints
        'bp.tag': { es: 'Laboratorio &amp; Arquitecturas', en: 'Lab &amp; Architectures' },
        'bp.heading': { es: 'Blueprints de Infraestructura &amp; Topologías', en: 'Infrastructure Blueprints &amp; Topologies' },
        'bp.subtitle': { es: 'Especificaciones visuales de topologías de red, clústeres redundantes y esquemas de software implementados en producción.', en: 'Visual specifications of network topologies, redundant clusters, and software architectures deployed in production.' },

        // Profile Section (25%)
        'profile.tag': { es: '[ 25% HARDWARE PROFILE ] &bull; TRAYECTORIA, RACK E9000H &amp; CREDENCIALES', en: '[ 25% HARDWARE PROFILE ] &bull; CAREER TRACK, E9000H RACK &amp; CREDENTIALS' },
        'profile.heading': { es: 'Chasis E9000H &amp; Perfil Ejecutivo', en: 'E9000H Chassis &amp; Executive Profile' },
        'profile.subtitle': { 
            es: 'Gabinete interactivo de cómputo de alta densidad, distinciones internacionales de prestigio y trayectoria profesional consolidada en Huawei Technologies.', 
            en: 'Interactive high-density compute cabinet, prestigious international honors, and solid professional career track at Huawei Technologies.' 
        },

        // Rack Slots
        'rack.actionExplore': { es: 'Explorar ArenAI', en: 'Explore ArenAI' },
        'rack.actionSync': { es: 'Ver Feed (75%)', en: 'View Feed (75%)' },
        'rack.actionCv': { es: 'Abrir CV', en: 'Open CV' },
        'rack.actionHonors': { es: 'Honores', en: 'Honors' },

        // Reader Modal
        'reader.share': { es: 'Compartir', en: 'Share' },
        'reader.viewDrive': { es: 'Ver en Drive / PDF', en: 'View in Drive / PDF' },
        'reader.close': { es: 'Cerrar Lectura', en: 'Close Reader' },
        'reader.tocTitle': { es: 'Contenido del Paper', en: 'Table of Contents' },

        // Legacy & Common Section tags
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
            if (typeof updateSpotlightSection === 'function') {
                updateSpotlightSection(allLoadedArticles);
            }
            if (typeof renderFilteredArticles === 'function') {
                renderFilteredArticles();
            }
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
<span class="term-yellow">Research Hub &amp; Publications (75% Hub):</span>
  <span class="term-green">articles</span>     List all technical papers &amp; research documents
  <span class="term-green">open [id]</span>    Open article in reader modal (or 'arenai' / 'cv')
  <span class="term-green">sync [drive]</span> Synchronize papers feed with Google Drive repository

<span class="term-yellow">Navigation &amp; Files:</span>
  <span class="term-green">ls [-la]</span>    List directory contents with details
  <span class="term-green">cd [dir]</span>    Change current directory
  <span class="term-green">pwd</span>         Print current working directory
  <span class="term-green">cat [file|id]</span>Display file content or research abstract
  <span class="term-green">touch [file]</span>Create empty file
  <span class="term-green">mkdir [dir]</span> Create directory
  <span class="term-green">rm [-rf]</span>    Remove file or directory
  <span class="term-green">cp / mv</span>     Copy / Move files

<span class="term-yellow">System &amp; Utilities:</span>
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

            'articles': () => {
                if (!allLoadedArticles || allLoadedArticles.length === 0) {
                    printToTerminal('No articles loaded. Run "sync" to fetch from repository.');
                    return;
                }
                let out = `<span class="term-cyan term-bold">=== ICT RESEARCH &amp; ENGINEERING REPOSITORY (DRIVE SYNC) ===</span><br>`;
                out += `<span class="term-dim">Total: ${allLoadedArticles.length} publications | Type "open &lt;id&gt;" to read in editor</span><br><br>`;
                allLoadedArticles.forEach((art, idx) => {
                    const title = currentLang === 'en' && art.title_en ? art.title_en : art.title;
                    out += `<span class="term-green">[${(idx + 1).toString().padStart(2, '0')}]</span> <span class="term-yellow">${art.id}</span><br>`;
                    out += `     &bull; <strong>${title}</strong><br>`;
                    out += `     &bull; <span class="term-dim">${art.doi || 'REF: NOC-2026'} | Cat: ${art.category || 'infra'} | ${art.readTime || '~10 min'}</span><br>`;
                });
                printToTerminal(out, true);
            },

            'papers': (args) => commands.articles(args),

            'open': (args) => {
                if (args.length === 0) {
                    printToTerminal('Usage: open <article-id | arenai | cv>');
                    return;
                }
                const target = args[0].toLowerCase();
                if (target === 'arenai') {
                    printToTerminal('<span class="term-green">Navigating to ArenAI platform...</span>', true);
                    setTimeout(() => { window.location.href = 'arenai/index.html'; }, 600);
                    return;
                }
                if (target === 'cv') {
                    printToTerminal('<span class="term-green">Navigating to Executive Interactive CV...</span>', true);
                    setTimeout(() => { window.location.href = 'cv/index.html'; }, 600);
                    return;
                }

                const matched = allLoadedArticles.find(a => 
                    a.id.toLowerCase() === target || 
                    a.id.toLowerCase().includes(target) || 
                    (a.doi && a.doi.toLowerCase().includes(target))
                );

                if (matched) {
                    printToTerminal(`<span class="term-green">Opening article:</span> ${matched.title}...`, true);
                    terminalModal.classList.remove('active');
                    openPaperModal(matched.id);
                } else {
                    printToTerminal(`open: article '${args[0]}' not found. Run "articles" to list available IDs.`);
                }
            },

            'sync': async () => {
                printToTerminal('<span class="term-cyan">Contacting Google Drive API &amp; local repository cache...</span>', true);
                if (window.DriveSync) {
                    try {
                        const articles = await window.DriveSync.syncNow();
                        allLoadedArticles = articles;
                        updateSpotlightSection(allLoadedArticles);
                        renderFilteredArticles();
                        const ts = new Date().toLocaleTimeString();
                        printToTerminal(`<span class="term-green">[SUCCESS] Synchronized ${articles.length} technical publications from Drive pipeline at ${ts}.</span>`, true);
                    } catch (e) {
                        printToTerminal(`<span class="term-red">[ERROR] Drive sync failed: ${e.message}</span>`, true);
                    }
                } else {
                    printToTerminal('<span class="term-yellow">DriveSync module not available.</span>', true);
                }
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

                // Check if operand matches an article ID in our Drive repository
                const matchedArt = allLoadedArticles.find(a => 
                    a.id.toLowerCase() === args[0].toLowerCase() || 
                    a.id.toLowerCase().replace('art-', '') === args[0].toLowerCase()
                );
                if (matchedArt) {
                    let out = `<span class="term-yellow term-bold">${matchedArt.title}</span><br>`;
                    out += `<span class="term-dim">${matchedArt.doi || 'REF: NOC-2026'} &bull; ${matchedArt.date}</span><br><br>`;
                    out += `<strong>ABSTRACT:</strong><br>${matchedArt.abstract}<br><br>`;
                    if (matchedArt.sections && matchedArt.sections[0]) {
                        out += `<span class="term-cyan term-bold">=== ${matchedArt.sections[0].heading} ===</span><br>`;
                        out += matchedArt.sections[0].content ? matchedArt.sections[0].content + '<br>' : '';
                    }
                    out += `<br><span class="term-dim">Type "open ${matchedArt.id}" to open full paper in interactive modal.</span>`;
                    printToTerminal(out, true);
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
        
        const quickTerminalBtn = document.getElementById('quick-terminal-btn');
        if (quickTerminalBtn) {
            quickTerminalBtn.addEventListener('click', openTerminal);
        }
        
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
    // INTERACTIVE RESEARCH PAPER & GUIDES READER MODAL (UPGRADED EDITORIAL SUITE)
    // =========================================================================
    const paperModalOverlay = document.getElementById('paper-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseBottomBtn = document.getElementById('modal-close-bottom-btn');
    const modalPaperType = document.getElementById('modal-paper-type');
    const modalPaperDoi = document.getElementById('modal-paper-doi');
    const modalPaperBody = document.getElementById('modal-paper-body');
    const readerProgressBar = document.getElementById('reader-progress-bar');
    const readerTocNav = document.getElementById('reader-toc-nav');
    const modalShareBtn = document.getElementById('modal-share-btn');
    const modalExternalLink = document.getElementById('modal-external-link');
    const readerTocDriveLink = document.getElementById('reader-toc-drive-link');
    const papersDatabase = (typeof window !== 'undefined' && window.papersDatabase) ? window.papersDatabase : {};

    let currentActiveDoc = null;
    let bodyScrollHandler = null;

    async function openPaperModal(paperId, initialMode = "paper") {
        if (!paperModalOverlay || !modalPaperBody) return;

        let doc = null;
        if (window.DriveSync && typeof window.DriveSync.getArticleById === 'function') {
            doc = await window.DriveSync.getArticleById(paperId);
        }
        if (!doc && papersDatabase) {
            doc = papersDatabase[paperId];
        }

        // Intelligent DOM Fallback: extract info directly from card if not in database
        if (!doc) {
            const cardEl = document.querySelector(`[data-paper="${paperId}"]`)?.closest('.feed-article-card, .pub-card, .note-card') 
                        || document.getElementById(`card-${paperId.replace('paper-', '')}`)
                        || document.getElementById(`note-${paperId.replace('paper-', '')}`);
            if (cardEl) {
                const title = cardEl.querySelector('.feed-card-title, .pub-title, .note-title')?.textContent || 'Documento Técnico';
                const type = cardEl.querySelector('.feed-cat-badge, .pub-type-badge, .note-category')?.textContent || 'RESEARCH ARTICLE';
                const doi = cardEl.querySelector('.feed-card-doi, .pub-doi-tag')?.textContent || 'REF: NOC-2026';
                const excerpt = cardEl.querySelector('.feed-card-excerpt, .pub-excerpt, .note-excerpt')?.textContent || '';
                const category = cardEl.querySelector('.feed-cat-badge, .pub-category, .note-category')?.textContent || 'Infraestructura';
                const hlItems = Array.from(cardEl.querySelectorAll('.feed-tag-pill, .pub-hl-item, .note-toc li')).map(el => el.textContent.trim());

                doc = {
                    id: paperId,
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

        if (!doc) return;
        currentActiveDoc = doc;

        // Populate header indicators
        if (modalPaperType) modalPaperType.textContent = doc.type || (doc.categoryLabel ? doc.categoryLabel.toUpperCase() : 'RESEARCH ARTICLE');
        if (modalPaperDoi) modalPaperDoi.textContent = doc.doi || 'REF: NOC-2026';

        // Deep linking hash update
        if (window.location.hash !== `#article/${doc.id || paperId}`) {
            history.pushState(null, '', `#article/${doc.id || paperId}`);
        }

        // External Link button toggle
        if (modalExternalLink) {
            const external = doc.driveLink || doc.externalUrl || doc.pdfUrl || (window.DriveSync ? window.DriveSync.getPublicFolderUrl() : 'https://drive.google.com/drive/folders/1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK?usp=sharing');
            if (external) {
                modalExternalLink.href = external;
                modalExternalLink.style.display = 'inline-flex';
            } else {
                modalExternalLink.style.display = 'none';
            }
        }

        // ToC Drive Link update
        if (readerTocDriveLink) {
            readerTocDriveLink.href = doc.driveLink || (window.DriveSync ? window.DriveSync.getPublicFolderUrl() : 'https://drive.google.com/drive/folders/1AFnB0awOPpeSgigx5uD_qPeJJF53mXXK?usp=sharing');
        }

        // Build Title, Meta & Abstract
        const isGuide = initialMode === 'guide' && doc.guide;
        const activeData = isGuide ? doc.guide : doc;
        const title = currentLang === 'en' && activeData.title_en ? activeData.title_en : activeData.title;
        const abstract = currentLang === 'en' && activeData.abstract_en ? activeData.abstract_en : activeData.abstract;
        const meta = doc.meta || `Autor: Leonardo Escobar &bull; Categoría: ${doc.categoryLabel || 'Infraestructura'} &bull; NOC Knowledge Hub`;

        let bodyHtml = `
            <h1 class="modal-doc-title">${title}</h1>
            <div class="modal-doc-meta">${meta}</div>
            <div class="modal-doc-abstract">
                <strong>ABSTRACT:</strong>
                ${abstract}
            </div>
        `;

        // Build Sections & Code Blocks
        if (activeData.sections && Array.isArray(activeData.sections)) {
            activeData.sections.forEach((sec, idx) => {
                const secId = `sec-heading-${idx}`;
                bodyHtml += `<h2 class="modal-doc-h2" id="${secId}">${sec.heading}</h2>`;
                if (sec.content) {
                    bodyHtml += `<p class="modal-doc-p">${sec.content}</p>`;
                }
                if (sec.code) {
                    bodyHtml += `
                        <div class="code-block-wrapper">
                            <div class="code-block-topbar">
                                <span><ion-icon name="terminal-outline"></ion-icon> BASH / CONFIG</span>
                                <button class="code-copy-btn">
                                    <ion-icon name="copy-outline"></ion-icon> <span>Copiar</span>
                                </button>
                            </div>
                            <pre class="modal-doc-code">${sec.code}</pre>
                        </div>
                    `;
                }
            });
        }

        // Build References
        if (activeData.references && Array.isArray(activeData.references)) {
            bodyHtml += `
                <div class="modal-doc-references" id="sec-references">
                    <h2 class="modal-doc-h2"><ion-icon name="library-outline"></ion-icon> Fuentes &amp; Referencias Técnicas</h2>
                    <ul class="modal-doc-ref-list">
            `;
            activeData.references.forEach(ref => {
                bodyHtml += `<li class="modal-ref-item">&bull; ${ref}</li>`;
            });
            bodyHtml += `</ul></div>`;
        }

        modalPaperBody.innerHTML = bodyHtml;
        modalPaperBody.scrollTop = 0;

        // Build Lateral Table of Contents (ToC)
        if (readerTocNav) {
            let tocHtml = '';
            if (doc.sections && Array.isArray(doc.sections)) {
                doc.sections.forEach((sec, idx) => {
                    tocHtml += `<a href="#sec-heading-${idx}" class="toc-link ${idx === 0 ? 'active' : ''}" data-target="sec-heading-${idx}">${sec.heading}</a>`;
                });
            }
            if (doc.references && Array.isArray(doc.references)) {
                tocHtml += `<a href="#sec-references" class="toc-link" data-target="sec-references">Referencias Técnicas</a>`;
            }
            readerTocNav.innerHTML = tocHtml;

            // ToC smooth scroll click listeners
            readerTocNav.querySelectorAll('.toc-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('data-target');
                    const targetHeading = document.getElementById(targetId);
                    if (targetHeading) {
                        targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        readerTocNav.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            });
        }

        // Wire Code Block Copy Buttons
        modalPaperBody.querySelectorAll('.code-copy-btn').forEach(copyBtn => {
            copyBtn.addEventListener('click', () => {
                const codeEl = copyBtn.closest('.code-block-wrapper')?.querySelector('.modal-doc-code');
                if (codeEl) {
                    navigator.clipboard.writeText(codeEl.textContent).then(() => {
                        const origHtml = copyBtn.innerHTML;
                        copyBtn.classList.add('copied');
                        copyBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> <span>¡Copiado!</span>';
                        setTimeout(() => {
                            copyBtn.classList.remove('copied');
                            copyBtn.innerHTML = origHtml;
                        }, 2000);
                    });
                }
            });
        });

        // Reading Progress Bar & Scroll Spy
        if (bodyScrollHandler) {
            modalPaperBody.removeEventListener('scroll', bodyScrollHandler);
        }

        if (readerProgressBar) readerProgressBar.style.width = '0%';

        bodyScrollHandler = () => {
            const scrollTotal = modalPaperBody.scrollHeight - modalPaperBody.clientHeight;
            if (scrollTotal > 0 && readerProgressBar) {
                const pct = (modalPaperBody.scrollTop / scrollTotal) * 100;
                readerProgressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
            }

            // Scroll-Spy for ToC
            const headings = modalPaperBody.querySelectorAll('.modal-doc-h2');
            let currentSecId = '';
            headings.forEach(h => {
                const top = h.offsetTop - modalPaperBody.offsetTop;
                if (modalPaperBody.scrollTop >= top - 60) {
                    currentSecId = h.getAttribute('id');
                }
            });

            if (currentSecId && readerTocNav) {
                readerTocNav.querySelectorAll('.toc-link').forEach(l => {
                    if (l.getAttribute('data-target') === currentSecId) {
                        l.classList.add('active');
                    } else {
                        l.classList.remove('active');
                    }
                });
            }
        };

        modalPaperBody.addEventListener('scroll', bodyScrollHandler, { passive: true });

        // Show Modal
        paperModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePaperModal() {
        if (paperModalOverlay) {
            paperModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (readerProgressBar) {
            readerProgressBar.style.width = '0%';
        }
        if (window.location.hash.startsWith('#article/')) {
            history.pushState('', document.title, window.location.pathname + window.location.search);
        }
    }

    // Share Button Handler (Deep Link)
    if (modalShareBtn) {
        modalShareBtn.addEventListener('click', () => {
            if (!currentActiveDoc) return;
            const shareUrl = window.location.origin + window.location.pathname + `#article/${currentActiveDoc.id || ''}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
                const origHtml = modalShareBtn.innerHTML;
                modalShareBtn.classList.add('copied');
                modalShareBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> <span>¡Enlace copiado!</span>';
                setTimeout(() => {
                    modalShareBtn.classList.remove('copied');
                    modalShareBtn.innerHTML = origHtml;
                }, 2200);
            }).catch(() => {
                prompt('Enlace directo al artículo:', shareUrl);
            });
        });
    }

    // Initial check for #article/ deep link on load
    function checkInitialArticleHash() {
        if (window.location.hash && window.location.hash.startsWith('#article/')) {
            const articleId = window.location.hash.replace('#article/', '').trim();
            if (articleId) {
                setTimeout(() => {
                    openPaperModal(articleId);
                }, 600);
            }
        }
    }

    window.addEventListener('hashchange', () => {
        if (window.location.hash && window.location.hash.startsWith('#article/')) {
            const articleId = window.location.hash.replace('#article/', '').trim();
            if (articleId && (!currentActiveDoc || currentActiveDoc.id !== articleId)) {
                openPaperModal(articleId);
            }
        } else if (!window.location.hash || !window.location.hash.startsWith('#article/')) {
            if (paperModalOverlay && paperModalOverlay.classList.contains('active')) {
                closePaperModal();
            }
        }
    });

    checkInitialArticleHash();

    // Event delegation for all read paper buttons (existing & dynamic)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-read-paper, .pub-btn-read, .btn-read-guide');
        if (btn) {
            e.preventDefault();
            const paperId = btn.getAttribute('data-paper');
            const mode = btn.getAttribute("data-mode") || (btn.classList.contains("btn-read-guide") ? "guide" : "paper");
            if (paperId) openPaperModal(paperId, mode);
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

