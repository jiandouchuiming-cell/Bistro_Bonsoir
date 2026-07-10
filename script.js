(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reducedMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
})();

(function () {
  // スクロール位置に応じてヘッダーナビの現在地をハイライト
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  if (!navLinks.length || !('IntersectionObserver' in window)) return;

  var sections = [];
  navLinks.forEach(function (link) {
    var section = document.querySelector(link.getAttribute('href'));
    if (section) sections.push({ link: link, section: section });
  });
  if (!sections.length) return;

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var current = sections.find(function (s) { return s.section === entry.target; });
      if (!current) return;
      sections.forEach(function (s) { s.link.classList.toggle('nav-current', s === current); });
    });
  }, { rootMargin: '-100px 0px -70% 0px', threshold: 0 });

  sections.forEach(function (s) { navObserver.observe(s.section); });
})();

(function () {
  // 準備中のリンク（href="#"の仮リンク）はクリックしてもページ最上部へ飛ばないようにする
  document.querySelectorAll('a[aria-disabled="true"]').forEach(function (link) {
    link.addEventListener('click', function (e) { e.preventDefault(); });
  });
})();

(function () {
  // ハンバーガーメニューの開閉状態をスクリーンリーダーへ伝える
  var toggle = document.getElementById('nav-toggle');
  var label = document.querySelector('.nav-toggle-btn');
  if (!toggle || !label) return;

  toggle.addEventListener('change', function () {
    label.setAttribute('aria-expanded', toggle.checked ? 'true' : 'false');
    label.setAttribute('aria-label', toggle.checked ? 'メニューを閉じる' : 'メニューを開く');
  });
})();
