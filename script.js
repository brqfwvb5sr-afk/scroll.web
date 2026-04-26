const chapters = [
  {
    number: '01',
    label: 'Case reveal',
    eyebrow: 'Product 01',
    title: 'Case Reveal',
    text: 'Das Ladecase fährt gross in die Szene. Die Earbuds sind sofort erkennbar und wirken jetzt wie ein echtes Premium-Produktbild.'
  },
  {
    number: '02',
    label: 'Earbuds',
    eyebrow: 'Product 02',
    title: 'Earbuds',
    text: 'Die zwei Earbuds stehen frei im Fokus. Die dunkle Studio-Optik und die Reflexionen passen sauber zum ersten Bild.'
  },
  {
    number: '03',
    label: 'Exploded view',
    eyebrow: 'Product 03',
    title: 'Exploded View',
    text: 'Die Exploded View zeigt das Produkt technischer und futuristischer, aber ohne die Seite zu überladen.'
  },
  {
    number: '04',
    label: 'Spatial sound',
    eyebrow: 'Product 04',
    title: 'Spatial Sound',
    text: 'Zum Schluss kommt der Hero-Moment mit Spatial-Audio-Gefühl und einer schwebenden UI-Karte.'
  }
];

const body = document.body;
const scrolly = document.querySelector('.scrollytelling');
const product = document.getElementById('productVisual');
const controlCard = document.getElementById('controlCard');
const chapterNumber = document.getElementById('chapterNumber');
const chapterLabel = document.getElementById('chapterLabel');
const stageEyebrow = document.getElementById('stageEyebrow');
const stageTitle = document.getElementById('stageTitle');
const stageText = document.getElementById('stageText');

let activeStage = -1;
let ticking = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setStage(stage) {
  if (stage === activeStage) return;
  activeStage = stage;
  const chapter = chapters[stage];

  body.className = body.className.replace(/stage-\d/g, '').trim();
  body.classList.add(`stage-${stage}`);

  chapterNumber.textContent = chapter.number;
  chapterLabel.textContent = chapter.label;
  stageEyebrow.textContent = chapter.eyebrow;
  stageTitle.textContent = chapter.title;
  stageText.textContent = chapter.text;
}

function updateScrollScene() {
  const rect = scrolly.getBoundingClientRect();
  const total = scrolly.offsetHeight - window.innerHeight;
  const progress = clamp(-rect.top / total, 0, 1);
  const stage = clamp(Math.floor(progress * chapters.length), 0, chapters.length - 1);
  const smooth = progress.toFixed(4);

  product.style.setProperty('--progress', smooth);
  document.documentElement.style.setProperty('--page-progress', smooth);
  setStage(stage);

  if (progress > 0.68) {
    controlCard.classList.add('visible');
  } else {
    controlCard.classList.remove('visible');
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollScene);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick, { passive: true });
window.addEventListener('resize', requestTick);
updateScrollScene();
