const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = [...document.querySelectorAll('main section[id]')];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + entry.target.id
        ? 'var(--accent)'
        : 'var(--muted)';
    });
  });
}, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

/* Intro reveal animation */
document.documentElement.classList.add('js-reveal');
const revealElements = [...document.querySelectorAll('#about .reveal')];

function replayReveal() {
  revealElements.forEach(el => el.classList.remove('play'));
  void document.body.offsetWidth;
  revealElements.forEach(el => el.classList.add('play'));
}

replayReveal();
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) replayReveal();
});

/* Close the phone menu after choosing a section */
const navCheck = document.getElementById('nav-check');
if (navCheck) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navCheck.checked = false;
    });
  });
}
