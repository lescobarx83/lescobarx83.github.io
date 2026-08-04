/* ============================================================
   CV INTERACTIVO — Script
   Leonardo Josué Escobar Solís
   Scroll animations, skill bars, expandable details, PDF export
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll Reveal (IntersectionObserver) ───────────────
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for siblings
                const siblings = entry.target.parentElement.querySelectorAll('.reveal-on-scroll');
                let delay = 0;
                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) delay = i * 80;
                });
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Skill Bars Animation ──────────────────────────────
    const skillBars = document.querySelectorAll('.cv-skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                // Small delay for visual impact
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                    // Set print width CSS variable
                    bar.style.setProperty('--print-width', targetWidth + '%');
                    bar.classList.add('animated');
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.3
    });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ── Expandable Experience Details ─────────────────────
    const toggleButtons = document.querySelectorAll('.cv-toggle-details');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const detailsEl = document.getElementById(targetId);
            const textEl = btn.querySelector('.toggle-text');

            if (detailsEl) {
                const isExpanded = detailsEl.classList.toggle('expanded');
                btn.classList.toggle('active', isExpanded);
                textEl.textContent = isExpanded ? 'Ver menos' : 'Ver más';
            }
        });
    });

    // ── PDF Download ──────────────────────────────────────
    const downloadButtons = document.querySelectorAll('#btn-download-pdf, #btn-download-hero');

    downloadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Expand all details sections before printing
            document.querySelectorAll('.cv-timeline-details').forEach(detail => {
                detail.classList.add('expanded');
            });

            // Trigger browser print dialog (user can save as PDF)
            window.print();
        });
    });

    // ── Mobile Navigation Toggle ──────────────────────────
    const mobileToggle = document.getElementById('cv-mobile-toggle');
    const navLinks = document.getElementById('cv-nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            const icon = mobileToggle.querySelector('ion-icon');
            if (icon) {
                icon.setAttribute('name', isOpen ? 'close-outline' : 'menu-outline');
            }
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('.cv-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = mobileToggle.querySelector('ion-icon');
                if (icon) icon.setAttribute('name', 'menu-outline');
            });
        });
    }

    // ── Active Nav Link on Scroll ─────────────────────────
    const sections = document.querySelectorAll('.cv-section[id]');
    const navLinkElements = document.querySelectorAll('.cv-nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinkElements.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // ── Nav Background on Scroll ──────────────────────────
    const nav = document.getElementById('cv-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(7, 7, 13, 0.85)';
            nav.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        } else {
            nav.style.background = 'var(--cv-glass-bg)';
            nav.style.borderColor = 'var(--cv-glass-border)';
        }
    }, { passive: true });

});
