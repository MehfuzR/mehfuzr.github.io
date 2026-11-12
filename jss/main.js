document.getElementById('year').textContent = new Date().getFullYear();

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

const expandButton = document.querySelector('.exp-toggle');
const experienceMore = document.getElementById('experience-more');
const experienceWrap = document.querySelector('.exp-wrap');

expandButton.addEventListener('click', () => {
  const isOpen = expandButton.getAttribute('aria-expanded') !== 'true';
  expandButton.setAttribute('aria-expanded', String(isOpen));
  expandButton.firstChild.textContent = isOpen
    ? 'Show less experience '
    : 'See more experience ';
  experienceMore.hidden = !isOpen;
  experienceWrap.classList.toggle('is-expanded', isOpen);

  if (!isOpen) {
    document.getElementById('experience').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
