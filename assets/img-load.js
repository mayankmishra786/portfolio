/* Fade images in once they finish loading (paired with a CSS shimmer skeleton). */
(function () {
  function mark(img) { img.classList.add("is-loaded"); }
  function init() {
    var imgs = document.querySelectorAll(".card .cov img, .shot-full img, .shots img");
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth) { mark(img); }
      else {
        img.addEventListener("load", function () { mark(img); });
        img.addEventListener("error", function () { mark(img); });
      }
    });
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
