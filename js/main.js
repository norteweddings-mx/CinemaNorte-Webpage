// ===== Nav: mobile toggle + scroll background (home only) =====
(function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!nav) return;

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
        document.body.style.overflow = '';
      })
    );
  }

  if (nav.dataset.transparentHero === 'true') {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

// ===== FAQ accordion =====
(function initFaq() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const sign = item.querySelector('.sign');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      if (sign) sign.textContent = open ? '–' : '+';
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();

// ===== Testimonial carousel =====
(function initTestimonials() {
  const root = document.querySelector('[data-testimonials]');
  if (!root) return;
  const quoteEl = root.querySelector('[data-quote]');
  const nameEl = root.querySelector('[data-name]');
  const prevBtn = root.querySelector('[data-prev]');
  const nextBtn = root.querySelector('[data-next]');

  let items = [];
  try {
    items = JSON.parse(root.dataset.testimonials);
  } catch (e) {
    return;
  }
  if (!items.length) return;

  let index = 0;
  const render = () => {
    quoteEl.textContent = `“${items[index].quote}”`;
    nameEl.textContent = items[index].name;
  };
  prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    render();
  });
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length;
    render();
  });
  render();
})();

// ===== Contact form (Web3Forms) =====
(function initForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

  const errorEl = form.querySelector('.form-error');
  const submitBtn = form.querySelector('.form-submit');
  const thankYou = document.querySelector('#thank-you');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.classList.remove('is-visible');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error('request-failed');

      form.hidden = true;
      if (thankYou) thankYou.hidden = false;
    } catch (err) {
      errorEl.textContent = 'No pudimos enviar el formulario. Inténtalo de nuevo o escríbenos directo por WhatsApp.';
      errorEl.classList.add('is-visible');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitud';
    }
  });
})();
