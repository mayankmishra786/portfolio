/* Stop the skeleton shimmer once an image finishes loading. Images are always
   visible; this only removes the placeholder animation behind them. */
(function () {
  function done(img) {
    var c = img.closest && img.closest(".cov, .shot-full, .s");
    if (c) c.classList.add("loaded");
  }
  function init() {
    var imgs = document.querySelectorAll(".card .cov img, .shot-full img, .shots img");
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth) { done(img); }
      else {
        img.addEventListener("load", function () { done(img); });
        img.addEventListener("error", function () { done(img); });
      }
    });
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
