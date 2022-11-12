import '../assets/styles/variables.scss';

import './quiz.scss';
import '../assets/styles/audio-player.scss';
import '../assets/styles/header.scss';
import '../assets/styles/footer.scss';
import '../assets/styles/modals.scss';

import Game from '../assets/scripts/Game.js';
import Bird from '../assets/scripts/Bird.js';
import elGenerator from '../assets/scripts/elGenerator.js';
import audioPlayer from '../assets/scripts/question-player.js';
import interfaceText from '../interface-text.js';
import Result from '../assets/scripts/Result.js';
import getSettings from '../assets/scripts/get-settings.js';
//import saveSettings from '../assets/scripts/save-settings.js';

import '../assets/icons/bird-logo-yellow.svg';
import '../assets/icons/bird-logo-viol.svg';
import '../assets/icons/rs_school_js.svg';
import '../assets/icons/play-black.svg';
import '../assets/icons/pause-black.svg';
import '../assets/icons/corona.png';
import '../assets/icons/dobbleNext.png';
import '../assets/icons/premio2.png';
import '../assets/icons/volume-mute.png';
import '../assets/icons/volume-up.png';

const explanationPhrase = document.querySelector('.explanation-phrase');
const langSwitcher = document.querySelectorAll('.lang-switcher');
/* ------------------------hamburger start------------------------------- */
const hamburger = document.querySelector('.hamburger');
const menuMob = document.querySelector('.menu-mobile');

hamburger.addEventListener('click', openMobileMenu);

function openMobileMenu() {
  hamburger.classList.toggle('open');
  menuMob.classList.toggle('open');
}
/* ------------------------hamburger end------------------------------- */
export let lang /*  = 'ru' */;
let game = null;

/* ------------------------question els------------------------------- */
export const hiddenBirdImage = document.querySelector('.question-block__image');
export const hiddenBirdName = document.querySelector('.question-block__name');
export const hiddenBirdLatin = document.querySelector('.question-block__latin');
export const hiddenBirdAudio = document.querySelector('.question-block__audio');
export const answerOptions_block = document.querySelector('.answer-btns-block');
export const score_block = document.querySelector('.score-value');
/* score_block.textContent = interfaceText['score_' + lang] + '0'; */
export const nextBtn = document.querySelector('.next-btn');
export const nextBtnText = document.querySelector('.next-text');
nextBtnText.textContent = interfaceText['next_' + lang];
export const storylineInd = document.querySelectorAll('.round');
export const description_block = document.querySelector('.description-block');

langSwitcher.forEach((x) => x.addEventListener('click', () => interfaceLanguageChange()));

window.addEventListener('load', useSavedSettings);

export function startNewGame() {
  storylineInd.forEach((x) => {
    x.textContent = '?';
    x.classList.remove('perfect-result');
    x.classList.remove('worst-result');
  });

  game = new Game();
  game.clearField();
  game.startGame();
}
//interfaceLanguageChange();
startNewGame();

export function prepareForNewGame() {
  game = null;
}

function interfaceLanguageChange() {
  console.log('inside change lang function', lang);
  if (lang === 'ru') {
    lang = 'en';
    langSwitcher.forEach((x) => (x.textContent = 'RU'));
  } else {
    lang = 'ru';
    langSwitcher.forEach((x) => (x.textContent = 'EN'));
  }
  document.querySelectorAll('.item-intro').forEach((x) => (x.textContent = interfaceText['intro_' + lang]));
  document.querySelectorAll('.item-quiz').forEach((x) => (x.textContent = interfaceText['quiz_' + lang]));
  document
    .querySelectorAll('.item-gallery')
    .forEach((x) => (x.textContent = interfaceText['gallery_' + lang]));
  document.querySelectorAll('.item-res').forEach((x) => (x.textContent = interfaceText['results_' + lang]));

  document.querySelector('.sc').textContent = interfaceText['score_' + lang];

  nextBtnText.textContent = interfaceText['next_' + lang];
  explanationPhrase.textContent = interfaceText['hint_' + lang];
  if (game) {
    game.changeBtnsLanguage();
    game.translateDescriptionBlock();
  }
  if (hiddenBirdName.textContent !== '******') hiddenBirdName.textContent = game.hiddenBird['name_' + lang];
}
function saveSettings() {
  localStorage.setItem('eklp_brdsqz_settings', JSON.stringify({ language: lang, theme: null }));
}
function useSavedSettings() {
  const settings = getSettings();
  console.log(settings.language);
  if (settings.language) {
    if (settings.language === 'ru') lang = 'en';
    else lang = 'ru';

    interfaceLanguageChange();
  }
}
export function saveRecords(res) {
  let arr = [];
  if (localStorage.getItem('eklp_brdsqz_records')) {
    arr = JSON.parse(localStorage.getItem('eklp_brdsqz_records'));
  }
  console.log(arr);
  arr.push(res);
  localStorage.setItem('eklp_brdsqz_records', JSON.stringify(arr));
}
window.addEventListener('beforeunload', saveSettings);
