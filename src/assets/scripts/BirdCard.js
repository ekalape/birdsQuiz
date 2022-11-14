import Bird from '../scripts/Bird.js';
import elGenerator from '../scripts/elGenerator.js';
import audioPlayer from '../scripts/question-player.js';

export default class BirdCard {
  constructor(bird) {
    this.bird = bird;
    this.audioPlayer = new audioPlayer(this.bird.sound);
  }
  drawCard(lang) {
    const cont = elGenerator('div', 'card-container');
  }
}
