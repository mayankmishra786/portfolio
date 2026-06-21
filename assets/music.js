/* Background theme music.
   - Autoplays only for first-ever visitors (localStorage), and only after a
     user gesture if the browser blocks immediate autoplay.
   - Keeps playing across page navigation within a visit (sessionStorage),
     resuming roughly where it left off.
   - Returning visitors start paused. A floating button toggles play/pause. */
(function () {
  var audio = document.getElementById("bgm");
  var btn = document.getElementById("bgm-toggle");
  if (!audio || !btn) return;
  audio.volume = 0.3;

  var V = "mm_visited", S = "mm_music", T = "mm_time";
  function icon(playing) { btn.classList.toggle("playing", playing); }

  function armGesture() {
    var h = function (e) {
      if (e && e.target && e.target.closest && e.target.closest("#bgm-toggle")) return;
      begin(sessionStorage.getItem(S) === "on");
      cleanup();
    };
    function cleanup() {
      document.removeEventListener("pointerdown", h);
      document.removeEventListener("keydown", h);
      window.removeEventListener("scroll", h);
    }
    document.addEventListener("pointerdown", h);
    document.addEventListener("keydown", h);
    window.addEventListener("scroll", h, { passive: true });
  }

  function begin(resume) {
    if (resume) {
      var t = parseFloat(sessionStorage.getItem(T) || "0");
      if (t > 0 && isFinite(t)) { try { audio.currentTime = t; } catch (e) {} }
    }
    var p = audio.play();
    if (p && p.then) {
      p.then(function () { icon(true); sessionStorage.setItem(S, "on"); })
       .catch(function () { icon(false); armGesture(); });
    } else { icon(true); sessionStorage.setItem(S, "on"); }
  }

  function stop() { audio.pause(); icon(false); sessionStorage.setItem(S, "off"); }

  btn.addEventListener("click", function () { audio.paused ? begin(false) : stop(); });
  audio.addEventListener("timeupdate", function () { sessionStorage.setItem(T, String(audio.currentTime)); });

  if (sessionStorage.getItem(S) === "on") { begin(true); }
  else if (!localStorage.getItem(V)) { localStorage.setItem(V, "1"); begin(false); }
  else { icon(false); }
})();
