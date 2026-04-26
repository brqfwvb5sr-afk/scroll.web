const chapters = [
  {
    number: '01',
    label: 'Case reveal',
    eyebrow: 'Product 01',
    title: 'Case Reveal',
    text: 'Das Ladecase fährt gross in die Szene. Die Earbuds sind sofort erkennbar und die Seite wirkt mehr wie eine echte Produktpräsentation.'
  },
  {
    number: '02',
    label: 'Single bud',
    eyebrow: 'Product 02',
    title: 'Single Bud',
    text: 'Ein einzelner Earbud rutscht nach vorne. Die Glasreflexe, der Speaker und die Form werden wie bei einem Premium-Render hervorgehoben.'
  },
  {
    number: '03',
    label: 'Exploded view',
    eyebrow: 'Product 03',
    title: 'Exploded View',
    text: 'Die Bestandteile schweben auseinander. So sieht man Case, Treiber, Module und Earbuds wie in einer technischen Apple-Animation.'
  },
  {
    number: '04',
    label: 'Spatial sound',
    eyebrow: 'Product 04',
    title: 'Spatial Sound',
    text: 'Zum Schluss entstehen Soundwellen um die Earbuds. Eine schwebende UI-Karte zeigt den finalen Produktmoment.'
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
