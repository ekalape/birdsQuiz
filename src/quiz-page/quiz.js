import '../assets/styles/variables.scss';

import './quiz.scss';
import '../assets/styles/audio-player.scss';
import '../assets/styles/header.scss';
import '../assets/styles/footer.scss';

import Game from '../assets/scripts/Game.js';
import Bird from '../assets/scripts/Bird.js';
import elGenerator from '../assets/scripts/elGenerator.js';
import audioPlayer from '../assets/scripts/question-player.js';

import '../assets/icons/bird-logo-yellow.svg';
import '../assets/icons/bird-logo-viol.svg';
import '../assets/icons/rs_school_js.svg';
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
/* ------------------------question els------------------------------- */
export const hiddenBirdImage = document.querySelector('.question-block__image');
export const hiddenBirdName = document.querySelector('.question-block__name');
export const hiddenBirdLatin = document.querySelector('.question-block__latin');
export const hiddenBirdAudio = document.querySelector('.question-audio__audiofile');
export const answerOptions_block = document.querySelector('.answer-btns-block');
export const score_block = document.querySelector('.score');

function startNewGame() {
  const game = new Game();

  game.startGame();
}
startNewGame();
