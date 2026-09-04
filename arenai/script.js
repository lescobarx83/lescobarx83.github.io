document.addEventListener('DOMContentLoaded', () => {
    const arenOverlay = document.getElementById('arenai-teleport-overlay');
    const arenText = document.getElementById('arenai-teleport-text');

    // 1. Initial Landing Optical Beam Fade In (450ms)
    if (arenOverlay) {
        setTimeout(() => {
            arenOverlay.classList.remove('active');
        }, 450);
    }

    // 2. INTERACTIVE CAPYBARA MASCOT "AREN" DIALOGUE & ASSET ANIMATION
    const mascotText = document.getElementById('mascot-text-speech');
    const btnInteract = document.getElementById('btn-interact-capy');
    const capyImg = document.getElementById('capy-real-img');

    const capyPhrases = [
        '"¡Hola! Soy Aren el Capibara. Estoy aquí para acompañarte en tu ruta de aprendizaje personalizada."',
        '"¿Sabías que avanzamos mejor cuando aprendemos a nuestro propio ritmo y sin presión?"',
        '"¡Excelente trabajo! Hoy reforzamos la retención cognitiva con grafos DAG en el aula."',
        '"Recuerda que cada logro, por pequeño que sea, te acerca más a tu meta. ¡Sigue adelante!"',
        '"Los profesores pueden ver tu progreso en tiempo real gracias a nuestros conectores WebSockets P2P."'
    ];

    let currentPhraseIdx = 0;

    if (btnInteract && mascotText) {
        btnInteract.addEventListener('click', () => {
            currentPhraseIdx = (currentPhraseIdx + 1) % capyPhrases.length;

            // Wink Animation Effect using Authentic Assets
            if (capyImg) {
                capyImg.src = 'img/profile_picture_capybara_wink.png';
                setTimeout(() => {
                    capyImg.src = 'img/profile_picture_capybara_eyes_open.png';
                }, 800);
            }

            mascotText.style.opacity = '0';
            setTimeout(() => {
                mascotText.textContent = capyPhrases[currentPhraseIdx];
                mascotText.style.opacity = '1';
            }, 200);
        });
    }

    // ==========================================================================
    // 2.5 PEDAGOGICAL DYNAMICS INTERACTIVE SHOWCASE (5 MODES OF AREN)
    // ==========================================================================
    const PEDAGOGY_DATA = {
        misiones: {
            img: 'img/capybara_sprite_normal_full.png',
            chipClass: 'chip-amber',
            chipText: 'Ruta Curricular &bull; Acompañamiento Diario',
            title: 'Guía de Misiones Curriculares',
            quote: '"¡Vamos paso a paso! Hoy desglosamos 3 conceptos clave de Álgebra. Sin prisa, asegurando que cada idea quede clara."',
            desc: 'Aren descompone tareas complejas y temarios densos en micro-misiones diarias digeribles. Esta metodología reduce la procrastinación en adolescentes al ofrecer un camino predecible y libre de agobio.',
            benefits: [
                { title: 'Menor sobrecarga mental:', desc: 'El temario se presenta en dosis de 15 a 20 minutos con descansos integrados.' },
                { title: 'Hábitos de estudio autónomos:', desc: 'Ayuda a los estudiantes a organizarse sin depender exclusivamente de recordatorios externos.' },
                { title: 'Espacio libre de juicios:', desc: 'Si no logras completar una misión hoy, Aren reajusta la ruta con calma y comprensión.' }
            ],
            btnIcon: 'play-circle-outline',
            btnText: 'Probar micro-misión de hoy',
            actionType: 'mision'
        },
        retos: {
            img: 'img/battle_sprite_front_capybara.png',
            chipClass: 'chip-coral',
            chipText: 'Participación en Vivo &bull; Dinámica de Clase',
            title: 'Retos Interactivos de Aula',
            quote: '"¡Atención equipo! El profesor ha lanzado un desafío rápido sobre las Leyes de Newton. ¿Quién tiene la clave?"',
            desc: 'Diseñado para romper la monotonía de la clase. Los docentes activan micro-desafíos en tiempo real que fomentan el debate y la participación de los alumnos sin temor a exponerse.',
            benefits: [
                { title: 'Participación activa del 100%:', desc: 'Cada estudiante responde desde su dispositivo sin la presión de equivocarse en público.' },
                { title: 'Feedback formativo inmediato:', desc: 'El docente detecta al instante qué conceptos necesitan mayor profundización.' },
                { title: 'Dinámicas de equipo:', desc: 'Promueve la colaboración entre compañeros en lugar de la rivalidad individual.' }
            ],
            btnIcon: 'flash-outline',
            btnText: 'Lanzar reto de prueba en vivo',
            actionType: 'reto'
        },
        logros: {
            img: 'img/profile_picture_capybara_wink.png',
            chipClass: 'chip-gold',
            chipText: 'Refuerzo Positivo &bull; Autoestima',
            title: 'Celebración de Logros y Esfuerzo',
            quote: '"¡Qué orgullo ver tu constancia! Incluso cuando el ejercicio fue difícil, no te rendiste. ¡Eso vale oro!"',
            desc: 'Aren no premia únicamente las notas perfectas; celebra la perseverancia, las rachas de estudio y el aprendizaje derivado de corregir errores. Construye una mentalidad de crecimiento.',
            benefits: [
                { title: 'Cero ansiedad ante el error:', desc: 'Equivocarse se reformula como un paso natural e indispensable para aprender.' },
                { title: 'Motivación intrínseca:', desc: 'Medallas y logros basados en la constancia personal y no en comparaciones destructivas.' },
                { title: 'Validación emocional constante:', desc: 'Un entorno cálido donde cada pequeño progreso es visible y celebrado.' }
            ],
            btnIcon: 'sparkles-outline',
            btnText: 'Celebrar logro con confeti',
            actionType: 'logro'
        },
        pausas: {
            img: 'img/profile_picture_sloth_winking.png',
            chipClass: 'chip-sage',
            chipText: 'Salud Mental &bull; Prevención de Fatiga',
            title: 'Pausas Cognitivas con el Perezoso',
            quote: '"Ufff... llevas 40 minutos enfocado. Cierra los ojos un momento... inhala profundo... 3, 2, 1... exhala despacio."',
            desc: 'La concentración prolongada agota la memoria de trabajo de los adolescentes. Nuestro compañero perezoso detecta la fatiga cognitiva e invita a pausas guiadas de respiración y descanso.',
            benefits: [
                { title: 'Prevención del burnout escolar:', desc: 'Descansos activos que restauran la agilidad mental y reducen dolores de cabeza.' },
                { title: 'Autorregulación del estrés:', desc: 'Ejercicios sencillos de respiración diafragmática para calmar la ansiedad pre-examen.' },
                { title: 'Mejor consolidación de la memoria:', desc: 'La neurociencia demuestra que los conceptos se fijan mejor tras un micro-descanso.' }
            ],
            btnIcon: 'leaf-outline',
            btnText: 'Iniciar respiración guiada (4s)',
            actionType: 'pausa'
        },
        rpg: {
            img: 'img/battle_sprite_back_capybara.png',
            chipClass: 'chip-teal',
            chipText: 'Gamificación Dinámica &bull; Repaso Activo',
            title: 'Modo Arena RPG de Aprendizaje',
            quote: '"¡Modo batalla activado! Cada respuesta rápida y correcta asesta daño al bug del olvido. ¡Demuestra lo que sabes!"',
            desc: 'Inspirado en la estética clásica de batallas por turnos y la velocidad de Kahoot. Los estudiantes repasan temas clave en duelos interactivos donde la rapidez y precisión multiplican el impacto.',
            benefits: [
                { title: 'Gamificación no punitiva:', desc: 'Repasar conceptos se siente como jugar una partida emocionante de RPG.' },
                { title: 'Multiplicador por velocidad:', desc: 'Responder en los primeros 3 segundos otorga golpes críticos x3.0 pedagógicos.' },
                { title: 'Efecto de espaciado óptimo:', desc: 'Las preguntas se adaptan dinámicamente a los temas con menor tasa de retención.' }
            ],
            btnIcon: 'game-controller-outline',
            btnText: 'Ir a la Arena de Batalla en vivo',
            actionType: 'rpg'
        }
    };

    const pedagogyCards = document.querySelectorAll('.pedagogy-mode-card');
    const spotlightMascotImg = document.getElementById('spotlight-mascot-img');
    const spotlightQuote = document.getElementById('spotlight-dialogue-quote');
    const spotlightCategoryChip = document.getElementById('spotlight-category-chip');
    const spotlightTitle = document.getElementById('spotlight-title');
    const spotlightDesc = document.getElementById('spotlight-desc');
    const spotlightBenefits = document.getElementById('spotlight-benefits');
    const spotlightBtnIcon = document.getElementById('spotlight-btn-icon');
    const spotlightActionText = document.getElementById('spotlight-action-text');
    const spotlightFeedback = document.getElementById('spotlight-feedback');
    const btnSpotlightAction = document.getElementById('btn-spotlight-action');

    let currentPedagogyMode = 'misiones';

    function setPedagogyMode(modeKey) {
        const data = PEDAGOGY_DATA[modeKey];
        if (!data) return;
        currentPedagogyMode = modeKey;

        // Update card active states
        pedagogyCards.forEach(card => {
            if (card.getAttribute('data-mode') === modeKey) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Hide feedback container on switch
        if (spotlightFeedback) {
            spotlightFeedback.style.display = 'none';
            spotlightFeedback.innerHTML = '';
        }

        // Animate elements out and in smoothly
        if (spotlightMascotImg) {
            spotlightMascotImg.style.transform = 'scale(0.85)';
            spotlightMascotImg.style.opacity = '0.5';
            setTimeout(() => {
                spotlightMascotImg.src = data.img;
                spotlightMascotImg.style.transform = 'scale(1)';
                spotlightMascotImg.style.opacity = '1';
            }, 180);
        }

        if (spotlightQuote) {
            spotlightQuote.style.opacity = '0';
            setTimeout(() => {
                spotlightQuote.textContent = data.quote;
                spotlightQuote.style.opacity = '1';
            }, 180);
        }

        if (spotlightCategoryChip) {
            spotlightCategoryChip.className = `pedagogy-chip ${data.chipClass}`;
            spotlightCategoryChip.innerHTML = `${data.chipText}`;
        }

        if (spotlightTitle) spotlightTitle.textContent = data.title;
        if (spotlightDesc) spotlightDesc.textContent = data.desc;

        if (spotlightBenefits) {
            spotlightBenefits.innerHTML = data.benefits.map(b => `
                <div class="spotlight-benefit-item">
                    <div class="benefit-icon"><ion-icon name="checkmark-circle"></ion-icon></div>
                    <div>
                        <strong>${b.title}</strong>
                        <span>${b.desc}</span>
                    </div>
                </div>
            `).join('');
        }

        if (spotlightBtnIcon) spotlightBtnIcon.setAttribute('name', data.btnIcon);
        if (spotlightActionText) spotlightActionText.textContent = data.btnText;
    }

    pedagogyCards.forEach(card => {
        card.addEventListener('click', () => {
            const mode = card.getAttribute('data-mode');
            setPedagogyMode(mode);
        });
    });

    // Handle interactive action button click
    if (btnSpotlightAction) {
        btnSpotlightAction.addEventListener('click', () => {
            if (!spotlightFeedback) return;
            const data = PEDAGOGY_DATA[currentPedagogyMode];
            if (!data) return;

            spotlightFeedback.style.display = 'block';

            if (data.actionType === 'mision') {
                spotlightFeedback.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                        <strong style="color: var(--aren-coffee-deep); font-size: 0.95rem;">🎯 Misión Activa de Hoy: Matemáticas Básicas</strong>
                        <span style="font-size: 0.78rem; background: var(--aren-green-mint-soft); color: var(--aren-green-deep); padding: 2px 8px; border-radius: 12px; font-weight: 700;">En progreso</span>
                    </div>
                    <p style="font-size: 0.88rem; color: var(--text-earth); margin-bottom: 0.6rem;">1. Repasar 2 propiedades de los triángulos (4 min) &bull; 2. Resolver 1 reto con Aren (3 min) &bull; 3. Pausa consciente de 2 min.</p>
                    <div style="background: var(--aren-latte-soft); height: 8px; border-radius: 999px; overflow: hidden;">
                        <div style="width: 65%; height: 100%; background: var(--aren-green-leaf);"></div>
                    </div>
                `;
            } else if (data.actionType === 'reto') {
                spotlightFeedback.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.4rem;">
                        <ion-icon name="flash" style="color: #E05624; font-size: 1.4rem;"></ion-icon>
                        <strong style="color: #C2410C; font-size: 0.95rem;">⚡ Reto sorpresa de aula iniciado</strong>
                    </div>
                    <p style="font-size: 0.88rem; color: var(--text-earth); margin: 0;">"¿Cuál es el planeta con mayor densidad en el sistema solar?" &bull; <em>¡Tus compañeros ya están votando!</em></p>
                `;
            } else if (data.actionType === 'logro') {
                spotlightFeedback.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 2rem;">🎉</span>
                        <div>
                            <strong style="color: #9A6700; font-size: 0.96rem;">¡+100 EXP por Constancia Desbloqueados!</strong>
                            <p style="font-size: 0.85rem; color: var(--text-earth); margin: 0;">Aren: "¡Impresionante constancia esta semana! Sigue cuidando tu ritmo."</p>
                        </div>
                    </div>
                `;
                if (spotlightMascotImg) {
                    spotlightMascotImg.style.transform = 'scale(1.15) rotate(5deg)';
                    setTimeout(() => {
                        spotlightMascotImg.style.transform = 'scale(1)';
                    }, 400);
                }
            } else if (data.actionType === 'pausa') {
                spotlightFeedback.innerHTML = `
                    <div style="text-align: center; padding: 0.5rem 0;">
                        <div style="display: inline-block; width: 44px; height: 44px; border-radius: 50%; background: rgba(98, 139, 112, 0.25); border: 2px solid var(--aren-green-leaf); animation: pulseBreathing 4s ease-in-out infinite; margin-bottom: 0.5rem;"></div>
                        <p style="font-size: 0.95rem; font-weight: 700; color: var(--aren-green-deep); margin-bottom: 0.2rem;" id="breath-text">Inhala hondo... (4s)</p>
                        <span style="font-size: 0.82rem; color: var(--text-earth);">Siente cómo tus hombros bajan y tu mente se oxigena.</span>
                    </div>
                `;
                const breathEl = document.getElementById('breath-text');
                setTimeout(() => { if (breathEl) breathEl.textContent = 'Mantén el aire... (2s)'; }, 1500);
                setTimeout(() => { if (breathEl) breathEl.textContent = 'Exhala despacio... ¡Mente lista!'; }, 2800);
            } else if (data.actionType === 'rpg') {
                const demoSec = document.getElementById('demostracion');
                if (demoSec) demoSec.scrollIntoView({ behavior: 'smooth' });
                const tabGam = document.querySelector('.demo-tab-btn[data-tab="tab-gamificacion"]');
                if (tabGam) setTimeout(() => tabGam.click(), 400);
            }
        });
    }

    // 3. INTERACTIVE DEMO GALLERY MOCKUP TABS SWITCHING
    const tabBtns = document.querySelectorAll('.demo-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
                if (targetTab === 'tab-dag') {
                    setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
                }
            }
        });
    });

    // 4. BI-DIRECTIONAL REVERSE TRANSITION BACK TO RACK (ARENAI -> PORTFOLIO RACK)
    const backTriggers = document.querySelectorAll('.aren-back-portfolio-link, .aren-footer-back-link');

    backTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = trigger.getAttribute('href');

            // Flag that we are returning from a project so Animación A (doors) is SKIPPED, and Animación B (blade lock) plays
            sessionStorage.setItem('returnedFromProject', 'true');

            if (arenOverlay && arenText) {
                arenText.textContent = 'Guardando sesión y volviendo al portafolio...';
                arenOverlay.classList.add('active');

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 750);
            } else {
                window.location.href = targetUrl;
            }
        });
    });

    // 5. SCROLL REVEAL ANIMATIONS — Premium Section Entry Effects
    const arenSections = document.querySelectorAll('.aren-section, .aren-bg-alt');
    arenSections.forEach(section => {
        const header = section.querySelector('.aren-section-header');
        if (header) header.classList.add('aren-reveal');

        const children = section.querySelectorAll('.aren-feature-card, .showcase-card, .aren-arch-card, .mascot-showcase-item, .interactive-demo-tabs, .aren-team-card');
        children.forEach(child => child.classList.add('aren-reveal'));
    });

    const arenRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? parent.querySelectorAll('.aren-reveal') : [];
                let delay = 0;
                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) delay = i * 100;
                });
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                arenRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.aren-reveal').forEach(el => arenRevealObserver.observe(el));

    // 6. NAV ACTIVE SECTION TRACKING ON SCROLL
    const arenSectionsList = document.querySelectorAll('section[id]');
    const arenNavLinks = document.querySelectorAll('.aren-link');

    window.addEventListener('scroll', () => {
        let current = '';
        arenSectionsList.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        arenNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // 7. UNDER CONSTRUCTION ACCESS CONTROL (PASSWORD: 1235)
    const lockOverlay = document.getElementById('arenai-lock-overlay');
    const lockCard = document.getElementById('lock-card');
    const lockForm = document.getElementById('arenai-unlock-form');
    const lockInput = document.getElementById('lock-password-input');
    const lockFeedback = document.getElementById('lock-feedback-msg');
    const lockIcon = document.getElementById('lock-main-icon');
    const lockBadge = document.querySelector('.lock-status-badge span');
    const btnToggleVis = document.getElementById('btn-toggle-visibility');
    const visIcon = document.getElementById('visibility-icon');

    const ACCESS_PASS = '1235';

    // Check if session is already unlocked
    const isUnlocked = sessionStorage.getItem('arenai_unlocked') === 'true';

    if (isUnlocked && lockOverlay) {
        document.body.classList.remove('arenai-locked');
        lockOverlay.classList.add('unlocked');
    } else {
        document.body.classList.add('arenai-locked');
        if (lockInput) {
            setTimeout(() => lockInput.focus(), 600);
        }
    }

    // Toggle password visibility
    if (btnToggleVis && lockInput && visIcon) {
        btnToggleVis.addEventListener('click', () => {
            if (lockInput.type === 'password') {
                lockInput.type = 'text';
                visIcon.setAttribute('name', 'eye-off-outline');
            } else {
                lockInput.type = 'password';
                visIcon.setAttribute('name', 'eye-outline');
            }
        });
    }

    // Submit Unlock Logic
    const handleUnlock = (e) => {
        if (e) e.preventDefault();
        if (!lockInput) return;

        const enteredValue = lockInput.value.trim();

        if (enteredValue === ACCESS_PASS) {
            // Success
            if (lockFeedback) {
                lockFeedback.textContent = '¡Clave Correcta! Desbloqueando plataforma...';
                lockFeedback.className = 'lock-feedback-msg success';
            }
            if (lockCard) lockCard.classList.add('unlocked-success');
            if (lockIcon) lockIcon.setAttribute('name', 'lock-open-outline');
            if (lockBadge) lockBadge.textContent = 'ACCESO AUTORIZADO';

            sessionStorage.setItem('arenai_unlocked', 'true');

            setTimeout(() => {
                if (lockOverlay) lockOverlay.classList.add('unlocked');
                document.body.classList.remove('arenai-locked');
            }, 550);
        } else {
            // Error
            if (lockCard) {
                lockCard.classList.remove('shake');
                void lockCard.offsetWidth; // trigger reflow
                lockCard.classList.add('shake');
            }
            if (lockFeedback) {
                lockFeedback.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
                lockFeedback.className = 'lock-feedback-msg error';
            }
            lockInput.select();
            lockInput.focus();
        }
    };

    if (lockForm) {
        lockForm.addEventListener('submit', handleUnlock);
    }

    // ==========================================================================
    // 8. 3D GLOBE OF KNOWLEDGE & INTER-MATERIA DEPENDENCY GRAPH
    // ==========================================================================
    const globeCanvas = document.getElementById('globe-3d-canvas');
    const interDisplay = document.getElementById('inter-connection-display');

    if (globeCanvas) {
        const ctx = globeCanvas.getContext('2d');

        // Color palette for subjects
        const SUBJECT_COLORS = {
            'Matemáticas': { hex: '#e76f51', light: 'rgba(231,111,81,0.2)', tag: '#b23b1e' },
            'Física': { hex: '#2a9d8f', light: 'rgba(42,157,143,0.2)', tag: '#1b6a60' },
            'Biología': { hex: '#52b788', light: 'rgba(82,183,136,0.25)', tag: '#246b4c' },
            'Informática': { hex: '#e9c46a', light: 'rgba(233,196,106,0.28)', tag: '#997300' },
            'Humanidades': { hex: '#9c6644', light: 'rgba(156,102,68,0.22)', tag: '#6b3e24' }
        };

        // Topic Nodes in spherical coordinates (lat, lon in degrees)
        const nodes = [
            // Matemáticas (#e76f51)
            { id: 'mat-alg', name: 'Álgebra Lineal', subject: 'Matemáticas', lat: 24, lon: -40 },
            { id: 'mat-calc', name: 'Cálculo Diferencial', subject: 'Matemáticas', lat: 48, lon: -70 },
            { id: 'mat-geom', name: 'Geometría Analítica', subject: 'Matemáticas', lat: 10, lon: -85 },
            { id: 'mat-prob', name: 'Probabilidad y Estadística', subject: 'Matemáticas', lat: -25, lon: -55 },

            // Física (#2a9d8f)
            { id: 'fis-mec', name: 'Mecánica Clásica', subject: 'Física', lat: 50, lon: 20 },
            { id: 'fis-term', name: 'Termodinámica', subject: 'Física', lat: 15, lon: 45 },
            { id: 'fis-elec', name: 'Electromagnetismo', subject: 'Física', lat: 35, lon: 75 },

            // Biología (#52b788)
            { id: 'bio-cel', name: 'Biología Celular', subject: 'Biología', lat: -15, lon: 10 },
            { id: 'bio-gen', name: 'Genética Molecular', subject: 'Biología', lat: -45, lon: 35 },
            { id: 'bio-neuro', name: 'Neurobiología Cognitiva', subject: 'Biología', lat: -10, lon: 95 },
            { id: 'bio-eco', name: 'Ecología de Sistemas', subject: 'Biología', lat: -38, lon: -15 },

            // Informática (#e9c46a)
            { id: 'inf-redes', name: 'Redes Neuronales & IA', subject: 'Informática', lat: 5, lon: -140 },
            { id: 'inf-graf', name: 'Grafos & Algoritmos', subject: 'Informática', lat: 35, lon: -160 },
            { id: 'inf-log', name: 'Lógica Computacional', subject: 'Informática', lat: -20, lon: -130 },
            { id: 'inf-datos', name: 'Bases de Datos Vectoriales', subject: 'Informática', lat: 20, lon: -105 },

            // Humanidades (#9c6644)
            { id: 'hum-etica', name: 'Ética Tecnológica', subject: 'Humanidades', lat: -32, lon: 140 },
            { id: 'hum-epis', name: 'Epistemología del Aprendizaje', subject: 'Humanidades', lat: -5, lon: 165 }
        ];

        // Dependencies between topics (with inter-materia notes)
        const connections = [
            // INTER-MATERIA DEPENDENCIES
            {
                from: 'mat-alg', to: 'inf-redes', isInter: true,
                note: '"El dominio de matrices y transformaciones vectoriales permite comprender la retropropagación en IA sin frustración conceptual."'
            },
            {
                from: 'mat-calc', to: 'fis-mec', isInter: true,
                note: '"Las derivadas e integrales de Newton fundamentan el cálculo de trayectorias y energía en la física mecánica."'
            },
            {
                from: 'bio-neuro', to: 'inf-redes', isInter: true,
                note: '"El estudio de la sinapsis biológica inspiró la arquitectura de perceptrones multicapa y aprendizaje profundo."'
            },
            {
                from: 'bio-gen', to: 'inf-datos', isInter: true,
                note: '"La alineación de secuencias de ADN requiere algoritmos de indexación y bases de datos multidimensionales."'
            },
            {
                from: 'hum-etica', to: 'inf-redes', isInter: true,
                note: '"La inteligencia artificial debe estar guiada por principios humanistas que protejan la privacidad y el bienestar juvenil."'
            },
            {
                from: 'fis-term', to: 'bio-eco', isInter: true,
                note: '"Las leyes de conservación de energía y entropía explican los ciclos de biomasa en los ecosistemas naturales."'
            },
            // INTRA-MATERIA DEPENDENCIES
            { from: 'mat-geom', to: 'mat-alg', isInter: false },
            { from: 'mat-calc', to: 'mat-prob', isInter: false },
            { from: 'fis-mec', to: 'fis-term', isInter: false },
            { from: 'bio-cel', to: 'bio-gen', isInter: false },
            { from: 'inf-log', to: 'inf-graf', isInter: false },
            { from: 'inf-graf', to: 'inf-redes', isInter: false },
            { from: 'hum-epis', to: 'hum-etica', isInter: false }
        ];

        // Active highlighted inter-materia connection index for cyclic demonstration
        let activeInterIdx = 0;
        const interConnections = connections.filter(c => c.isInter);

        function updateInterDisplay(conn) {
            if (!interDisplay || !conn) return;
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return;

            const fromCol = SUBJECT_COLORS[fromNode.subject];
            const toCol = SUBJECT_COLORS[toNode.subject];

            interDisplay.innerHTML = `
                <span class="inter-badge">
                    <ion-icon name="flash-outline"></ion-icon> CONEXIÓN INTER-MATERIA ACTIVA
                </span>
                <div class="inter-formula">
                    <span class="subj-tag" style="background:${fromCol.light}; color:${fromCol.tag};">${fromNode.name} (${fromNode.subject})</span>
                    <ion-icon name="arrow-forward-outline" style="color:var(--aren-caramel); font-size:1.15rem;"></ion-icon>
                    <span class="subj-tag" style="background:${toCol.light}; color:${toCol.tag};">${toNode.name} (${toNode.subject})</span>
                </div>
                <p class="inter-note">${conn.note || 'Conexión cognitiva interdisciplinaria procesada por el motor pedagógico de ArenAI.'}</p>
            `;
        }

        // Cycle through inter-materia connections every 4.8 seconds
        setInterval(() => {
            activeInterIdx = (activeInterIdx + 1) % interConnections.length;
            updateInterDisplay(interConnections[activeInterIdx]);
        }, 4800);

        // 3D Globe Rotation Angles & Physics
        let rotY = 0.5;
        let rotX = 0.35;
        let velY = 0.0035; // auto-spin velocity
        let velX = 0;
        let isDragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let hoveredNode = null;
        let particleProgress = 0;

        // Auto-scale canvas for device pixel ratio
        function resizeCanvas() {
            const rect = globeCanvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            globeCanvas.width = (rect.width || 560) * dpr;
            globeCanvas.height = (rect.height || 420) * dpr;
            ctx.scale(dpr, dpr);
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Spherical to 3D Cartesian coordinates
        const GLOBE_RADIUS = 138;

        function get3DCoords(latDeg, lonDeg, radius = GLOBE_RADIUS) {
            const latRad = (latDeg * Math.PI) / 180;
            const lonRad = (lonDeg * Math.PI) / 180;

            const x0 = radius * Math.cos(latRad) * Math.sin(lonRad);
            const y0 = -radius * Math.sin(latRad);
            const z0 = radius * Math.cos(latRad) * Math.cos(lonRad);

            // Rotate around Y axis (longitude rotation)
            const cosY = Math.cos(rotY);
            const sinY = Math.sin(rotY);
            const x1 = x0 * cosY + z0 * sinY;
            const z1 = -x0 * sinY + z0 * cosY;

            // Rotate around X axis (latitude tilt)
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);
            const y2 = y0 * cosX - z1 * sinX;
            const z2 = y0 * sinX + z1 * cosX;

            return { x: x1, y: y2, z: z2 };
        }

        // Draw the 3D Sphere Wireframe
        function drawWireframe(cx, cy) {
            ctx.save();
            ctx.translate(cx, cy);

            // Outer subtle atmospheric aura
            const aura = ctx.createRadialGradient(0, 0, GLOBE_RADIUS * 0.85, 0, 0, GLOBE_RADIUS * 1.18);
            aura.addColorStop(0, 'rgba(82, 183, 136, 0.08)');
            aura.addColorStop(0.6, 'rgba(200, 137, 91, 0.05)');
            aura.addColorStop(1, 'transparent');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(0, 0, GLOBE_RADIUS * 1.18, 0, Math.PI * 2);
            ctx.fill();

            // Sphere base body
            const globeGrad = ctx.createRadialGradient(-35, -35, 10, 0, 0, GLOBE_RADIUS);
            globeGrad.addColorStop(0, '#ffffff');
            globeGrad.addColorStop(0.5, '#faf6f0');
            globeGrad.addColorStop(0.85, '#ede1d2');
            globeGrad.addColorStop(1, '#d8c4b0');
            ctx.fillStyle = globeGrad;
            ctx.beginPath();
            ctx.arc(0, 0, GLOBE_RADIUS, 0, Math.PI * 2);
            ctx.fill();

            // Outer perimeter border ring
            ctx.strokeStyle = 'rgba(125, 79, 52, 0.22)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Latitude & Longitude grid lines
            ctx.strokeStyle = 'rgba(125, 79, 52, 0.12)';
            ctx.lineWidth = 1;

            // Parallels (latitudes: -60, -30, 0, 30, 60)
            [-60, -30, 0, 30, 60].forEach(lat => {
                ctx.beginPath();
                let first = true;
                for (let lon = -180; lon <= 180; lon += 8) {
                    const pt = get3DCoords(lat, lon);
                    if (pt.z >= -10) { // front visible hemisphere
                        if (first) {
                            ctx.moveTo(pt.x, pt.y);
                            first = false;
                        } else {
                            ctx.lineTo(pt.x, pt.y);
                        }
                    } else {
                        first = true;
                    }
                }
                ctx.stroke();
            });

            // Meridians (longitudes: step by 45 deg)
            for (let lon = -180; lon < 180; lon += 45) {
                ctx.beginPath();
                let first = true;
                for (let lat = -90; lat <= 90; lat += 6) {
                    const pt = get3DCoords(lat, lon);
                    if (pt.z >= -10) {
                        if (first) {
                            ctx.moveTo(pt.x, pt.y);
                            first = false;
                        } else {
                            ctx.lineTo(pt.x, pt.y);
                        }
                    } else {
                        first = true;
                    }
                }
                ctx.stroke();
            }

            ctx.restore();
        }

        // Draw 3D curved dependency arcs between topics
        function drawConnections(cx, cy) {
            ctx.save();
            ctx.translate(cx, cy);

            const curActiveConn = interConnections[activeInterIdx];

            connections.forEach(conn => {
                const n1 = nodes.find(n => n.id === conn.from);
                const n2 = nodes.find(n => n.id === conn.to);
                if (!n1 || !n2) return;

                const p1 = get3DCoords(n1.lat, n1.lon);
                const p2 = get3DCoords(n2.lat, n2.lon);

                // Both nodes behind sphere? Skip to avoid clutter
                if (p1.z < -20 && p2.z < -20) return;

                const isCurrentActive = curActiveConn && (conn.from === curActiveConn.from && conn.to === curActiveConn.to);
                const isInter = conn.isInter;

                // Midpoint elevated above sphere surface for 3D curved arc effect
                const midLat = (n1.lat + n2.lat) / 2;
                let midLon = (n1.lon + n2.lon) / 2;
                // handle wrap-around
                if (Math.abs(n1.lon - n2.lon) > 180) {
                    midLon += 180;
                }
                const elevatedRadius = GLOBE_RADIUS * (isInter ? 1.22 : 1.12);
                const midP = get3DCoords(midLat, midLon, elevatedRadius);

                // Arc styling
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.quadraticCurveTo(midP.x, midP.y, p2.x, p2.y);

                if (isCurrentActive) {
                    // Active inter-materia connection: bright glowing animated beam
                    ctx.strokeStyle = '#e76f51';
                    ctx.lineWidth = 2.8;
                    ctx.shadowColor = 'rgba(231, 111, 81, 0.6)';
                    ctx.shadowBlur = 8;
                    ctx.stroke();

                    // Animated energy pulse particle flowing from p1 to p2
                    const t = particleProgress;
                    const qx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midP.x + t * t * p2.x;
                    const qy = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midP.y + t * t * p2.y;

                    ctx.shadowBlur = 12;
                    ctx.shadowColor = '#e9c46a';
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(qx, qy, 5, 0, Math.PI * 2);
                    ctx.fill();

                    // Outer pulse ring
                    ctx.strokeStyle = '#e9c46a';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(qx, qy, 8, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (isInter) {
                    // Other inter-materia dependencies: visible warm dashed arc
                    ctx.strokeStyle = 'rgba(200, 137, 91, 0.55)';
                    ctx.lineWidth = 1.6;
                    ctx.shadowBlur = 0;
                    ctx.setLineDash([4, 4]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                } else {
                    // Standard intra-materia dependencies: subtle green line
                    ctx.strokeStyle = 'rgba(82, 183, 136, 0.35)';
                    ctx.lineWidth = 1.2;
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            });

            ctx.restore();
        }

        // Draw topic nodes on the globe
        function drawNodes(cx, cy) {
            ctx.save();
            ctx.translate(cx, cy);

            // Sort nodes by Z (back to front) for natural depth occlusion
            const projectedNodes = nodes.map(n => {
                const pt = get3DCoords(n.lat, n.lon);
                return { ...n, ...pt };
            }).sort((a, b) => a.z - b.z);

            projectedNodes.forEach(node => {
                // If deep on the back of the globe, render faded or hide
                if (node.z < -GLOBE_RADIUS * 0.2) return;

                const col = SUBJECT_COLORS[node.subject] || { hex: '#7d4f34' };
                const isHovered = hoveredNode && hoveredNode.id === node.id;
                const isCurActiveInter = interConnections[activeInterIdx] &&
                    (interConnections[activeInterIdx].from === node.id || interConnections[activeInterIdx].to === node.id);

                // Node size scale based on z-depth
                const depthScale = Math.max(0.65, (node.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
                const radius = (isHovered || isCurActiveInter ? 7 : 5) * depthScale;

                // Pulsing glow for active or hovered nodes
                if (isHovered || isCurActiveInter) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius * 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = col.hex + '33';
                    ctx.fill();
                }

                // Node outer circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius + 2, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
                ctx.strokeStyle = col.hex;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Node inner core
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = col.hex;
                ctx.fill();

                // Topic label for front-facing nodes
                if (node.z > 25 || isHovered || isCurActiveInter) {
                    ctx.font = `${isHovered || isCurActiveInter ? 'bold 11px' : '600 10px'} "Plus Jakarta Sans", sans-serif`;
                    ctx.fillStyle = isHovered ? '#1b4332' : 'rgba(43, 29, 21, 0.9)';
                    ctx.textAlign = 'center';

                    // Label background pill for readability
                    const textWidth = ctx.measureText(node.name).width;
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
                    ctx.beginPath();
                    ctx.roundRect(node.x - textWidth / 2 - 5, node.y - 20, textWidth + 10, 15, 6);
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(125, 79, 52, 0.2)';
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Text
                    ctx.fillStyle = isHovered ? '#b23b1e' : '#2b1d15';
                    ctx.fillText(node.name, node.x, node.y - 9);
                }
            });

            ctx.restore();
        }

        // Main Render Loop
        function animateGlobe() {
            const rect = globeCanvas.getBoundingClientRect();
            const w = rect.width || 560;
            const h = rect.height || 420;
            const cx = w / 2;
            const cy = h / 2;

            ctx.clearRect(0, 0, w, h);

            // Update rotation
            if (!isDragging) {
                rotY += velY;
                rotX += velX;
                velY *= 0.985;
                velX *= 0.985;
                if (Math.abs(velY) < 0.0035) velY = 0.0035; // gentle continuous ambient rotation
            }

            // Keep tilt bounded so user doesn't flip the globe upside-down
            rotX = Math.max(-1.1, Math.min(1.1, rotX));

            // Particle progress along active dependency
            particleProgress = (particleProgress + 0.018) % 1;

            // Render passes
            drawWireframe(cx, cy);
            drawConnections(cx, cy);
            drawNodes(cx, cy);

            requestAnimationFrame(animateGlobe);
        }

        requestAnimationFrame(animateGlobe);

        // Interaction: Drag to Rotate & Click / Hover on Nodes
        function getPointerPos(e) {
            const rect = globeCanvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top,
                rawX: clientX,
                rawY: clientY
            };
        }

        function checkNodeHover(pos) {
            const rect = globeCanvas.getBoundingClientRect();
            const cx = (rect.width || 560) / 2;
            const cy = (rect.height || 420) / 2;

            let closest = null;
            let minDist = 18;

            nodes.forEach(n => {
                const pt = get3DCoords(n.lat, n.lon);
                if (pt.z >= -20) {
                    const screenX = cx + pt.x;
                    const screenY = cy + pt.y;
                    const dist = Math.hypot(pos.x - screenX, pos.y - screenY);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = n;
                    }
                }
            });
            return closest;
        }

        globeCanvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        globeCanvas.addEventListener('mousemove', (e) => {
            const pos = getPointerPos(e);

            if (isDragging) {
                const dx = e.clientX - lastMouseX;
                const dy = e.clientY - lastMouseY;
                rotY += dx * 0.0075;
                rotX += dy * 0.0075;
                velY = dx * 0.003;
                velX = dy * 0.003;
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
            } else {
                hoveredNode = checkNodeHover(pos);
                globeCanvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
            }
        });

        // Click to switch active inter-subject card to hovered node's dependency
        globeCanvas.addEventListener('click', (e) => {
            const pos = getPointerPos(e);
            const clickedNode = checkNodeHover(pos);
            if (clickedNode) {
                const relatedConn = interConnections.find(c => c.from === clickedNode.id || c.to === clickedNode.id);
                if (relatedConn) {
                    activeInterIdx = interConnections.indexOf(relatedConn);
                    updateInterDisplay(relatedConn);
                }
            }
        });

        // Touch support for mobile devices
        globeCanvas.addEventListener('touchstart', (e) => {
            isDragging = true;
            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;
        }, { passive: true });

        globeCanvas.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const dx = e.touches[0].clientX - lastMouseX;
            const dy = e.touches[0].clientY - lastMouseY;
            rotY += dx * 0.0075;
            rotX += dy * 0.0075;
            velY = dx * 0.003;
            velX = dy * 0.003;
            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;
        }, { passive: true });

        globeCanvas.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // ==========================================================================
    // 9. POKÉMON-STYLE BATTLE + KAHOOT SPEED-BASED QUIZ ENGINE
    // ==========================================================================
    const quizMateriaEl = document.getElementById('quiz-materia');
    const quizRoundEl = document.getElementById('quiz-round');
    const quizQuestionEl = document.getElementById('quiz-question');
    const timerDisplayEl = document.getElementById('timer-display');
    const multiplierDisplayEl = document.getElementById('multiplier-display');
    const timerBarEl = document.getElementById('kahoot-timer-bar');
    const dialogueTextEl = document.getElementById('pkmn-dialogue-text');
    const enemyNameEl = document.getElementById('enemy-name');
    const enemyHpCurrentEl = document.getElementById('enemy-hp-current');
    const enemyHpFillEl = document.getElementById('enemy-hp-fill');
    const enemySpriteEl = document.getElementById('enemy-sprite');
    const playerSpriteEl = document.getElementById('player-sprite');
    const floatingDamageEl = document.getElementById('floating-damage');
    const btnRestartBattle = document.getElementById('btn-restart-battle');
    const btnSoundToggle = document.getElementById('btn-pkmn-sound');
    const soundIconEl = document.getElementById('sound-icon');
    const soundLabelEl = document.getElementById('sound-label');

    const answerBtns = [
        document.querySelector('.kahoot-btn[data-index="0"]'),
        document.querySelector('.kahoot-btn[data-index="1"]'),
        document.querySelector('.kahoot-btn[data-index="2"]'),
        document.querySelector('.kahoot-btn[data-index="3"]')
    ];

    const ansTexts = [
        document.getElementById('ans-text-0'),
        document.getElementById('ans-text-1'),
        document.getElementById('ans-text-2'),
        document.getElementById('ans-text-3')
    ];

    // Audio SFX Setup (Muted by default)
    let soundEnabled = false;
    const sfxHit = new Audio('img/hit-sound.mp3');
    const sfxCrit = new Audio('img/critical-hit-sound.mp3');

    function playSfx(isCritical = false) {
        if (!soundEnabled) return;
        try {
            const sound = isCritical ? sfxCrit : sfxHit;
            sound.currentTime = 0;
            sound.play().catch(() => {});
        } catch (e) {}
    }

    if (btnSoundToggle) {
        btnSoundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundIconEl.setAttribute('name', 'volume-medium-outline');
                soundLabelEl.textContent = 'Sonido';
            } else {
                soundIconEl.setAttribute('name', 'volume-mute-outline');
                soundLabelEl.textContent = 'Silencio';
            }
        });
    }

    // Questions Bank
    const QUIZ_QUESTIONS = [
        {
            materia: 'Matemáticas Aplicadas',
            enemyName: 'Bug de Matrices',
            question: '¿Cuál es la derivada de la función f(x) = 3x² + 5?',
            answers: ["f'(x) = 6x", "f'(x) = 3x + 5", "f'(x) = 6x²", "f'(x) = 15x"],
            correct: 0,
            explanation: '¡Regla de potencias: d/dx(3x²) = 6x y la constante desaparece!'
        },
        {
            materia: 'Estructuras de Datos',
            enemyName: 'Bucle Recursivo Infinito',
            question: '¿Qué estructura modela dependencias de prerrequisitos sin ciclos?',
            answers: ["Árbol Binario", "Grafo Dirigido Aclíclico (DAG)", "Pila LIFO", "Lista Enlazada"],
            correct: 1,
            explanation: '¡Los DAGs garantizan orden topológico sin generar bloqueos!'
        },
        {
            materia: 'Inteligencia Artificial',
            enemyName: 'Desvanecimiento de Gradiente',
            question: '¿Qué método ajusta pesos en redes neuronales retropropagando el error?',
            answers: ["Algoritmo de Dijkstra", "Búsqueda Binaria", "Retropropagación (Backprop)", "K-Means Clustering"],
            correct: 2,
            explanation: '¡La retropropagación calcula derivadas parciales mediante la regla de la cadena!'
        }
    ];

    let currentQIdx = 0;
    const ENEMY_MAX_HP = 1000;
    let enemyCurrentHp = ENEMY_MAX_HP;
    const TIMER_MAX = 10.0;
    let timerLeft = TIMER_MAX;
    let timerInterval = null;
    let isAnswering = false;

    function getMultiplier(timeRemaining) {
        if (timeRemaining >= 7.5) return { mult: 3.0, label: 'x3.0 (Máx Daño - Súper Crítico)', isCrit: true };
        if (timeRemaining >= 4.5) return { mult: 2.2, label: 'x2.2 (Daño Crítico Elevado)', isCrit: true };
        if (timeRemaining >= 2.0) return { mult: 1.5, label: 'x1.5 (Golpe Directo)', isCrit: false };
        return { mult: 1.0, label: 'x1.0 (Daño Base)', isCrit: false };
    }

    function updateEnemyHpBar() {
        if (!enemyHpFillEl || !enemyHpCurrentEl) return;
        const pct = Math.max(0, (enemyCurrentHp / ENEMY_MAX_HP) * 100);
        enemyHpFillEl.style.width = pct + '%';
        enemyHpCurrentEl.textContent = enemyCurrentHp;

        // Color transition based on health
        if (pct > 50) {
            enemyHpFillEl.style.backgroundColor = '#2a9d8f';
        } else if (pct > 25) {
            enemyHpFillEl.style.backgroundColor = '#f4a261';
        } else {
            enemyHpFillEl.style.backgroundColor = '#e76f51';
        }
    }

    function loadQuestion(idx) {
        if (!quizQuestionEl) return;

        clearInterval(timerInterval);
        isAnswering = false;

        const q = QUIZ_QUESTIONS[idx];
        if (quizMateriaEl) quizMateriaEl.textContent = q.materia;
        if (quizRoundEl) quizRoundEl.textContent = `Pregunta ${idx + 1} de ${QUIZ_QUESTIONS.length}`;
        if (enemyNameEl) enemyNameEl.textContent = q.enemyName;
        quizQuestionEl.textContent = q.question;

        // Reset answer buttons
        answerBtns.forEach((btn, i) => {
            if (btn && ansTexts[i]) {
                ansTexts[i].textContent = q.answers[i];
                btn.classList.remove('is-correct', 'is-wrong');
                btn.disabled = false;
            }
        });

        if (dialogueTextEl) {
            dialogueTextEl.textContent = `¡${q.enemyName} desafía a Aren! Responde lo más rápido posible para multiplicar el daño.`;
        }
        if (btnRestartBattle) btnRestartBattle.style.display = 'none';

        // Start countdown timer
        timerLeft = TIMER_MAX;
        if (timerBarEl) timerBarEl.style.width = '100%';

        timerInterval = setInterval(() => {
            timerLeft = Math.max(0, timerLeft - 0.05);

            if (timerDisplayEl) timerDisplayEl.textContent = timerLeft.toFixed(1) + 's';
            if (timerBarEl) timerBarEl.style.width = (timerLeft / TIMER_MAX) * 100 + '%';

            const mInfo = getMultiplier(timerLeft);
            if (multiplierDisplayEl) {
                multiplierDisplayEl.textContent = mInfo.label;
                multiplierDisplayEl.className = mInfo.isCrit ? 'highlight-gold' : '';
            }

            if (timerLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 50);
    }

    function handleTimeOut() {
        isAnswering = true;
        answerBtns.forEach(btn => { if (btn) btn.disabled = true; });

        if (dialogueTextEl) {
            dialogueTextEl.textContent = '¡Tiempo agotado! El oponente aprovechó el retraso para esquivar. Pasando al siguiente reto...';
        }

        setTimeout(() => {
            currentQIdx = (currentQIdx + 1) % QUIZ_QUESTIONS.length;
            loadQuestion(currentQIdx);
        }, 2200);
    }

    function triggerEnemyDamage(damage, isCrit, mult) {
        // Player attack lunge
        if (playerSpriteEl) {
            playerSpriteEl.classList.remove('attack-lunge');
            void playerSpriteEl.offsetWidth;
            playerSpriteEl.classList.add('attack-lunge');
        }

        setTimeout(() => {
            playSfx(isCrit);

            // Enemy hit shake
            if (enemySpriteEl) {
                enemySpriteEl.classList.remove('hit-shake');
                void enemySpriteEl.offsetWidth;
                enemySpriteEl.classList.add('hit-shake');
                setTimeout(() => enemySpriteEl.classList.remove('hit-shake'), 450);
            }

            // Floating damage numbers
            if (floatingDamageEl) {
                floatingDamageEl.innerHTML = `<span class="floating-damage-item">-${damage} PS ${isCrit ? '¡CRÍTICO!' : ''}</span>`;
                setTimeout(() => { floatingDamageEl.innerHTML = ''; }, 1100);
            }

            // Decrement HP
            enemyCurrentHp = Math.max(0, enemyCurrentHp - damage);
            updateEnemyHpBar();

            const curQ = QUIZ_QUESTIONS[currentQIdx];

            if (enemyCurrentHp <= 0) {
                if (enemySpriteEl) {
                    enemySpriteEl.style.opacity = '0.2';
                    enemySpriteEl.style.transform = 'scale(0.85)';
                }
                if (dialogueTextEl) {
                    dialogueTextEl.textContent = `¡VICTORIA TOTAL! Has vencido al ${curQ.enemyName} con velocidad récord. ¡+850 XP y retención cognitiva consolidada!`;
                }
                if (btnRestartBattle) btnRestartBattle.style.display = 'inline-flex';
            } else {
                if (dialogueTextEl) {
                    dialogueTextEl.textContent = `¡Impacto efectivo! Velocidad ${mult.mult}x causó ${damage} PS de daño. ${curQ.explanation}`;
                }
                setTimeout(() => {
                    currentQIdx = (currentQIdx + 1) % QUIZ_QUESTIONS.length;
                    loadQuestion(currentQIdx);
                }, 2400);
            }
        }, 220);
    }

    // Answer click handler
    answerBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            if (isAnswering) return;
            isAnswering = true;
            clearInterval(timerInterval);

            const chosenIdx = parseInt(btn.getAttribute('data-index'), 10);
            const curQ = QUIZ_QUESTIONS[currentQIdx];

            answerBtns.forEach(b => { if (b) b.disabled = true; });

            if (chosenIdx === curQ.correct) {
                btn.classList.add('is-correct');
                const mInfo = getMultiplier(timerLeft);
                const damage = Math.round(180 * mInfo.mult + timerLeft * 25);
                triggerEnemyDamage(damage, mInfo.isCrit, mInfo);
            } else {
                btn.classList.add('is-wrong');
                if (answerBtns[curQ.correct]) {
                    answerBtns[curQ.correct].classList.add('is-correct');
                }
                if (dialogueTextEl) {
                    dialogueTextEl.textContent = `¡Respuesta incorrecta! El bug resiste. ${curQ.explanation}`;
                }
                setTimeout(() => {
                    currentQIdx = (currentQIdx + 1) % QUIZ_QUESTIONS.length;
                    loadQuestion(currentQIdx);
                }, 2600);
            }
        });
    });

    // Restart battle
    if (btnRestartBattle) {
        btnRestartBattle.addEventListener('click', () => {
            enemyCurrentHp = ENEMY_MAX_HP;
            updateEnemyHpBar();
            if (enemySpriteEl) {
                enemySpriteEl.style.opacity = '1';
                enemySpriteEl.style.transform = 'scale(1)';
            }
            currentQIdx = 0;
            loadQuestion(0);
        });
    }

    // Start quiz when tab-gamificacion is loaded/clicked
    const tabGamificacionBtn = document.querySelector('.demo-tab-btn[data-tab="tab-gamificacion"]');
    if (tabGamificacionBtn) {
        tabGamificacionBtn.addEventListener('click', () => {
            setTimeout(() => {
                if (enemyCurrentHp > 0 && !timerInterval) {
                    loadQuestion(currentQIdx);
                }
            }, 100);
        });
    }

    // Initialize first question
    loadQuestion(0);
});


