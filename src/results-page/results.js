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

let theme;

const themeSwitcher = document.querySelectorAll('.theme-switcher');
themeSwitcher.forEach((x) =>
  x.addEventListener('click', () => {
    if (theme === 'dark') theme = 'light';
    else theme = 'dark';
    switchTheme();
  })
);

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

let lang;
window.addEventListener('load', useSettings);

langSwitcher.forEach((x) => x.addEventListener('click', () => changeLanguage()));

function useSettings() {
  const settings = getSettings();
  lang = settings.language === 'en' ? 'ru' : 'en';
  console.log('inside results', lang);
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
  document.querySelector('.title').textContent = interfaceText['lastRecordsTitle_' + lang];
  drawTable();
}

function drawTable() {
  if (document.querySelector('.records-list')) document.querySelector('.records-list').remove();
  const outer = elGenerator('ul', 'records-list');
  if (localStorage.getItem('eklp_brdsqz_records')) {
    const data = JSON.parse(localStorage.getItem('eklp_brdsqz_records'));
    data.forEach((x) => {
      console.log(x.visualization);
      console.log(lang);
      const dataLine = elGenerator('li', 'records-line', x.visualization[lang]);
      outer.append(dataLine);
    });
  } else {
    const dataLine = elGenerator('li', 'records-line', interfaceText['noDataYet_' + lang]);
    outer.append(dataLine);
  }
  document.querySelector('.title').after(outer);
}

window.addEventListener('beforeunload', saveSettings);
function saveSettings() {
  localStorage.setItem('eklp_brdsqz_settings', JSON.stringify({ language: lang, theme: theme }));
}

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
