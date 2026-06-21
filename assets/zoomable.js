/* Lightweight click-to-zoom for case-study images (no deps). */
(function () {
  function openZoom(src, alt) {
    var o = document.createElement("div");
    o.className = "zoom-ov";
    var img = document.createElement("img");
    img.src = src; img.alt = alt || "";
    o.appendChild(img);
    function close() {
      o.classList.remove("on");
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
      setTimeout(function () { o.remove(); }, 250);
    }
    function esc(e) { if (e.key === "Escape") close(); }
    o.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    document.body.appendChild(o);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { o.classList.add("on"); });
  }
  document.addEventListener("click", function (e) {
    var img = e.target.closest && e.target.closest("img");
    if (img && img.closest(".shot-full, .shots")) {
      openZoom(img.getAttribute("src"), img.getAttribute("alt"));
    }
  });
})();
