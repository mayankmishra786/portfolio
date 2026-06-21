/* Keep the URL hash from sticking, so the browser's Back button restores the
   exact scroll position you left (e.g. the Work card you clicked). */
(function () {
  if ("scrollRestoration" in history) history.scrollRestoration = "auto";

  // Smooth-scroll same-page anchors without writing a hash to the URL.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    var t = document.getElementById(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Arrived with a hash (e.g. index.html#work from a case page)? Scroll there
  // once, then clean the URL so Back doesn't re-jump to it.
  if (location.hash.length > 1) {
    var el = document.getElementById(location.hash.slice(1));
    if (el) {
      setTimeout(function () {
        el.scrollIntoView();
        history.replaceState(null, "", location.pathname + location.search);
      }, 0);
    }
  }
})();
