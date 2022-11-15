import '../assets/styles/variables.scss';
import './intro.scss';

import '../assets/icons/bird-logo-yellow.svg';
import '../assets/icons/bird-logo-viol.svg';

import elGenerator from '../assets/scripts/elGenerator.js';
import getSettings from '../assets/scripts/get-settings.js';
import interfaceText from '../interface-text.js';

getImgs();
const cont = document.querySelector('.wrapper');
async function getImgs() {
  const res = await fetch(
    'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f8bc164bb2384a8dab17f91fbbe83402&tags=bird&page=5&format=json&nojsoncallback=1'
  );
  const arr = await res.json();
  const ids = arr.photos.photo.map((x) => [x.server, x.id, x.secret]);
  console.log(arr);
  for (let i = 0; i < ids.length; i++) {
    cont.append(customImg(`https://live.staticflickr.com/${ids[i][0]}/${ids[i][1]}_${ids[i][2]}_n.jpg`));
  }
}
const flipImageAnimation = [
  {
    zIndex: '1',
    transform: 'scale(1)',
    boxShadow: 'none',
  },
  {
    transform: 'scale(1.08)',
    zIndex: '5',
    boxShadow: '0 0 50px #ffd951',
    backgroundSize: 'cover',
    borderRadius: '50%',
    filter: 'blur(0px)',
  },
  {
    transform: 'scale(1.1)',
    zIndex: '5',
    boxShadow: '0 0 50px #ffd951',
    backgroundSize: 'cover',
    borderRadius: '50%',
    filter: 'blur(0px)',
  },
  {
    transform: 'scale(1.08)',
    zIndex: '5',
    boxShadow: '0 0 50px #ffd951',
    backgroundSize: 'cover',
    borderRadius: '50%',
    filter: 'blur(0px)',
  },
  {
    zIndex: '1',
    transform: 'scale(1)',
    boxShadow: 'none',
  },
];
let randomDelay = () => {
  return Math.floor(Math.random() * 100) * 1000 + 1000;
};

function customImg(src) {
  const wr = document.createElement('div');
  wr.classList.add('image_wrapper');
  wr.style.backgroundImage = `url(${src})`;

  wr.animate(flipImageAnimation, {
    duration: 1000,
    iterations: 1,
    delay: randomDelay(),
  });

  return wr;
}

setTimeout(() => {
  document.body.append(addInvite());
}, 1500);

function addInvite() {
  const lang = getSettings().language;

  const inviteWr = elGenerator('div', 'invite');
  const startQuiz = elGenerator('a', ['btn', 'startQuiz-btn'], interfaceText['start_' + lang]);
  const openGallery = elGenerator('a', ['btn', 'openGal-btn'], interfaceText['openGallery_' + lang]);

  startQuiz.href = '../quiz-page/quiz.html';
  openGallery.href = '../gallery-page/gallery.html';
  inviteWr.append(startQuiz, openGallery);

  return inviteWr;
}
