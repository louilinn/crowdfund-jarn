SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQS9UzTIvJv6WDBx-2bd3i7eCaxU-wWnHwX-hFNmA1bpHqrjHXVuGnqNMGw6Pll-hge587iMRIPaXT/pub?output=csv'

const total = 1600000;

fetch(SHEET_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split('\n').slice(1); // skip header row
    let remainder = total;
    const chart = document.querySelector('.chart');

    rows.forEach(row => {
      const [id, label, value] = row.split(',');
      const num = parseInt(value);
      remainder -= num;
      const span = document.createElement('span');
      span.id = id.trim();
      span.className = 'block';
      span.title = label.trim();
      span.innerHTML = `<span class="value">${num.toLocaleString('sv-SE')}</span>`;
      span.style.width = num / total * 100 + '%';
      chart.appendChild(span);
    });

    const saknas = document.createElement('span');
    saknas.id = 'saknas';
    saknas.className = 'block';
    saknas.title = 'Saknas';
    saknas.innerHTML = `<span class="value">${remainder.toLocaleString('sv-SE')}</span>`;
    saknas.style.width = remainder / total * 100 + '%';
    chart.appendChild(saknas);
  });
