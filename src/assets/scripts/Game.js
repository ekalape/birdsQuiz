import Bird from './Bird.js';
import elGenerator from './elGenerator.js';
import * as dom from '../../quiz-page/quiz.js';
import audioPlayer from './question-player.js';
import Result from './Result.js';

import interfaceText from '../../interface-text.js';

export default class Game {
  fullPoints;
  currentPoints;
  currentRound;
  currentRoundBirds;
  hiddenBird;
  setQuantity;
  maxPointsPerRound;
  currentlyDemonstratedBird = null;
  completed;

  defaultImageSrc = '../assets/icons/bird-logo-viol.svg';
  questionPlayer;
  descriptionPlayer;

  descriptionNodes = null;

  constructor() {
    this.fullPoints = 0;
    this.currentPoints = 5;
    this.currentRoundBirds = [];
    this.setQuantity = 6;
    this.maxPointsPerRound = 5;
    this.currentRound = 1;
    this.completed = false;
  }

  startGame() {
    this.startRound(this.currentRound);
    dom.nextBtn.addEventListener('click', this.nextRound.bind(this));
  }
  startRound(roundIndex) {
    this.currentPoints = this.maxPointsPerRound;

    dom.storylineInd.forEach((x) => x.classList.remove('inprogress'));
    dom.storylineInd[roundIndex - 1].classList.add('inprogress');

    for (let i = 0; i < this.setQuantity; i++) {
      const bird = new Bird(roundIndex - 1, i);
      this.currentRoundBirds.push(bird);
    }

    this.hiddenBird = this.currentRoundBirds[this.pickHiddenBirdId()];
    console.log(this.currentRound);
    this.shuffleBirds(this.currentRoundBirds);

    this.questionPlayer = new audioPlayer(
      this.hiddenBird.sound,
      document.querySelector('.question-block__audio')
    );
    this.drawBtnsBlock();
    dom.nextBtn.classList.add('disabled');

    //as a result of function we have 6 birds objects shuffled and 1 hiddenbird, and currentPoints = 6

    //create 6 blocks: storyline-block, hidden-block, answerBtns-block, description-block, points-block and nextBtn__disable
  }

  clearField() {
    dom.answerOptions_block.innerHTML = '';
    dom.hiddenBirdImage.style.backgroundImage = `url(${this.defaultImageSrc})`;
    dom.hiddenBirdName.textContent = '******';
    dom.hiddenBirdLatin.textContent = '';
    dom.hiddenBirdAudio.innerHTML = '';
    this.currentRoundBirds = [];
    this.currentlyDemonstratedBird = null;
    dom.description_block.classList.add('empty-block');
    dom.description_block.innerHTML = '';
    dom.description_block.append(
      elGenerator('span', 'explanation-phrase', interfaceText['hint_' + dom.lang])
    );
  }

  drawBtnsBlock() {
    this.currentRoundBirds.forEach((x) => {
      const aBtn = elGenerator('button', 'answerBtn', x['name_' + dom.lang]);
      aBtn.dataset.id = x.id;

      aBtn.addEventListener('click', this.checkAnswer.bind(this));
      dom.answerOptions_block.append(aBtn);
    });
  }
  checkAnswer(e) {
    console.log(e.target);
    if (this.isCorrectAnswer(+e.target.dataset.id)) {
      this.rightAnswer();
      e.target.classList.add('correct');
    } else {
      this.wrongAnswer(e.target);
      e.target.classList.add('wrong');
    }
  }
  pickHiddenBirdId() {
    return Math.floor(Math.random() * this.setQuantity);
  }

  shuffleBirds(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  isCorrectAnswer(birdId) {
    return birdId === this.hiddenBird.id;
  }
  rightAnswer() {
    this.fullPoints += this.currentPoints;
    dom.score_block.textContent = this.fullPoints;
    dom.hiddenBirdImage.style.backgroundImage = `url(${this.hiddenBird.image})`;
    dom.hiddenBirdName.textContent = this.hiddenBird['name_' + dom.lang];
    dom.hiddenBirdLatin.textContent = this.hiddenBird['latinName_' + dom.lang];
    dom.nextBtn.classList.remove('disabled');
    if (this.questionPlayer.started) this.questionPlayer.playPause();

    if (this.currentRound === 6) {
      dom.nextBtnText.textContent = interfaceText['results_' + dom.lang];
      this.completed = true;
    }

    dom.storylineInd[this.currentRound - 1].textContent = this.currentPoints;
    if (this.currentPoints === 0) {
      dom.storylineInd[this.currentRound - 1].classList.add('worst-result');
    }
    if (this.currentPoints === this.maxPointsPerRound) {
      dom.storylineInd[this.currentRound - 1].classList.add('perfect-result');
    }
    this.drawDescriptionBlock(this.hiddenBird);

    //make the btn green +
    //this.pickedBirdDescription(birdId);
    //updare storyline Block +
    //update fullPoints Block +
    //update question Block - make name and img visible +
    //stop bird audio
    //add correct sound
  }

  nextRound() {
    if (this.currentRound < 6 && !this.completed) {
      this.currentRound += 1;
      this.clearField();
      this.startRound(this.currentRound);
    }
    if (this.completed) {
      const res = new Result(new Date(), this.fullPoints);
      document.body.prepend(res.drawResultMessage());
      //send result to main page for records
    }
  }

  wrongAnswer(t) {
    this.currentPoints--;

    this.drawDescriptionBlock(this.currentRoundBirds.filter((b) => b.id === +t.dataset.id)[0]);

    //this.pickedBirdDescription(birdId);
    //+make the btn red
    //add wrong sound
  }
  changeBtnsLanguage() {
    [...dom.answerOptions_block.children].forEach(
      (x) =>
        (x.textContent = this.currentRoundBirds.filter((b) => b.id === +x.dataset.id)[0]['name_' + dom.lang])
    );
  }

  drawDescriptionBlock(bird) {
    console.log(bird);
    const d_image = elGenerator('div', 'description-block__image');
    d_image.style.backgroundImage = `url(${bird.image})`;
    const d_fullname = elGenerator('div', 'description-block__name');
    const d_name = elGenerator('span', 'b-name__common', bird['name_' + dom.lang]);
    const d_latin = elGenerator('span', 'b-name__latin', bird['latinName_' + dom.lang]);
    d_fullname.append(d_name, d_latin);
    const aContainer = elGenerator('div', 'description-block__audio');
    this.descriptionPlayer = new audioPlayer(bird.sound, aContainer);
    const d_description = elGenerator(
      'div',
      'description-block__description',
      bird['description_' + dom.lang]
    );
    console.log(dom.description_block);
    this.descriptionNodes = {
      name: d_name,
      latin: d_latin,
      descr: d_description,
      bird: bird,
    };

    dom.description_block.classList.remove('empty-block');
    dom.description_block.innerHTML = '';
    dom.description_block.append(d_image, d_fullname, aContainer, d_description);
  }
  translateDescriptionBlock() {
    if (!this.descriptionNodes) return;
    this.descriptionNodes.name.textContent = this.descriptionNodes.bird['name_' + dom.lang];
    this.descriptionNodes.latin.textContent = this.descriptionNodes.bird['latinName_' + dom.lang];
    this.descriptionNodes.descr.textContent = this.descriptionNodes.bird['description_' + dom.lang];
  }
}
