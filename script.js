// ================================================================
// 1. PRELOADER
// ================================================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
    }, 800);
});

// ================================================================
// 2. TYPING EFFECT
// ================================================================
const text = "Soluções técnicas de qualidade, feitas por quem aprende com os melhores.";
const typewriter = document.querySelector('.typewriter');
let i = 0;
setTimeout(() => {
    function typeLoop() {
        if (i < text.length) {
            typewriter.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(typeLoop, 45);
        } else {
            setTimeout(() => {
                typewriter.style.borderRightColor = 'transparent';
            }, 3000);
        }
    }
    typeLoop();
}, 1200);

// ================================================================
// 3. PARTÍCULAS
// ================================================================
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const angle = Math.atan2(dy, dx);
                const force = (120 - dist) / 120 * 0.8;
                this.x -= Math.cos(angle) * force;
                this.y -= Math.sin(angle) * force;
            }
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 168, 56, ${this.opacity})`;
        ctx.fill();
    }
}

const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 10000));
for (let i = 0; i < count; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update();
        p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
document.addEventListener('mouseleave', () => { mouse.x = null;
    mouse.y = null; });

// ================================================================
// 4. DADOS DO PORTFÓLIO
// ================================================================
const projects = [
    { id: 1, title: 'Muro de Suporte em Alvenaria', course: 'Construção Civil',
        desc: 'Execução de muro de contenção com 15 metros de extensão, utilizando blocos de betão e impermeabilização.',
        results: 'Estrutura segura e durável, aprovada pela fiscalização.',
        img: 'https://placehold.co/600x400/1A3A5C/FFFFFF?text=Muro+de+Suporte' },
    { id: 2, title: 'Instalação Elétrica Residencial', course: 'Eletricidade',
        desc: 'Projeto e montagem de quadro elétrico, circuitos de iluminação e tomadas em moradia de 3 quartos.',
        results: 'Sistema eficiente e dentro das normas de segurança.',
        img: 'https://placehold.co/600x400/0A1628/FFFFFF?text=Instalação+Elétrica' },
    { id: 3, title: 'Manutenção de Ar Condicionado Split', course: 'Frio e Climatização',
        desc: 'Diagnóstico e reparação de sistema de ar condicionado split, com carga de gás e limpeza de serpentinas.',
        results: 'Equipamento a funcionar com rendimento ideal, redução de consumo em 15%.',
        img: 'https://placehold.co/600x400/6B7A8F/FFFFFF?text=Ar+Condicionado' },
    { id: 4, title: 'Rede de Computadores e Segurança', course: 'Informática',
        desc: 'Implementação de rede cabeada e Wi-Fi para empresa com 20 postos, incluindo firewall.',
        results: 'Rede estável e segura, com 99,9% de uptime.',
        img: 'https://placehold.co/600x400/1A3A5C/FFFFFF?text=Rede+Informática' },
    { id: 5, title: 'Design e Fabricação de Armário', course: 'Móveis',
        desc: 'Armário de cozinha planeado em MDF, com acabamento em laca e ferragens de alta qualidade.',
        results: 'Design moderno e funcional, cliente satisfeito.',
        img: 'https://placehold.co/600x400/E8A838/FFFFFF?text=Armário+Planeado' },
    { id: 6, title: 'Sistema de Gestão para Farmácia', course: 'GSI',
        desc: 'Desenvolvimento de sistema para controlo de stock e vendas para farmácia local.',
        results: 'Redução de 30% no tempo de atendimento.',
        img: 'https://placehold.co/600x400/0A1628/FFFFFF?text=Gestão+Farmácia' },
    { id: 7, title: 'Projeto Arquitetónico de Vivenda', course: 'DP',
        desc: 'Elaboração de plantas, cortes e fachadas em CAD para construção de vivenda T4.',
        results: 'Projeto aprovado pela comissão de urbanismo.',
        img: 'https://placehold.co/600x400/1A3A5C/FFFFFF?text=Projeto+Arquitetónico' },
    { id: 8, title: 'Pavimentação de Pátio', course: 'Construção Civil',
        desc: 'Colocação de pavimento intertravado em área de 200m².',
        results: 'Espaço valorizado e funcional.',
        img: 'https://placehold.co/600x400/6B7A8F/FFFFFF?text=Pavimentação' },
    { id: 9, title: 'Instalação de Câmara Frigorífica', course: 'Frio e Climatização',
        desc: 'Montagem de câmara frigorífica para conservação de alimentos, com sistema de controlo de temperatura.',
        results: 'Temperatura estável entre -18°C e -22°C, ideal para armazenamento.',
        img: 'https://placehold.co/600x400/0A1628/FFFFFF?text=Câmara+Frigorífica' },
    { id: 10, title: 'Software de Gestão Escolar', course: 'Informática',
        desc: 'Plataforma web para gestão de alunos, notas e horários.',
        results: 'Modernização da administração escolar.',
        img: 'https://placehold.co/600x400/E8A838/FFFFFF?text=Software+Escolar' },
    { id: 11, title: 'Mesa de Centro em Madeira Maciça', course: 'Móveis',
        desc: 'Mesa de centro com design escandinavo, em madeira de sucupira.',
        results: 'Peça de destaque na sala do cliente.',
        img: 'https://placehold.co/600x400/1A3A5C/FFFFFF?text=Mesa+Madeira' },
    { id: 12, title: 'Dashboard de Vendas Power BI', course: 'GSI',
        desc: 'Criação de dashboard interativo para análise de vendas.',
        results: 'Tomada de decisão mais ágil pela diretoria.',
        img: 'https://placehold.co/600x400/0A1628/FFFFFF?text=Dashboard+BI' }
];

// ================================================================
// 5. PORTFÓLIO
// ================================================================
const gridEl = document.getElementById('portfolioGrid');

function renderPortfolio(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.course === filter);
    gridEl.innerHTML = filtered.map(p => `
            <div class="portfolio-item" data-id="${p.id}">
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <div class="info">
                    <span class="course-tag">${p.course}</span>
                    <h4>${p.title}</h4>
                    <p>${p.desc.substring(0, 60)}…</p>
                </div>
            </div>
        `).join('');
    document.querySelectorAll('.portfolio-item').forEach(el => {
        el.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const proj = projects.find(p => p.id === id);
            if (proj) openLightbox(proj);
        });
    });
}
renderPortfolio();

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderPortfolio(this.dataset.filter);
    });
});

// ================================================================
// 6. LIGHTBOX
// ================================================================
const lbOverlay = document.getElementById('lightbox');
const lbTitle = document.getElementById('lb-title');
const lbCourse = document.getElementById('lb-course');
const lbImg = document.getElementById('lb-img');
const lbDesc = document.getElementById('lb-desc');
const lbResults = document.getElementById('lb-results');
let currentIdx = 0;

function openLightbox(proj) {
    currentIdx = projects.findIndex(p => p.id === proj.id);
    updateLb(projects[currentIdx]);
    lbOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const url = encodeURIComponent(window.location.href + '?projeto=' + proj.id);
    const title = encodeURIComponent(proj.title + ' - IPIKK');
    document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById('share-tw').href = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    document.getElementById('share-li').href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
}

function updateLb(proj) {
    lbTitle.textContent = proj.title;
    lbCourse.textContent = 'Curso: ' + proj.course;
    lbImg.src = proj.img;
    lbImg.alt = proj.title;
    lbDesc.textContent = proj.desc;
    lbResults.innerHTML = '<i class="fas fa-check-circle" style="color:var(--destaque);"></i> Resultados: ' + proj.results;
}

document.getElementById('lightbox-close').onclick = () => { lbOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; };
document.getElementById('lightbox-prev').onclick = (e) => { e.stopPropagation();
    currentIdx = (currentIdx - 1 + projects.length) % projects.length;
    updateLb(projects[currentIdx]); };
document.getElementById('lightbox-next').onclick = (e) => { e.stopPropagation();
    currentIdx = (currentIdx + 1) % projects.length;
    updateLb(projects[currentIdx]); };
lbOverlay.addEventListener('click', (e) => { if (e.target === lbOverlay) { lbOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; } });
document.addEventListener('keydown', (e) => {
    if (!lbOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') { lbOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; }
    if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
});

// ================================================================
// 7. CONTADORES
// ================================================================
let counted = false;

function animateCounters() {
    if (counted) return;
    const targets = [7, 320, 25];
    const els = [document.getElementById('stat1'), document.getElementById('stat2'), document.getElementById('stat3')];
    const dur = 2000;
    const start = performance.now();

    function tick(time) {
        const p = Math.min((time - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        els.forEach((el, i) => { el.textContent = Math.round(e * targets[i]) + (i === 0 ? '' : '+'); });
        if (p < 1) requestAnimationFrame(tick);
        else { els.forEach((el, i) => { el.textContent = targets[i] + (i === 0 ? '' : '+'); });
            counted = true; }
    }
    requestAnimationFrame(tick);
}

// ================================================================
// 8. HEADER / PROGRESS / SCROLL
// ================================================================
const header = document.getElementById('header');
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    header.classList.toggle('scrolled', y > 80);
    document.getElementById('scrollTop').classList.toggle('visible', y > 500);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (y / docHeight) * 100 + '%';
});
document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ================================================================
// 9. DARK MODE
// ================================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    themeIcon.className = 'fas fa-sun';
}
themeToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ================================================================
// 10. CURSOR
// ================================================================
const glow = document.getElementById('cursorGlow');
const dot = document.getElementById('cursorDot');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .portfolio-item, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => { glow.style.width = '400px';
        glow.style.height = '400px';
        glow.style.opacity = '0.8'; });
    el.addEventListener('mouseleave', () => { glow.style.width = '300px';
        glow.style.height = '300px';
        glow.style.opacity = '1'; });
});

// ================================================================
// 11. 3D TILT
// ================================================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
            `perspective(1000px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// ================================================================
// 12. FAQ
// ================================================================
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ================================================================
// 13. VIDEO TRIGGER
// ================================================================
document.getElementById('videoTrigger').addEventListener('click', function() {
    alert('🎬 Vídeo institucional do IPIKK. (Substituir por embed real)');
});

// ================================================================
// 14. FORMULÁRIOS (Floating Labels + Validação)
// ================================================================
// Máscara telefone
const tel = document.getElementById('telefone');
tel.addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 0 && !v.startsWith('244')) {
        if (v.length <= 9) this.value = '+244 ' + v.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (v.startsWith('244')) {
        v = v.substring(3);
        this.value = '+244 ' + v.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }
});

