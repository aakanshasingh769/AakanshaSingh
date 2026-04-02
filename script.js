/* ═══════════════════════════════════════════════
   AAKANSHA SINGH — Portfolio Scripts
   ═══════════════════════════════════════════════ */

/* ─── CUSTOM CURSOR ─── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
});

(function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorDot.style.transform  = `translate(${mx - 3}px, ${my - 3}px)`;
    cursorRing.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
    requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .service-card, .project-card, .review-card, .faq-item, .team-card, .partner-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

/* ─── NAVBAR SCROLL ─── */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── HAMBURGER MENU ─── */
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ─── COUNTER ANIMATION ─── */
function runCounter(el, target, suffix) {
    const duration = 1800;
    const startTime = performance.now();
    const isK = suffix.includes('K');

    function step(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (isK) {
            el.textContent = Math.floor(eased * target) + 'K+';
        } else {
            el.textContent = Math.floor(eased * target) + (suffix || '');
        }
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('[data-target]').forEach(el => {
                runCounter(el, +el.dataset.target, el.dataset.suffix || '');
            });
            counterObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats, #numbers').forEach(el => counterObs.observe(el));

/* ─── SKILL BAR ANIMATION ─── */
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });

const skillArea = document.getElementById('skillsArea');
if (skillArea) skillObs.observe(skillArea);

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.getElementById('navLinks').classList.remove('open');
    });
});

/* ─── FAQ ACCORDION ─── */
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});

/* ─── CONTACT FORM SUBMIT ─── */
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target;
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'var(--lime)';
    btn.style.color = 'var(--ink)';
    setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.style.color = '';
    }, 3000);
}
