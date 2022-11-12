import elGenerator from './elGenerator.js';
import interfaceText from '../../interface-text.js';

//import { startNewGame, lang } from '../../quiz-page/quiz.js';

export default class Result {
  grats;
  constructor(date, score, lang) {
    this.date = date;
    this.score = score;
    this.lang = lang;
    this.grats = this.setGrats();
  }
  visualize() {
    return `${this.date} ${interfaceText['resVisual_' + this.lang][0]} ${this.score} ${
      interfaceText['resVisual_' + this.lang][1]
    } 30. ${this.grats}`;
  }
  setLang(lang) {
    this.lang = lang;
  }
  setGrats() {
    return this.score === 30
      ? interfaceText['gratsBest_' + this.lang]
      : this.score >= 0 && this.score <= 5
      ? interfaceText['gratsWorst_' + this.lang]
      : interfaceText['gratsMed_' + this.lang];
  }
}
