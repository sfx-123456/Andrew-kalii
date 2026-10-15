const duration = document.getElementById('duration');
const roomType = document.getElementById('roomType');
const total = document.getElementById('total');
const summary = document.getElementById('summary');
const dateField = document.getElementById('bookingDate');
const form = document.getElementById('bookingForm');

function calculateTotal() {
  const base = Number(duration.options[duration.selectedIndex].dataset.price);
  const extra = Number(roomType.options[roomType.selectedIndex].dataset.extra);
  total.textContent = '₹' + (base + extra).toLocaleString('en-IN');
  summary.textContent = (duration.value === '30' ? '30 minutes' : '1 hour') + ' · ' + roomType.value + ' room' + (extra ? ' (+₹200)' : '');
  return { base, extra, final: base + extra };
}
duration.addEventListener('change', calculateTotal);
roomType.addEventListener('change', calculateTotal);

const now = new Date();
dateField.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

document.querySelectorAll('.rate-btn').forEach(button => {
  button.addEventListener('click', () => {
    duration.value = button.dataset.duration;
    calculateTotal();
    document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const price = calculateTotal();
  const name = document.getElementById('guestName').value.trim();
  const date = dateField.value;
  const time = document.getElementById('bookingTime').value;
  const guests = document.getElementById('people').value;
  const notes = document.getElementById('notes').value.trim();
  const message = [
    'Hi Andrewmole, I would like to request a Kali room booking.',
    '',
    'Name: ' + name,
    'Duration: ' + (duration.value === '30' ? '30 minutes' : '1 hour'),
    'Room: ' + roomType.value,
    'Preferred date: ' + date,
    'Preferred start time: ' + time,
    'Number of guests: ' + guests,
    'Session price: ₹' + price.base,
    'AC room extra: ₹' + price.extra,
    'Estimated total: ₹' + price.final,
    notes ? 'Extra requests: ' + notes : '',
    '',
    'Please confirm availability and the final details. Thank you!'
  ].filter(Boolean).join('\n');
  window.open('https://wa.me/917012742170?text=' + encodeURIComponent(message), '_blank');
});
calculateTotal();
