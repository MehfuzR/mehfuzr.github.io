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

/* "See more experience" toggle */
const expandButton = document.querySelector('.exp-toggle');
const experienceMore = document.getElementById('experience-more');
const experienceWrap = document.querySelector('.exp-wrap');

if (expandButton && experienceMore && experienceWrap) {
  const arrow = expandButton.querySelector('span');

  // Replace the button's text while keeping the arrow icon intact
  function setLabel(text) {
    [...expandButton.childNodes]
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .forEach(node => node.remove());
    expandButton.insertBefore(document.createTextNode(text + ' '), arrow);
  }

  expandButton.addEventListener('click', () => {
    const isOpen = expandButton.getAttribute('aria-expanded') !== 'true';

    expandButton.setAttribute('aria-expanded', String(isOpen));
    setLabel(isOpen ? 'Show less experience' : 'See more experience');
    experienceMore.hidden = !isOpen;
    experienceWrap.classList.toggle('is-expanded', isOpen);

    // Opening: move to the first newly revealed role.
    // Closing: return to the top of the Experience section.
    const target = isOpen
      ? experienceMore.querySelector('.timeline-item')
      : document.getElementById('experience');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