// Validação
document.querySelectorAll('#orcamento-form .float-group input, #orcamento-form .float-group select, #orcamento-form .float-group textarea')
    .forEach(f => {
        f.addEventListener('blur', function() {
            const p = this.closest('.float-group');
            const val = this.value.trim();
            if (this.hasAttribute('required') && !val) p.classList.add('invalid');
            else if (this.type === 'email' && val && !this.validity.valid) p.classList.add('invalid');
            else if (this.type === 'tel' && val && !this.validity.valid) p.classList.add('invalid');
            else if (this.tagName === 'SELECT' && this.value === '') p.classList.add('invalid');
            else p.classList.remove('invalid');
        });
        f.addEventListener('input', function() {
            const p = this.closest('.float-group');
            if (p.classList.contains('invalid') && this.value.trim()) p.classList.remove('invalid');
        });
    });

document.getElementById('orcamento-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    this.querySelectorAll('.float-group [required]').forEach(f => {
        const p = f.closest('.float-group');
        if (!f.value.trim() || (f.type === 'email' && !f.validity.valid) || (f.type === 'tel' && !f.validity
            .valid)) {
            p.classList.add('invalid');
            valid = false;
        } else p.classList.remove('invalid');
    });
    if (!valid) { this.querySelector('.float-group.invalid')?.scrollIntoView({ behavior: 'smooth' }); return; }
    console.log('📩 LEAD:', {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        servico: document.getElementById('servico').value,
        descricao: document.getElementById('descricao').value,
        localizacao: document.getElementById('localizacao').value,
        urgencia: document.getElementById('urgencia').value
    });
    const s = document.getElementById('orcamento-success');
    s.classList.add('show');
    setTimeout(() => { s.classList.remove('show');
        this.reset(); }, 5000);
});

