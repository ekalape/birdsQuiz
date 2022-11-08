import Bird from './Bird.js';
import elGenerator from './elGenerator.js';
import * as dom from '../../quiz-page/quiz.js';
import audioPlayer from './question-player.js';

export default class Game {
  fullPoints;
  currentPoints;
  currentRound;
  currentRoundBirds;
  hiddenBird;
  setQuantity;
  maxPointsPerRound;
  currentlyDemonstratedBird = null;
  answerBtns = [];
  defaultImageSrc = '../assets/icons/bird-logo-viol.svg';
  questionPlayer;
  descriptionPlayer;
  constructor() {
    this.fullPoints = 0;
    this.currentPoints = 5;
    this.currentRoundBirds = [];
    this.setQuantity = 6;
    this.maxPointsPerRound = 5;
    this.currentRound = 1;
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
  }

  drawBtnsBlock() {
    dom.answerOptions_block.innerHTML = '';
    this.currentRoundBirds.forEach((x) => {
      const aBtn = elGenerator('button', 'answerBtn', x['name_' + dom.lang]);
      aBtn.dataset.id = x.id;
      this.answerBtns.push(aBtn);
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
      this.wrongAnswer();
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
    dom.score_block.textContent = 'Всего: ' + this.fullPoints;
    dom.hiddenBirdImage.style.backgroundImage = `url(${this.hiddenBird.image})`;
    dom.hiddenBirdName.textContent = this.hiddenBird['name_' + dom.lang];
    dom.hiddenBirdLatin.textContent = this.hiddenBird['latinName_' + dom.lang];
    dom.nextBtn.classList.remove('disabled');
    if (this.currentRound === 6) dom.nextBtnText.textContent = 'Результаты';

    dom.storylineInd[this.currentRound - 1].textContent = this.currentPoints;
    if (this.currentPoints === 0) {
      dom.storylineInd[this.currentRound - 1].classList.add('worst-result');
    }
    if (this.currentPoints === this.maxPointsPerRound) {
      dom.storylineInd[this.currentRound - 1].classList.add('perfect-result');
    }

    //make the btn green +
    //this.pickedBirdDescription(birdId);
    //updare storyline Block +
    //update fullPoints Block +
    //update question Block - make name and img visible +
    //stop bird audio
    //add correct sound
  }

  nextRound() {
    if (this.currentRound < 6) {
      this.currentRound += 1;
      this.clearField();
      this.startRound(this.currentRound);
    }
  }

  wrongAnswer() {
    this.currentPoints--;
    //this.pickedBirdDescription(birdId);
    //+make the btn red
    //add wrong sound
  }

  drawDescriptionBlock(lang) {
    if (this.currentlyDemonstratedBird === null) {
      //draw empty block
    } else {
      //draw pickedBirdDescription
    }
  }

  /*  pickedBirdDescription(bird, lang) {
    //create block with bird description

    lang = lang.substring(0, 1).toUpperCase() + lang.substring(1);

    return `<div class="description-block__image" style="background-image: url('${bird.image}')"></div> 
    <div class="description-block__name">
        <span class="b-name__common">${bird['name' + lang]}</span>
        <span class="b-name__latin">${bird['latinName' + lang]}</span>
    </div>
    
    <div class="description-block__audio audio-block">
        <audio src=${bird.sound} class="description-sound"></audio>
        <img class="play-pause" src="./assets/icons/play-black.svg" alt="play audio">
        <span class="sound-range__wrapper">
    
            <input type="range" class="audio-block__sound sound-range" min="0" max="100" value="0"><span class="thumb"></span></span>
    
        <div class="sound-info">
            <span class="sound-info__time"></span>
            <img class="sound-info__on-off" src="./assets/icons/volume-up.png" alt="volume button">
        </div>
        <span class="volume-range__wrapper">
    
            <input type="range" class="audio-block__volume sound-range" min="0" max="10" value="5">
            <span class="thumb-volume"></span></span>
    </div>
    <div class="description-block__description">${bird['description' + lang]}</div>`;
  }

  changeLangDescriptionBlock(lang) {
    if (this.currentlyDemonstratedBird === null) {
      //translate writing
    } else {
    }
  } */
}
