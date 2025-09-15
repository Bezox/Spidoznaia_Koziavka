document.addEventListener('DOMContentLoaded', () => {
  /* ------------------ Навигация ------------------ */
  const navLinks = document.querySelectorAll('nav a.nav-link');
  const sections = Array.from(navLinks)
    .map(link => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  // Плавный скролл
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

  // Подсветка активного пункта
  function highlightMenu() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach((section, i) => {
      if (
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[i]) navLinks[i].classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightMenu);
  highlightMenu();

  /* ------------------ Анимация секций ------------------ */
  const hiddenSections = document.querySelectorAll('.section-hidden');
  function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    hiddenSections.forEach(section => {
      if (section.getBoundingClientRect().top < triggerBottom) {
        section.classList.add('section-visible');
        section.classList.remove('section-hidden');
      }
    });
  }
  window.addEventListener('scroll', revealSections);
  revealSections();

  /* ------------------ Кнопка "Наверх" ------------------ */
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 400);
  });
  scrollBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ------------------ Фильтр товаров ------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        card.style.display =
          filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
      });
    });
  });

  /* ------------------ Корзина ------------------ */
  const cart = [];
  const cartIcon = document.getElementById('cart-icon');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // открыть/закрыть корзину
  cartIcon.addEventListener('click', () => cartModal.classList.add('active'));
  closeCart.addEventListener('click', () => cartModal.classList.remove('active'));

  // обновление корзины
  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, i) => {
      total += item.price;
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.title} - ${item.price} грн
        <button class="remove-btn">❌</button>
      `;
      li.querySelector('.remove-btn').addEventListener('click', () => {
        cart.splice(i, 1);
        updateCart();
      });
      cartItems.appendChild(li);
    });

    cartTotal.textContent = `Сума: ${total} грн`;
    cartCount.textContent = cart.length;
  }

  // добавить товар
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const title = productCard.querySelector('h3').innerText;
      const priceText = productCard
        .querySelector('.price')
        .innerText.replace(/[₴грн]/g, '')
        .trim();
      const price = parseFloat(priceText);

      cart.push({ title, price });
      updateCart();
    });
  });

  // оформление заказа
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Корзина пуста!');
      return;
    }
    alert('Ваше замовлення оформлено!');
    cart.length = 0; // очистить массив
    updateCart();
    cartModal.classList.remove('active');
  });
});
