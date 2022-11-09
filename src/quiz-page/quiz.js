import '../assets/styles/variables.scss';

import './quiz.scss';
import '../assets/styles/audio-player.scss';
import '../assets/styles/header.scss';
import '../assets/styles/footer.scss';

import Game from '../assets/scripts/Game.js';
import Bird from '../assets/scripts/Bird.js';
import elGenerator from '../assets/scripts/elGenerator.js';
import audioPlayer from '../assets/scripts/question-player.js';
import interfaceText from '../interface-text.js';

import '../assets/icons/bird-logo-yellow.svg';
import '../assets/icons/bird-logo-viol.svg';
import '../assets/icons/rs_school_js.svg';

const menuItems = document.querySelectorAll('.menu__item');
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
export let lang = 'ru';
let game = null;

/* ------------------------question els------------------------------- */
export const hiddenBirdImage = document.querySelector('.question-block__image');
export const hiddenBirdName = document.querySelector('.question-block__name');
export const hiddenBirdLatin = document.querySelector('.question-block__latin');
export const hiddenBirdAudio = document.querySelector('.question-block__audio');
export const answerOptions_block = document.querySelector('.answer-btns-block');
export const score_block = document.querySelector('.score-value');
export const nextBtn = document.querySelector('.next-btn');
export const nextBtnText = document.querySelector('.next-text');
export const storylineInd = document.querySelectorAll('.round');
export const description_block = document.querySelector('.description-block');

langSwitcher.forEach((x) => x.addEventListener('click', () => interfaceLanguageChange()));

function startNewGame() {
  game = new Game();
  game.startGame();
  game.drawDescriptionBlock(game.hiddenBird);
}
//interfaceLanguageChange();
startNewGame();

function clearNextBtn() {
  nextBtn.replaceWith(nextBtn.cloneNode(true));
}
function interfaceLanguageChange() {
  console.log(lang);
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
