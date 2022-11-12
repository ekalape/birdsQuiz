import elGenerator from './elGenerator.js';
import interfaceText from '../../interface-text.js';

//import { startNewGame, lang } from '../../quiz-page/quiz.js';

export default class Result {
  grats;
  constructor(date, score, lang) {
    this.date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    this.score = score;

    this.visualization = {
      en: this.visualize('en'),
      ru: this.visualize('ru'),
    };
  }
  visualize(lang) {
    return `${this.date} ${interfaceText['resVisualRecord_' + lang][0]} ${this.score} ${
      interfaceText['resVisualRecord_' + lang][1]
    } 30. ${this.setGrats(lang)}`;
  }

  setGrats(lang) {
    return this.score === 30
      ? interfaceText['gratsBest_' + lang]
      : this.score >= 0 && this.score <= 5
      ? interfaceText['gratsWorst_' + lang]
      : interfaceText['gratsMed_' + lang];
  }
}
