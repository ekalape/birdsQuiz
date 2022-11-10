import elGenerator from './elGenerator.js';
import interfaceText from '../../interface-text.js';

import { startNewGame, lang } from '../../quiz-page/quiz.js';
export default class {
  grats;
  constructor(date, score) {
    this.date = date;
    this.score = score;
    this.grats =
      this.score === 30
        ? interfaceText['gratsBest_' + lang]
        : this.score >= 0 && this.score <= 5
        ? interfaceText['gratsWorst_' + lang]
        : interfaceText['gratsMed_' + lang];
  }
  visualize(lang) {
    return `${this.date} ${interfaceText['resVisual_' + lang][0]} ${this.score} ${
      interfaceText['resVisual_' + lang][1]
    } 30. ${this.grats}`;
  }
  drawResultMessage() {
    const bgWrapper = elGenerator('div', 'modal-wrapper');
    // bgWrapper.addEventListener('click', () => bgWrapper.remove());
    const messageContainer = elGenerator('div', 'message-container');
    const image = elGenerator('img', 'message-image');
    image.src = '../assets/icons/corona.png';

    const title = elGenerator('h2', 'message-title', this.grats);
    const message = elGenerator(
      'p',
      'message-body',
      `${interfaceText['resVisual_' + lang][0]} ${this.score} ${interfaceText['resVisual_' + lang][1]} 30.`
    );
    const messageQuestion = elGenerator('p', 'message-body', interfaceText['playAgainQuestion_' + lang]);

    const btnsWrapper = elGenerator('div', 'messageBtns-wrapper');
    const tryAgain = elGenerator('button', 'answer-btn activeAnswer-btn', interfaceText['playAgain_' + lang]);
    const openRes = elGenerator('button', 'answer-btn', interfaceText['results_' + lang]);

    tryAgain.addEventListener('click', (e) => {
      bgWrapper.remove();
      startNewGame();
    });
    openRes.addEventListener('click', () => {
      bgWrapper.remove();
      console.log('open results page');
      //open results page
    });

    btnsWrapper.append(tryAgain, openRes);
    messageContainer.append(image, title, message, messageQuestion, btnsWrapper);
    bgWrapper.append(messageContainer);
    return bgWrapper;
  }
}
