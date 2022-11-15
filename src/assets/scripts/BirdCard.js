import Bird from '../scripts/Bird.js';
import elGenerator from '../scripts/elGenerator.js';
import audioPlayer from '../scripts/question-player.js';

export default class BirdCard {
  constructor(bird) {
    this.bird = bird;
    this.audioContainer = elGenerator('div', 'card__audio-container');
    this.audioPlayer = new audioPlayer(this.bird.sound, this.audioContainer);
  }
  drawCard(lang) {
    const cont = elGenerator('div', 'card-container');
    // cont.dataset.index = this.bird.index;

    const b_name = elGenerator('span', 'b-name', this.bird['name_' + lang]);

    const b_img = elGenerator('div', 'b_img');
    b_img.style.backgroundImage = `url(${this.bird.image})`;

    cont.append(b_name, b_img);
    return cont;
  }
}
