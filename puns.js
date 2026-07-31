const puns = [
  'I like you a latte',
  'If you were a vegetable, you would be a cute-cumber',
  "I think you're souper",
  'I love you from my head to-ma-toes',
  'You make me s-peach-less',
  "I think you're mangoificent",
  "You're pantastic",
  'Are you pee? Because urine my heart',
];

let punIndex = 0;

function cyclePun() {
  const el = document.getElementById('pun-text');
  if (!el) return;

  el.classList.add('pun-fade');

  setTimeout(() => {
    punIndex = (punIndex + 1) % puns.length;
    el.textContent = puns[punIndex];
    el.classList.remove('pun-fade');
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('pun-text');
  if (!el) return;

  el.textContent = puns[0];
  setInterval(cyclePun, 4000);
});
