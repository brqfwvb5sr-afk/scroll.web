const chapters = [
  {
    number: '01',
    label: 'Foundation',
    eyebrow: 'Concept 01',
    title: 'Foundation',
    text: 'Am Anfang steht nur die Glasform. Beim Scrollen fährt das Objekt in die Szene, der Hintergrund reagiert und die ersten Details werden sichtbar.'
  },
  {
    number: '02',
    label: 'Light core',
    eyebrow: 'Concept 02',
    title: 'Light Core',
    text: 'Die innere Lichtquelle öffnet sich. Ringe, Reflexe und Farbverläufe erzeugen den Eindruck eines futuristischen Premium-Objekts.'
  },
  {
    number: '03',
    label: 'Assembly',
    eyebrow: 'Concept 03',
    title: 'Assembly',
    text: 'Die Module rutschen aus den Seiten in die Form hinein. Dadurch wirkt die Seite wie eine Produktpräsentation mit echter Bewegung.'
  },
  {
    number: '04',
    label: 'Interface',
    eyebrow: 'Concept 04',
    title: 'Interface',
    text: 'Zum Schluss erscheint eine schwebende Steuerkarte. Die Webseite bleibt minimal, aber bekommt durch Scroll-Animationen Tiefe und Dynamik.'
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

let activeStage = 0;
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
