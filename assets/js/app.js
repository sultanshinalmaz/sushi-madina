/* ============================================================
   SUSHI SAUDI · логика сайта
   Ванильный JS, без сборки и зависимостей.
   ============================================================ */

(function () {
  'use strict';

  var D = window.SUSHI_DATA;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- SVG-иконки ---------- */
  var ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.6l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zm-2.4 4.1c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.52s1.08 2.92 1.23 3.12c.15.2 2.1 3.2 5.1 4.37.71.3 1.27.49 1.7.63.71.23 1.36.19 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.57z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.6l-3.02 14.25c-.23 1.01-.83 1.26-1.68.78l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73 8.6-7.77c.37-.33-.08-.52-.58-.19L7.13 12.6 2.55 11.17c-1-.31-1.01-1 .21-1.48L20.66 3.1c.83-.3 1.55.2 1.28 1.5z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.6"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6M11 8.4v5.2M8.4 11h5.2"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    man: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3.4"/><path d="M4.8 20.5c0-3.6 3.2-6.2 7.2-6.2s7.2 2.6 7.2 6.2"/></svg>',
    woman: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2c-3 0-5 2.2-5 5.2 0 2.2.5 4 1.2 5.6h7.6c.7-1.6 1.2-3.4 1.2-5.6 0-3-2-5.2-5-5.2z"/><path d="M9.4 14c-.4 3 .3 5.2 2.6 6.8 2.3-1.6 3-3.8 2.6-6.8"/></svg>',
    bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7.5" width="16" height="12" rx="3.4"/><path d="M12 7.5V4M9.4 13h.02M14.6 13h.02M9 16.6h6"/><circle cx="12" cy="3" r="1.2"/></svg>',
    mochi: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="34" cy="60" rx="20" ry="17"/><ellipse cx="66" cy="60" rx="20" ry="17"/><ellipse cx="50" cy="38" rx="20" ry="17"/><path d="M44 34c2-2 6-3 9-1M28 57c2-2 5-3 8-2M60 57c2-2 5-3 8-2" stroke-linecap="round"/></svg>',
    drink: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M34 22h32l-4 56a6 6 0 0 1-6 5.4H44a6 6 0 0 1-6-5.4z"/><path d="M35.4 40h29.2" stroke-linecap="round"/><path d="M40 14h20v8H40z"/></svg>',
    fresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c4.4 0 8-3.4 8-7.7 0-3-1.9-5.6-4-7.6C13.7 3.4 12 2 12 2s-1.7 1.4-4 3.7c-2.1 2-4 4.6-4 7.6C4 17.6 7.6 21 12 21z"/><path d="M12 17.5c1.9 0 3.4-1.5 3.4-3.3"/></svg>',
    halal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.6l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 8.9l6-.8z"/></svg>',
    delivery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16.5V7.2A1.2 1.2 0 0 1 4.2 6h9.3v10.5"/><path d="M13.5 9.5h3.9l3.1 3.4v3.6h-2"/><circle cx="7.4" cy="17.6" r="1.9"/><circle cx="16.6" cy="17.6" r="1.9"/><path d="M9.3 17.6h5.4"/></svg>',
    portion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 13.5h17a8.5 8.5 0 0 1-17 0z"/><path d="M2.5 18h19"/><path d="M8 9.4c0-1.6 2-1.8 2-3.4M13 9.4c0-1.6 2-1.8 2-3.4"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5-4.8-4.6 6.6-.9z"/></svg>'
  };

  /* ---------- Блокировка прокрутки ----------
     Страницу скроллит документ, поэтому overflow: hidden на body не
     помогает: фиксируем body и запоминаем позицию, чтобы вернуть её.  */
  var scrollMemo = 0;

  function lockScroll(on) {
    var body = document.body;
    if (on) {
      if (body.classList.contains('is-locked')) return;
      scrollMemo = window.scrollY || document.documentElement.scrollTop || 0;
      body.style.top = -scrollMemo + 'px';
      document.documentElement.classList.add('is-locked');
      body.classList.add('is-locked');
    } else {
      var wasLocked = body.classList.contains('is-locked');
      document.documentElement.classList.remove('is-locked');
      body.classList.remove('is-locked');
      body.style.top = '';           // снимаем всегда, иначе страницу «подбросит»
      if (wasLocked) window.scrollTo(0, scrollMemo);
    }
  }

  /* ============================================================
     1. Заставка: энсо + сёдзи
     ============================================================ */
  function initIntro() {
    var intro = $('#intro');
    if (!intro) return;

    // Инлайн-скрипт в <head> мог уже снять заставку (повторный визит в этой
    // вкладке или включён режим «меньше движения») — тогда делать нечего.
    if (intro.dataset.skipped === '1') {
      lockScroll(false);
      return;
    }

    var closed = false;
    function close() {
      if (closed) return;
      closed = true;
      intro.classList.add('is-open');
      lockScroll(false);
      // ждём, пока разъедутся «сёдзи», и только потом убираем слой
      setTimeout(function () {
        intro.classList.add('is-hidden');
        intro.style.display = 'none';
      }, 1100);
    }

    $('.intro__skip', intro).addEventListener('click', close);
    intro.addEventListener('click', function (e) { if (e.target === intro) close(); });

    // Отсчёт начинаем СТРОГО с первого нарисованного кадра заставки (его
    // отмечает инлайн-скрипт в разметке). Если вкладку открыли в фоне,
    // кадра ещё не было — ждём события, а не закрываем заставку по таймеру:
    // иначе человек вернётся к экрану, когда всё уже закончилось.
    function run() {
      var startedAt = window.__introStart || performance.now();

      // в спокойном режиме анимации короче — держать экран дольше незачем
      var MIN_SHOW = reduced ? 2200 : 3600;
      var HARD_CAP = 6500;  // потолок: не держим человека, даже если что-то грузится

      // кунжут разлетается от круга (на узких экранах — меньше частиц)
      if (!reduced) {
        var stage = $('.intro__stage', intro);
        var total = window.innerWidth < 620 ? 12 : 18;
        var passed = (performance.now() - startedAt) / 1000;
        var base = Math.max(0, 1.25 - passed);
        for (var i = 0; i < total; i++) {
          var dot = document.createElement('i');
          dot.className = 'sesame';
          var ang = (Math.PI * 2 / total) * i + Math.random() * 0.4;
          var dist = (window.innerWidth < 620 ? 90 : 130) + Math.random() * 140;
          dot.style.left = '50%';
          dot.style.top = '34%';
          dot.style.animation = 'sesameFly .9s cubic-bezier(.2,.7,.3,1) ' + (base + Math.random() * 0.25) + 's forwards';
          dot.style.setProperty('--tx', Math.cos(ang) * dist + 'px');
          dot.style.setProperty('--ty', Math.sin(ang) * dist + 'px');
          dot.style.setProperty('--rot', (Math.random() * 360) + 'deg');
          stage.appendChild(dot);
        }
        var style = document.createElement('style');
        style.textContent = '@keyframes sesameFly{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}25%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) rotate(var(--rot)) scale(1)}}';
        document.head.appendChild(style);
      }

      // Закрываем по позднейшему из двух событий: доигравшая анимация и
      // загрузка страницы. HARD_CAP страхует от «вечной» заставки на слабой сети.
      var waitMin = new Promise(function (res) {
        setTimeout(res, Math.max(0, MIN_SHOW - (performance.now() - startedAt)));
      });
      var waitLoad = new Promise(function (res) {
        if (document.readyState === 'complete') return res();
        window.addEventListener('load', res, { once: true });
      });
      var cap = new Promise(function (res) { setTimeout(res, HARD_CAP); });

      Promise.race([Promise.all([waitMin, waitLoad]), cap]).then(close);
    }

    if (window.__introStart) run();
    else window.addEventListener('intro-start', run, { once: true });
  }

  /* ============================================================
     2. Шапка, навигация, скролл
     ============================================================ */
  function initHeader() {
    var header = $('.header');
    var nav = $('.nav');
    var burger = $('.burger');

    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      lockScroll(open);
    });

    $$('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        lockScroll(false);
      });
    });
  }

  /* ============================================================
     3. Появление блоков и счётчики
     ============================================================ */
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px' });
    items.forEach(function (el) { io.observe(el); });
  }

  function initCounters() {
    var nums = $$('[data-count]');
    if (!nums.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var target = parseInt(el.dataset.count, 10);
        var suffix = el.dataset.suffix || '';
        // если вкладка в фоне, кадры не идут — показываем итог сразу,
        // иначе число может застрять на половине
        if (document.hidden || reduced) { el.textContent = target + suffix; return; }
        var start = performance.now();
        var dur = 1400;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (p < 1 ? Math.round(target * eased) : target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ============================================================
     4. Параллакс в hero
     ============================================================ */
  function initParallax() {
    if (reduced) return;
    var plate = $('.plate');
    var glow = $('.hero__glow');
    if (!plate) return;
    var raf = null;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          plate.style.transform = 'translateY(' + (y * 0.09) + 'px)';
          if (glow) glow.style.transform = 'translateY(' + (y * 0.16) + 'px)';
        }
        raf = null;
      });
    }, { passive: true });

    // лёгкий наклон за курсором
    var hero = $('.hero');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var dx = (e.clientX - r.width / 2) / r.width;
      var dy = (e.clientY - r.height / 2) / r.height;
      plate.style.rotate = (dx * 3) + 'deg';
      plate.style.translate = (dx * -10) + 'px ' + (dy * -10) + 'px';
    });
  }

  /* ============================================================
     5. Меню + фильтры
     ============================================================ */
  function priceHtml(v) {
    return v + '<span> ' + D.contacts.currency + '</span>';
  }

  function dishCard(item) {
    var media = item.img
      ? '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy">' +
        '<span class="dish__zoom">' + ICONS.zoom + '</span>'
      : '<div class="dish__placeholder">' + (ICONS[item.icon] || ICONS.mochi) + '</div>';

    return '' +
      '<article class="dish reveal" data-cat="' + item.cat + '" data-id="' + item.id + '">' +
        '<div class="dish__media"' + (item.img ? ' data-zoom="' + item.id + '" title="Нажмите, чтобы рассмотреть"' : '') + '>' + media +
          (item.tag ? '<span class="dish__tag">' + item.tag + '</span>' : '') +
        '</div>' +
        '<div class="dish__body">' +
          '<h3 class="dish__name">' + item.name +
            (item.nameRu ? '<small>' + item.nameRu + '</small>' : '') +
          '</h3>' +
          '<p class="dish__desc">' + item.desc + '</p>' +
          '<div class="dish__foot">' +
            '<div class="dish__price">' + priceHtml(item.price) + '</div>' +
            '<button class="add-btn" data-add="' + item.id + '">' + ICONS.plus + 'В корзину</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function initMenu() {
    var tabsBox = $('#menuTabs');
    var grid = $('#menuGrid');
    if (!grid) return;

    var cats = [{ id: 'all', name: 'Всё меню' }].concat(D.categories);
    tabsBox.innerHTML = cats.map(function (c, i) {
      return '<button class="tab' + (i === 0 ? ' is-active' : '') + '" data-cat="' + c.id + '">' + c.name + '</button>';
    }).join('');

    grid.innerHTML = D.menu.map(dishCard).join('');

    tabsBox.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab');
      if (!btn) return;
      $$('.tab', tabsBox).forEach(function (t) { t.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var cat = btn.dataset.cat;
      $$('.dish', grid).forEach(function (card) {
        var show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.classList.remove('is-in');
          requestAnimationFrame(function () { card.classList.add('is-in'); });
        }
      });
    });
  }

  /* ============================================================
     6. Корзина
     ============================================================ */
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem('sushi-cart') || '{}'); } catch (e) { cart = {}; }

  function saveCart() {
    try { localStorage.setItem('sushi-cart', JSON.stringify(cart)); } catch (e) {}
  }

  function cartCount() {
    return Object.keys(cart).reduce(function (s, k) { return s + cart[k]; }, 0);
  }

  function cartTotal() {
    return Object.keys(cart).reduce(function (s, k) {
      var item = D.menu.filter(function (m) { return m.id === k; })[0];
      return item ? s + item.price * cart[k] : s;
    }, 0);
  }

  function renderCart() {
    var list = $('#cartList');
    var count = cartCount();

    $$('.cart-btn__count').forEach(function (el) { el.textContent = count; });

    // ссылки «Брату» и «Сестре» всегда несут актуальный состав заказа
    $$('[data-order]').forEach(function (a) {
      a.href = waLink(a.dataset.order, count ? orderText() : null);
    });

    // сбрасываем подтверждение очистки, чтобы вопрос не «залипал»
    var clearBtn = $('[data-clear-cart]');
    if (clearBtn) {
      clearTimeout(confirmTimer);
      clearBtn.classList.remove('is-confirming');
      $('[data-clear-label]', clearBtn).textContent = 'Очистить корзину';
    }
    $('#cartTotal').innerHTML = cartTotal() + ' <span style="font-size:.55em">' + D.contacts.currency + '</span>';
    $('#cartFoot').style.display = count ? '' : 'none';

    if (!count) {
      list.innerHTML = '<div class="cart__empty">' + ICONS.cart +
        '<div><b>Корзина пуста</b><br><span>Загляните в меню — там ' + D.menu.length + ' позиций</span></div>' +
        '<button class="btn btn--gold" data-go-menu type="button">Открыть меню</button></div>';
      return;
    }

    list.innerHTML = Object.keys(cart).map(function (id) {
      var item = D.menu.filter(function (m) { return m.id === id; })[0];
      if (!item) return '';
      var pic = item.img
        ? '<img class="cart-item__img" src="' + item.img + '" alt="">'
        : '<div class="cart-item__ph">' + (ICONS[item.icon] || ICONS.mochi) + '</div>';
      return '<div class="cart-item">' + pic +
        '<div><b>' + item.name + '</b><span>' + item.price + ' ' + D.contacts.currency + ' × ' + cart[id] + ' = ' + (item.price * cart[id]) + ' ' + D.contacts.currency + '</span></div>' +
        '<div class="qty">' +
          '<button data-dec="' + id + '" aria-label="Убрать одну порцию">−</button>' +
          '<i>' + cart[id] + '</i>' +
          '<button data-inc="' + id + '" aria-label="Добавить порцию">+</button>' +
        '</div></div>';
    }).join('');
  }

  function flyToCart(fromEl) {
    if (reduced) return;
    var target = $('.cart-btn');
    if (!target || !fromEl) return;
    var a = fromEl.getBoundingClientRect();
    var b = target.getBoundingClientRect();
    var dot = document.createElement('div');
    dot.className = 'fly-dot';
    dot.style.left = (a.left + a.width / 2) + 'px';
    dot.style.top = (a.top + a.height / 2) + 'px';
    document.body.appendChild(dot);
    var dx = (b.left + b.width / 2) - (a.left + a.width / 2);
    var dy = (b.top + b.height / 2) - (a.top + a.height / 2);
    dot.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: 'translate(' + dx * 0.5 + 'px,' + (dy * 0.5 - 90) + 'px) scale(1.5)', opacity: 1, offset: 0.55 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.2)', opacity: 0 }
    ], { duration: 750, easing: 'cubic-bezier(.4,.1,.3,1)' }).onfinish = function () { dot.remove(); };
    target.classList.add('is-bump');
    setTimeout(function () { target.classList.remove('is-bump'); }, 460);
  }

  function addToCart(id, sourceEl) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    flyToCart(sourceEl);
  }

  function openCart(open) {
    $('#cart').classList.toggle('is-open', open);
    $('#overlay').classList.toggle('is-open', open);
    lockScroll(open);
  }

  function orderText() {
    var lines = ['Ассаляму алейкум! Хочу заказать в Sushi Saudi:', ''];
    Object.keys(cart).forEach(function (id) {
      var item = D.menu.filter(function (m) { return m.id === id; })[0];
      if (item) lines.push('• ' + item.name + ' × ' + cart[id] + ' — ' + (item.price * cart[id]) + ' ' + D.contacts.currency);
    });
    lines.push('', 'Итого: ' + cartTotal() + ' ' + D.contacts.currency, '', 'Заказ собран на сайте.');
    return lines.join('\n');
  }

  function waLink(who, text) {
    var num = who === 'sisters' ? D.contacts.sisters.wa : D.contacts.brothers.wa;
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text || 'Ассаляму алейкум! Хочу сделать заказ 🍣');
  }

  var confirmTimer = null;

  function initCart() {
    renderCart();

    document.addEventListener('click', function (e) {
      var add = e.target.closest('[data-add]');
      if (add) {
        addToCart(add.dataset.add, add);
        add.classList.add('is-added');
        add.innerHTML = ICONS.check + 'Добавлено';
        setTimeout(function () {
          add.classList.remove('is-added');
          add.innerHTML = ICONS.plus + 'В корзину';
        }, 1200);
        return;
      }
      var inc = e.target.closest('[data-inc]');
      if (inc) { cart[inc.dataset.inc]++; saveCart(); renderCart(); return; }

      var dec = e.target.closest('[data-dec]');
      if (dec) {
        var id = dec.dataset.dec;
        cart[id]--;
        if (cart[id] <= 0) delete cart[id];
        saveCart(); renderCart();
        return;
      }
      // очистка корзины: первый клик спрашивает, второй — очищает
      var clear = e.target.closest('[data-clear-cart]');
      if (clear) {
        var label = $('[data-clear-label]', clear);
        if (clear.classList.contains('is-confirming')) {
          cart = {};
          saveCart();
          renderCart();
          clearTimeout(confirmTimer);
        } else {
          clear.classList.add('is-confirming');
          label.textContent = 'Точно очистить?';
          confirmTimer = setTimeout(function () {
            clear.classList.remove('is-confirming');
            label.textContent = 'Очистить корзину';
          }, 3500);
        }
        return;
      }

      if (e.target.closest('[data-go-menu]')) {
        openCart(false);
        var menu = $('#menu');
        // behavior не задаём: плавность берётся из scroll-behavior в CSS,
        // а там, где анимации отключены, прокрутка сработает сразу
        if (menu) setTimeout(function () { menu.scrollIntoView({ block: 'start' }); }, 260);
        return;
      }
      if (e.target.closest('[data-open-cart]')) { openCart(true); return; }
      if (e.target.closest('[data-close-cart]') || e.target.id === 'overlay') { openCart(false); return; }

      var order = e.target.closest('[data-order]');
      if (order) {
        // href уже проставлен в renderCart — просто уходим следом за ссылкой
        setTimeout(function () { openCart(false); }, 150);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { openCart(false); closeLightbox(); }
    });
  }

  /* ============================================================
     7. Промо, преимущества, отзывы, галерея, FAQ
     ============================================================ */
  function initPromos() {
    var box = $('#promos');
    if (!box) return;
    box.innerHTML = D.promos.map(function (p, i) {
      return '<article class="promo reveal reveal-d' + (i + 1) + '">' +
        '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy">' +
        '<span class="promo__price">' + p.price + ' ' + D.contacts.currency + '</span>' +
        '<div class="promo__body">' +
          '<span class="promo__title">' + p.title + '</span>' +
          '<span class="promo__text">' + p.text + '</span>' +
        '</div></article>';
    }).join('');
  }

  function initFeatures() {
    var box = $('#features');
    if (!box) return;
    box.innerHTML = D.features.map(function (f, i) {
      return '<article class="feature reveal reveal-d' + (i + 1) + '">' +
        '<div class="feature__icon">' + (ICONS[f.icon] || ICONS.star) + '</div>' +
        '<h3>' + f.title + '</h3><p>' + f.text + '</p></article>';
    }).join('');
  }

  function initReviews() {
    var grid = $('#reviewsGrid');
    if (!grid) return;

    grid.innerHTML = D.reviews.map(function (r) {
      return '<article class="review' + (r.side === 'sisters' ? ' review--sisters' : '') + '">' +
        '<p class="review__text">' + r.text + '</p>' +
        '<div class="review__foot">' +
          '<div class="review__avatar">' + r.author.charAt(0) + '</div>' +
          '<div><div class="review__author">' + r.author + '</div>' +
          '<div class="review__meta">' + ICONS.wa + 'отзыв из WhatsApp</div></div>' +
        '</div></article>';
    }).join('');

    // Показываем первые несколько отзывов, остальные — по кнопке:
    // так секция не растягивает страницу, особенно на телефоне.
    var more = $('#reviewsMore');
    if (more) {
      var limit = window.matchMedia('(max-width: 700px)').matches ? 4 : 6;
      var cards = $$('.review', grid);
      var hidden = cards.slice(limit);

      if (hidden.length) {
        var collapse = function (on) {
          hidden.forEach(function (el) { el.classList.toggle('is-hidden', on); });
          more.innerHTML = '<button class="btn btn--ghost" type="button">' +
            (on ? 'Показать все отзывы · ' + cards.length : 'Свернуть') + '</button>';
        };
        collapse(true);
        more.addEventListener('click', function (e) {
          if (!e.target.closest('button')) return;
          var isCollapsed = hidden[0].classList.contains('is-hidden');
          collapse(!isCollapsed);
          if (!isCollapsed) $('#reviews').scrollIntoView({ block: 'start' });
        });
      }
    }

    var stats = $('#stats');
    if (stats) {
      stats.innerHTML = D.stats.map(function (s, i) {
        return '<div class="stat reveal reveal-d' + (i + 1) + '">' +
          '<b data-count="' + s.value + '" data-suffix="' + s.suffix + '">0</b>' +
          '<span>' + s.label + '</span></div>';
      }).join('');
    }
  }

  /* ---------- Лайтбокс: работает и для галереи, и для фото блюд ---------- */
  var lightboxSet = [];
  var lightboxIndex = 0;

  function openLightbox(list, i) {
    if (list) lightboxSet = list;
    if (!lightboxSet.length) return;
    lightboxIndex = (i + lightboxSet.length) % lightboxSet.length;
    var item = lightboxSet[lightboxIndex];
    var img = $('#lightboxImg');
    img.src = item.img;
    img.alt = item.alt || '';
    $('#lightboxCaption').innerHTML = item.name
      ? '<b class="lightbox__name">' + item.name +
        (item.price ? ' <span class="lightbox__price">' + item.price + ' ' + D.contacts.currency + '</span>' : '') +
        '</b>' + (item.desc ? '<span class="lightbox__desc">' + item.desc + '</span>' : '')
      : (item.caption || '');
    $('#lightbox').classList.add('is-open');
    lockScroll(true);
  }

  function closeLightbox() {
    $('#lightbox').classList.remove('is-open');
    if (!$('#cart').classList.contains('is-open')) lockScroll(false);
  }

  // фото блюд — отдельный набор для листания внутри меню
  function menuPhotos() {
    return D.menu.filter(function (m) { return m.img; }).map(function (m) {
      return {
        img: m.img,
        alt: m.name,
        name: m.name + (m.nameRu ? ' · ' + m.nameRu : ''),
        price: m.price,
        desc: m.desc
      };
    });
  }

  function initGallery() {
    var box = $('#gallery');
    if (!box) return;
    box.innerHTML = D.gallery.map(function (g, i) {
      return '<figure class="gallery__item reveal" data-i="' + i + '">' +
        '<img src="' + g.img + '" alt="' + g.alt + '" loading="lazy">' +
        '<span class="gallery__zoom">' + ICONS.zoom + '</span></figure>';
    }).join('');

    box.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery__item');
      if (item) openLightbox(D.gallery, parseInt(item.dataset.i, 10));
    });

    // клик по фото блюда в меню — открыть крупно
    document.addEventListener('click', function (e) {
      var media = e.target.closest('[data-zoom]');
      if (!media) return;
      var photos = menuPhotos();
      var id = media.dataset.zoom;
      var idx = 0;
      D.menu.filter(function (m) { return m.img; }).forEach(function (m, i) {
        if (m.id === id) idx = i;
      });
      openLightbox(photos, idx);
    });

    $('#lightbox').addEventListener('click', function (e) {
      if (e.target.id === 'lightbox' || e.target.closest('[data-lb-close]')) return closeLightbox();
      if (e.target.closest('[data-lb-prev]')) return openLightbox(null, lightboxIndex - 1);
      if (e.target.closest('[data-lb-next]')) return openLightbox(null, lightboxIndex + 1);
    });

    document.addEventListener('keydown', function (e) {
      if (!$('#lightbox').classList.contains('is-open')) return;
      if (e.key === 'ArrowLeft') openLightbox(null, lightboxIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(null, lightboxIndex + 1);
    });
  }

  function initFaq() {
    var box = $('#faq');
    if (!box) return;
    box.innerHTML = D.faq.map(function (f) {
      return '<div class="faq__item reveal">' +
        '<button class="faq__q">' + f.q + ICONS.plus + '</button>' +
        '<div class="faq__a"><p>' + f.a + '</p></div></div>';
    }).join('');

    box.addEventListener('click', function (e) {
      var q = e.target.closest('.faq__q');
      if (!q) return;
      var item = q.parentElement;
      var body = $('.faq__a', item);
      var open = item.classList.toggle('is-open');
      body.style.maxHeight = open ? body.scrollHeight + 'px' : 0;
    });
  }

  function initZones() {
    var box = $('#zones');
    if (!box) return;
    box.innerHTML = D.delivery.zones.map(function (z, i) {
      return '<li class="zone reveal reveal-d' + (i + 1) + '">' +
        '<span class="zone__num">' + (i + 1) + '</span>' +
        '<div><b>' + z.name + '</b><p>' + z.text + '</p></div></li>';
    }).join('');
  }

  /* ============================================================
     8. Telegram-бот (заглушка) и плавающая кнопка
     ============================================================ */


  function initFab() {
    var fab = $('#fab');
    if (!fab) return;
    $('#fabToggle').addEventListener('click', function () { fab.classList.toggle('is-open'); });
    document.addEventListener('click', function (e) {
      if (!fab.contains(e.target)) fab.classList.remove('is-open');
    });
  }

  /* ============================================================
     9. Подстановка контактов в разметку
     ============================================================ */
  function initLinks() {
    $$('[data-wa="brothers"]').forEach(function (a) { a.href = waLink('brothers'); });
    $$('[data-wa="sisters"]').forEach(function (a) { a.href = waLink('sisters'); });
    $$('[data-phone="brothers"]').forEach(function (el) { el.textContent = D.contacts.brothers.phone; });
    $$('[data-phone="sisters"]').forEach(function (el) { el.textContent = D.contacts.sisters.phone; });
    $$('[data-tg]').forEach(function (a) { a.href = D.contacts.telegram; });
    $$('[data-bot-link]').forEach(function (a) { a.href = D.contacts.bot; });
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var map = $('#map');
    if (map) map.src = D.delivery.mapEmbed;
    var mapLink = $('#mapLink');
    if (mapLink) mapLink.href = D.delivery.mapLink;
    var note = $('#deliveryNote');
    if (note) note.insertAdjacentHTML('beforeend', D.delivery.note);
  }

  /* ---------- Запуск ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initIntro();
    initHeader();
    initPromos();
    initFeatures();
    initMenu();
    initReviews();
    initGallery();
    initZones();
    initFaq();
    initLinks();
    initCart();
    initFab();
    initReveal();
    initCounters();
    initParallax();
  });
})();
