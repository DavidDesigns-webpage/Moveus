(function () {
  var size = document.getElementById('size'),
      km = document.getElementById('km'),
      kmv = document.getElementById('kmv'),
      pack = document.getElementById('pack'),
      out = document.getElementById('out');

  // Placeholder pricing: edit these to match your real rates.
  var RATE = 18;   // rand per km
  var PACK = 0.35; // packing adds 35% of the base price

  function money(n) {
    n = Math.round(n / 50) * 50;
    return 'R' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function calc() {
    var base = +size.value, d = +km.value;
    var total = base + d * RATE + (pack.checked ? base * PACK : 0);
    kmv.textContent = d;
    out.textContent = money(total * 0.95) + ' to ' + money(total * 1.1);
  }

  [size, km, pack].forEach(function (el) {
    el.addEventListener('input', calc);
  });
  calc();

  // Copy the estimate into the contact form
  document.getElementById('book').addEventListener('click', function () {
    var s = size.options[size.selectedIndex].text;
    document.getElementById('m').value =
      'Move: ' + s + ', about ' + km.value + ' km' +
      (pack.checked ? ', with packing help' : '') +
      '. Estimate: ' + out.textContent + '.';
  });

  document.getElementById('yr').textContent = new Date().getFullYear();

  // Contact form: opens WhatsApp or email with the details filled in
  var form = document.getElementById('form'),
      err = document.getElementById('err');

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = function (id) { return document.getElementById(id).value.trim(); };

    if (!v('n') || !v('p')) {
      err.textContent = 'Please add your name and phone number so we can reach you.';
      return;
    }
    err.textContent = '';

    var body = 'Hi Moveus, I’d like a quote.\n\n' +
      'Name: ' + v('n') + '\nPhone: ' + v('p') + '\nEmail: ' + v('e') +
      '\nFrom: ' + v('f') + '\nTo: ' + v('t') +
      '\nDate: ' + v('d') + '\nDetails: ' + v('m');

    var via = ev.submitter && ev.submitter.getAttribute('data-via');
    if (via === 'mail') {
      location.href = 'mailto:moveuslogistics@gmail.com?subject=' +
        encodeURIComponent('Moving quote request') +
        '&body=' + encodeURIComponent(body);
    } else {
      window.open('https://wa.me/27699051503?text=' + encodeURIComponent(body), '_blank', 'noopener');
    }
  });
})();