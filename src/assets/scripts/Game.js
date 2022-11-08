import Bird from './Bird.js';
import elGenerator from './elGenerator.js';

export default class Game {
  fullPoints;
  currentPoints;
  currentRoundBirds;
  hiddenBird;
  setQuantity;
  maxPointsPerRound;
  currentlyDemonstratedBird = null;
  constructor() {
    this.fullPoints = 0;
    this.currentPoints = 6;
    this.currentRoundBirds = [];
    this.setQuantity = 6;
    this.maxPointsPerRound = 6;
  }
  startRound(roundIndex) {
    this.currentPoints = this.maxPointsPerRound;
    for (let i = 0; i < this.setQuantity; i++) {
      const bird = new Bird(roundIndex - 1, i);
      this.currentRoundBirds.push(bird);
    }
    this.hiddenBird = this.currentRoundBirds[this.pickHiddenBirdId];
    this.shuffleBirds(this.currentRoundBirds);
    //create 6 blocks: storyline-block, hidden-block, answerBtns-block, description-block, points-block and nextBtn__disable
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
  rightAnswer(birdId) {
    this.fullPoints += this.currentPoints;
    //+make the btn green
    this.pickedBirdDescription(birdId);
    //updare storyline Block
    //update fullPoints Block
    //update question Block - make name and img visible
    //stop bird audio
    //add correct sound
  }

  wrongAnswer(birdId) {
    this.currentPoints--;
    this.pickedBirdDescription(birdId);
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

  pickedBirdDescription(bird, lang) {
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
  }
}
