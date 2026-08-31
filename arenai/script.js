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
                arenText.textContent = 'ACOPLANDO TARJETA EN RACK PRINCIPAL...';
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

        const children = section.querySelectorAll('.aren-feature-card, .showcase-card, .aren-arch-card, .mascot-showcase-item, .interactive-demo-tabs');
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
});

