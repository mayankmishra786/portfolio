/* Etheral Shadow — vanilla port of the React/framer-motion component.
   Animated SVG turbulence + displacement over a masked colour blob, recolored on-brand.
   Mounts into #etheral-hero. */
(function () {
  function mapRange(v, a, b, c, d) { if (a === b) return c; return c + ((v - a) / (b - a)) * (d - c); }

  function build(container) {
    // --- tuned, on-brand params (overridable via data-color / data-scale) ---
    var color = container.getAttribute("data-color") || "rgba(96,110,235,0.55)";  // indigo shadow
    var scale = parseFloat(container.getAttribute("data-scale")) || 72;
    var noiseOpacity = 0.5, noiseScale = 1.2;
    var MASK = "assets/etheral-mask.png";
    var NOISE = "assets/etheral-noise.png";
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var displacement = mapRange(scale, 1, 100, 20, 100);
    var bf1 = mapRange(scale, 0, 100, 0.001, 0.0005);
    var bf2 = mapRange(scale, 0, 100, 0.004, 0.002);
    var id = "etheral-" + Math.floor(Math.random() * 1e6);

    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.width = "100%";
    container.style.height = "100%";

    var inner = document.createElement("div");
    inner.style.cssText = "position:absolute;inset:-" + displacement + "px;filter:url(#" + id + ") blur(4px);";
    inner.innerHTML =
      '<svg style="position:absolute;width:0;height:0">' +
        '<defs><filter id="' + id + '">' +
          '<feTurbulence result="undulation" numOctaves="2" baseFrequency="' + bf1 + ',' + bf2 + '" seed="0" type="turbulence"/>' +
          '<feColorMatrix class="etheral-hue" in="undulation" type="hueRotate" values="180"/>' +
          '<feColorMatrix in="dist" result="circulation" type="matrix" values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="circulation" scale="' + displacement + '" result="dist"/>' +
          '<feDisplacementMap in="dist" in2="undulation" scale="' + displacement + '" result="output"/>' +
        '</filter></defs></svg>' +
      '<div style="background-color:' + color + ';' +
        '-webkit-mask-image:url(\'' + MASK + '\');mask-image:url(\'' + MASK + '\');' +
        '-webkit-mask-size:cover;mask-size:cover;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;' +
        '-webkit-mask-position:center;mask-position:center;width:100%;height:100%"></div>';
    container.appendChild(inner);

    if (noiseOpacity > 0) {
      var noise = document.createElement("div");
      noise.style.cssText = "position:absolute;inset:0;background-image:url('" + NOISE + "');" +
        "background-size:" + (noiseScale * 200) + "px;background-repeat:repeat;opacity:" + (noiseOpacity / 2) + ";";
      container.appendChild(noise);
    }

    if (reduce) return;
    var hue = inner.querySelector(".etheral-hue");
    var period = 9000;
    (function frame(now) {
      if (hue) hue.setAttribute("values", String((now % period) / period * 360));
      requestAnimationFrame(frame);
    })(0);
  }

  function boot() {
    var hosts = document.querySelectorAll(".etheral-host, #etheral-hero");
    for (var i = 0; i < hosts.length; i++) build(hosts[i]);
  }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
