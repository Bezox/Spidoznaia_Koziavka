document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a.nav-link');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean); // на случай ссылки на "#"

  // Плавный скролл по меню
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetID = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Подсветка активного пункта меню
  function highlightMenu() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach((section, i) => {
      if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        navLinks.forEach(link => link.classList.remove('active'));
        if(navLinks[i]) navLinks[i].classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightMenu);
  highlightMenu();

  // Появление секций при скролле
  const hiddenSections = document.querySelectorAll('.section-hidden');
  function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;

    hiddenSections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < triggerBottom) {
        section.classList.add('section-visible');
        section.classList.remove('section-hidden');
      }
    });
  }
  window.addEventListener('scroll', revealSections);
  revealSections();

  // Кнопка "Наверх"
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Фильтр товаров
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