document.getElementById('parceria-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('🏢 PARCERIA:', {
        empresa: document.getElementById('empresa-nome').value,
        email: document.getElementById('empresa-email').value,
        tipo: document.getElementById('empresa-tipo').value,
        mensagem: document.getElementById('empresa-msg').value
    });
    const s = document.getElementById('parceria-success');
    s.classList.add('show');
    setTimeout(() => { s.classList.remove('show');
        this.reset(); }, 5000);
});

// ================================================================
// 15. MOBILE HAMBURGER
// ================================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', function() {
    const open = navMenu.classList.toggle('open');
    this.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#nav-menu a').forEach(l => l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
}));

// ================================================================
// 16. COOKIE BANNER
// ================================================================
const cookieBanner = document.getElementById('cookie-banner');

// Verificar se já existe preferência
const cookiePref = localStorage.getItem('cookiesAccepted') || localStorage.getItem('cookiesDeclined');
if (cookiePref) {
    cookieBanner.classList.add('hide');
}

// Aceitar
document.getElementById('cookieAccept').addEventListener('click', function() {
    console.log('🍪 Cookies aceites pelo utilizador.');
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.add('hide');
});

// Recusar
document.getElementById('cookieDecline').addEventListener('click', function() {
    console.log('🍪 Cookies recusados pelo utilizador.');
    localStorage.setItem('cookiesDeclined', 'true');
    cookieBanner.classList.add('hide');
});

// ================================================================
// 17. FADE-UP + CONTADORES
// ================================================================
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('hero-stats') && !counted) animateCounters();
        }
    });
}, { threshold: 0.1 });
fadeEls.forEach(el => obs.observe(el));
setTimeout(() => {
    fadeEls.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
            if (el.classList.contains('hero-stats') && !counted) animateCounters();
        }
    });
}, 200);

// ================================================================
// 18. ACTIVE LINK
// ================================================================
const secs = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (window.pageYOffset >= s.offsetTop - 150) cur = s.id; });
    document.querySelectorAll('#nav-menu a[href]').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
});

// ================================================================
// 19. DYNAMIC YEAR
// ================================================================
document.getElementById('currentYear').textContent = new Date().getFullYear();

console.log('🚀 IPIKK — ULTRA PREMIUM (com ficheiros separados) carregado!');