document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileToggleArenai = document.getElementById('mobile-toggle-arenai');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpened = navLinks.classList.contains('active');
            mobileToggle.innerHTML = isOpened ? '<ion-icon name="close-outline"></ion-icon>' : '<ion-icon name="menu-outline"></ion-icon>';
        });
    }

    if (mobileToggleArenai && navLinks) {
        mobileToggleArenai.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpened = navLinks.classList.contains('active');
            mobileToggleArenai.innerHTML = isOpened ? '<ion-icon name="close-outline"></ion-icon>' : '<ion-icon name="menu-outline"></ion-icon>';
        });
    }

    // Close menu when clicking links in mobile view
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) mobileToggle.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
                if (mobileToggleArenai) mobileToggleArenai.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
            }
        });
    });

    // 2. Active Section Highlighting on Scroll (Portfolio)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a.nav-link');

    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // 3. ArenAI Character Tab Switching Logic (If present on page)
    const charTabs = document.querySelectorAll('.char-tab');
    const charName = document.getElementById('char-name');
    const charDesc = document.getElementById('char-desc');
    const charImg = document.getElementById('char-img');
    const bgMesh = document.querySelector('.mesh-1');

    if (charTabs.length > 0 && charName && charDesc && charImg) {
        const charData = {
            capy: {
                name: "Capibara",
                desc: "El amigo de todos. Tu compañero leal en esta aventura de aprendizaje.",
                img: "img/capybara_sprite_normal_full.png",
                color: "rgba(144, 190, 171, 0.3)"
            },
            sloth: {
                name: "Perezoso",
                desc: "Lento pero seguro. Se toma su tiempo para analizar cada detalle.",
                img: "img/profile_picture_sloth_eyes_open.png",
                color: "rgba(141, 107, 86, 0.3)"
            }
        };

        charTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                charTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const charKey = tab.getAttribute('data-char');
                const data = charData[charKey];

                if (data) {
                    charImg.style.opacity = '0';
                    charImg.style.transform = 'scale(0.8)';

                    setTimeout(() => {
                        charName.textContent = data.name;
                        charDesc.textContent = data.desc;
                        charImg.src = data.img;

                        if (bgMesh) bgMesh.style.background = `radial-gradient(circle, ${data.color} 0%, transparent 70%)`;

                        charImg.style.opacity = '1';
                        charImg.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        });
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(el);
    });
});
