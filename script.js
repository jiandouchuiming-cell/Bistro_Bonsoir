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
