import './results.scss';

import '../assets/styles/variables.scss';

import '../assets/styles/header.scss';
import '../assets/styles/footer.scss';
import '../assets/styles/modals.scss';

import '../assets/icons/bird-logo-yellow.svg';
import '../assets/icons/bird-logo-viol.svg';
import '../assets/icons/rs_school_js.svg';
import '../assets/icons/corona.png';
import '../assets/icons/sun.png';
import '../assets/icons/moon.png';

import interfaceText from '../interface-text.js';
import getSettings from '../assets/scripts/get-settings.js';
import elGenerator from '../assets/scripts/elGenerator.js';
import Result from '../assets/scripts/Result.js';

/* ------------------------hamburger start------------------------------- */
const hamburger = document.querySelector('.hamburger');
const menuMob = document.querySelector('.menu-mobile');

hamburger.addEventListener('click', openMobileMenu);

function openMobileMenu() {
  hamburger.classList.toggle('open');
  menuMob.classList.toggle('open');
}
/* ------------------------hamburger end------------------------------- */
const langSwitcher = document.querySelectorAll('.lang-switcher');

let lang = 'ru';
window.addEventListener('load', useSettings);

langSwitcher.forEach((x) => x.addEventListener('click', () => changeLanguage()));

function useSettings() {
  const settings = getSettings();
  lang = settings.language;
}
function changeLanguage() {
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
}
