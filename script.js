document.addEventListener('DOMContentLoaded', () => {
    // 1. Character Tab Switching Logic
    const charTabs = document.querySelectorAll('.char-tab');
    const charName = document.getElementById('char-name');
    const charDesc = document.getElementById('char-desc');
    const charImg = document.getElementById('char-img');
    const bgMesh = document.querySelector('.mesh-1');

    const charData = {
        capy: {
            name: "Capibara",
            desc: "El amigo de todos. Tu compañero fiel en esta aventura de aprendizaje.",
            img: "../assets/capybara_sprite_normal_full.png",
            color: "rgba(144, 190, 171, 0.3)" // Greenish
        },
        sloth: {
            name: "Perezoso",
            desc: "Lento pero seguro. Se toma su tiempo para analizar cada detalle.",
            img: "../assets/profile_picture_sloth_eyes_open.png",
            color: "rgba(141, 107, 86, 0.3)" // Brownish
        }
    };

    charTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class
            charTabs.forEach(t => t.classList.remove('active'));
            // Add active class
            tab.classList.add('active');

            // Update content with fade effect
            const charKey = tab.getAttribute('data-char');
            const data = charData[charKey];

            charImg.style.opacity = '0';
            charImg.style.transform = 'scale(0.8)';

            setTimeout(() => {
                charName.textContent = data.name;
                charDesc.textContent = data.desc;
                charImg.src = data.img;

                // Change ambient color slightly
                if (bgMesh) bgMesh.style.background = `radial-gradient(circle, ${data.color} 0%, transparent 70%)`;

                charImg.style.opacity = '1';
                charImg.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // 2. Scroll Reveal Animations (Intersection Observer)
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

    // Fade up elements
    document.querySelectorAll('.animate-fade').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        observer.observe(el);
    });
});
