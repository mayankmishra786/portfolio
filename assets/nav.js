/* Nav behaviour: scroll-restore-friendly anchors + mobile hamburger menu. */
(function () {
  if ("scrollRestoration" in history) history.scrollRestoration = "auto";

  // Smooth-scroll same-page anchors without writing a hash to the URL,
  // so the browser's Back button restores the real scroll position.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    var t = document.getElementById(id);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
  });

  // Arrived with a hash? Scroll there once, then clean the URL.
  if (location.hash.length > 1) {
    var el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(function () {
      el.scrollIntoView();
      history.replaceState(null, "", location.pathname + location.search);
    }, 0);
  }

  // Mobile hamburger menu.
  var nav = document.querySelector(".nav");
  var tog = nav && nav.querySelector(".nav-toggle");
  if (nav && tog) {
    function close() { nav.classList.remove("open"); tog.setAttribute("aria-expanded", "false"); }
    tog.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle("open");
      tog.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-menu a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !nav.contains(e.target)) close();
    });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }
})();
