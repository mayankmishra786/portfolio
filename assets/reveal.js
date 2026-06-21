/* Smooth fade-up reveal as sections enter the viewport.
   Above-the-fold elements are left untouched (no flash). Respects reduced motion. */
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var sel = [
    ".sec-head", ".work .card", ".bento .bx", ".about .row", ".clients .left",
    ".tcard", ".case-hero .meta-strip", ".case-section .twocol",
    ".case-section .swatches", ".case-section .typeblock", ".case-section .principles",
    ".deck-cta", ".prevnext", ".bonus .blk", ".shot-full"
  ].join(", ");

  var els = [].slice.call(document.querySelectorAll(sel));
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

  els.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) return; // already visible: skip
    el.classList.add("reveal");
    io.observe(el);
  });

  // gentle stagger for grouped siblings (e.g. cards in a row)
  [].slice.call(document.querySelectorAll(".reveal")).forEach(function (el) {
    var sibs = [].slice.call(el.parentNode.children).filter(function (c) {
      return c.classList.contains("reveal");
    });
    var i = sibs.indexOf(el);
    if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 65 + "ms";
  });
})();
