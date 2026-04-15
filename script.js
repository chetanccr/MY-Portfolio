/* ============================================
   CHETAN CHAUHAN PORTFOLIO — script.js
   ============================================ */

/* ===== 1. THEME MANAGER ===== */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cc_theme', theme);
    document.getElementById('lightBtn').classList.toggle('active', theme === 'light');
    document.getElementById('darkBtn').classList.toggle('active', theme === 'dark');
}

// Load saved theme (default: dark)
(function () {
    const saved = localStorage.getItem('cc_theme') || 'dark';
    setTheme(saved);
})();


/* ===== 2. WELCOME POPUP ===== */
// Show on page load only if not already seen in this session
window.addEventListener('DOMContentLoaded', function () {
    // Always show on fresh load
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
});

function closeWelcome() {
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
        overlay.classList.add('hide');
        setTimeout(() => overlay.style.display = 'none', 450);
    }
}

// Click on logo/brand also shows the welcome popup
document.addEventListener('DOMContentLoaded', function () {
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', function (e) {
            e.preventDefault();
            const overlay = document.getElementById('welcomeOverlay');
            if (overlay) {
                overlay.style.display = 'flex';
                setTimeout(() => overlay.classList.remove('hide'), 10);
            }
        });
    }
});


/* ===== 3. FLOATING PARTICLES ===== */
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left              = Math.random() * 100 + '%';
        p.style.width             =
        p.style.height            = (Math.random() * 4 + 2) + 'px';
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay    = (Math.random() * 10) + 's';
        container.appendChild(p);
    }
})();


/* ===== 4. SCROLL REVEAL ===== */
(function initReveal() {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, i * 80);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
})();


/* ===== 5. ACTIVE NAV LINK ===== */
(function initActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');
    const header    = document.getElementById('mainHeader');

    window.addEventListener('scroll', function () {
        // Add scrolled shadow to header
        if (header) header.classList.toggle('scrolled', window.scrollY > 20);

        // Highlight current section in nav
        let current = '';
        sections.forEach(function (s) {
            if (window.scrollY >= s.offsetTop - 110) current = s.id;
        });
        navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });
})();


/* ===== 6. SKILLS MODAL DATA ===== */
const skillData = {
    frontend: {
        icon : '💻',
        title: 'Frontend Mastery',
        sub  : 'Technologies I use to build beautiful, responsive web interfaces',
        tags : [
            { name: 'HTML5',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS3',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'Tailwind CSS', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
            { name: 'React' , img: 'https://www.qualium-systems.com/wp-content/uploads/2015/12/react-js-img.png'} ,

            ]
    },
    tech: {
        icon : '⚙️',
        title: 'Core Tech Stack',
        sub  : 'Tools and platforms that power my development workflow',
        tags : [
            { name: 'GitHub',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' }
        ]
    },
    cs: {
        icon : '🎓',
        title: 'CS Fundamentals',
        sub  : 'Core computer science concepts that form my problem-solving foundation',
        tags : [
            { name: 'C Language', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
            { name: 'C++',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
            { name: 'OOP',        img: 'https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png' },
            { name: 'DSA',        img: 'https://img.icons8.com/color/48/data-configuration.png' }
        ]
    }
};

function openModal(type) {
    const d = skillData[type];
    if (!d) return;

    document.getElementById('modalIcon').textContent  = d.icon;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalSub').textContent   = d.sub;

    document.getElementById('modalTags').innerHTML = d.tags.map(function (t) {
        return '<div class="skill-tag">' +
               '<img src="' + t.img + '" alt="' + t.name + '" onerror="this.style.display=\'none\'">' +
               t.name +
               '</div>';
    }).join('');

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalOnBg(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});


/* ===== 7. CONTACT FORM — Formspree real email delivery ===== */
/*
   HOW TO SET UP:
   1. Go to https://formspree.io and sign up (free)
   2. Create a new form and set the email to: chetanrajput2028@gmail.com
   3. Copy your form ID (e.g. xpwrjkgb) 
   4. In index.html replace the form action URL:
      action="https://formspree.io/f/YOUR_FORM_ID"
   5. Done — every submission goes straight to your Gmail!
*/
document.addEventListener('DOMContentLoaded', function () {
    const form   = document.getElementById('contactForm');
    const btn    = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        btn.textContent = 'Sending…';
        btn.disabled    = true;
        status.className = 'form-status';
        status.style.display = 'none';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method : 'POST',
                body   : formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.className    = 'form-status success';
                status.textContent  = '✅ Message sent! I\'ll get back to you soon.';
                form.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    status.className   = 'form-status error';
                    status.textContent = '❌ ' + data.errors.map(function (e) { return e.message; }).join(', ');
                } else {
                    throw new Error('Server error');
                }
            }
        } catch (err) {
            status.className   = 'form-status error';
            status.textContent = '❌ Something went wrong. Please email me directly at chetanrajput2028@gmail.com';
        }

        btn.textContent = 'Submit Inquiry';
        btn.disabled    = false;
    });
});