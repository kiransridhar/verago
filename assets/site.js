// Verago learning site: 🔊 buttons play the word's clip (one at a time), and
// "Hide meanings" blurs the English column for self-testing; tap a blurred
// meaning to reveal it.
(function () {
  var current = null;
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.say');
    if (btn) {
      if (current) { current.audio.pause(); current.btn.classList.remove('playing'); }
      var audio = new Audio(btn.getAttribute('data-src'));
      current = { audio: audio, btn: btn };
      btn.classList.add('playing');
      audio.addEventListener('ended', function () { btn.classList.remove('playing'); });
      audio.play().catch(function () { btn.classList.remove('playing'); });
      return;
    }
    var toggle = e.target.closest('.toggle-meanings');
    if (toggle) {
      var on = document.body.classList.toggle('hide-meanings');
      document.querySelectorAll('.toggle-meanings').forEach(function (t) {
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
        t.textContent = on ? 'Show meanings' : 'Hide meanings to test yourself';
      });
      document.querySelectorAll('.mean.shown').forEach(function (m) { m.classList.remove('shown'); });
      return;
    }
    var mean = e.target.closest('.hide-meanings .mean');
    if (mean) mean.classList.add('shown');
  });
})();
