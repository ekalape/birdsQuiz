import './gallery.scss';
import '../assets/styles/variables.scss';

import '../assets/styles/header.scss';
import '../assets/styles/footer.scss';

import '../assets/icons/bird-logo-yellow.svg';
import '../assets/icons/bird-logo-viol.svg';
import '../assets/icons/rs_school_js.svg';

import interfaceText from '../interface-text.js';
import getSettings from '../assets/scripts/get-settings.js';
import Bird from '../assets/scripts/Bird.js';
import BirdCard from '../assets/scripts/BirdCard.js';

let theme;
const clickSound = new Audio('../assets/sounds/click1.wav');

const themeSwitcher = document.querySelectorAll('.theme-switcher');
themeSwitcher.forEach((x) =>
  x.addEventListener('click', () => {
    clickSound.play();
    if (theme === 'dark') theme = 'light';
    else theme = 'dark';
    switchTheme();
  })
);

/* ------------------------hamburger start------------------------------- */
const hamburger = document.querySelector('.hamburger');
const menuMob = document.querySelector('.menu-mobile');

hamburger.addEventListener('click', openMobileMenu);
menuMob.addEventListener('click', function (e) {
  if (['menu__item', 'lang-switcher', 'theme-switcher'].some((x) => e.target.classList.contains(x))) {
    console.log(e.target);
    menuMob.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

function openMobileMenu() {
  clickSound.play();
  hamburger.classList.toggle('open');
  menuMob.classList.toggle('open');
}
/* ------------------------hamburger end------------------------------- */
const langSwitcher = document.querySelectorAll('.lang-switcher');

const cards = [];
const galWrapper = document.querySelector('.gallery-wrapper');

let lang;
window.addEventListener('load', () => {
  useSettings();
  init();
});

langSwitcher.forEach((x) =>
  x.addEventListener('click', () => {
    clickSound.play();
    changeLanguage();
  })
);

document.querySelectorAll('.menu__item').forEach((x) => x.addEventListener('click', () => clickSound.play()));

function useSettings() {
  const settings = getSettings();
  lang = settings.language === 'en' ? 'ru' : 'en';

  changeLanguage();
  theme = settings.theme;
  switchTheme();
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
  loadGallery();
}
window.addEventListener('beforeunload', saveSettings);
function saveSettings() {
  localStorage.setItem('eklp_brdsqz_settings', JSON.stringify({ language: lang, theme: theme }));
}
/* -------------------- gallery --------------------------- */

function init() {
  createCards();
  loadGallery();
}

function createCards() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const b = new Bird(i, j);
      const cb = new BirdCard(b);

      cards.push(cb);
    }
  }
}
function loadGallery() {
  galWrapper.innerHTML = '';

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i].drawCard(lang);
    card.dataset.index = i;
    galWrapper.append(card);
  }
}

galWrapper.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('gallery-wrapper')) return;
  clickSound.play();
  const cardIndex = ev.target.closest('.card-container').dataset.index;
  const modal = cards[cardIndex].drawModal(lang);
  document.body.prepend(modal);
  document.body.style.overflow = 'hidden';
});

function switchTheme() {
  if (theme === 'dark') {
    document.body.classList.remove('lighttheme');
    document.body.classList.add('darktheme');
    themeSwitcher.forEach((x) => (x.style.backgroundImage = `url("../assets/icons/sun.png")`));
  } else {
    document.body.classList.remove('darktheme');
    document.body.classList.add('lighttheme');
    themeSwitcher.forEach((x) => (x.style.backgroundImage = `url("../assets/icons/moon.png")`));
  }
}
