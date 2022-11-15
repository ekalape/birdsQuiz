import Bird from '../scripts/Bird.js';
import elGenerator from '../scripts/elGenerator.js';
import audioPlayer from '../scripts/question-player.js';
import interfaceText from '../../interface-text.js';
import '../styles/audio-player.scss';

export default class BirdCard {
  constructor(bird) {
    this.bird = bird;
    /*   this.audioContainer = elGenerator('div', 'card__audio-container');
    this.audioPlayer = new audioPlayer(this.bird.sound, this.audioContainer); */
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

  drawModal(lang) {
    const m_bg = elGenerator('div', 'modal-wrapper');
    const cardModal = elGenerator('div', 'card-modal-container');
    m_bg.addEventListener('click', (e) => {
      if (!e.target.classList.contains('modal-wrapper')) return;
      m_bg.remove();
    });

    const d_image = elGenerator('div', 'description-block__image');
    d_image.style.backgroundImage = `url(${this.bird.image})`;
    const d_fullname = elGenerator('div', 'description-block__name');
    const d_name = elGenerator('span', 'b-name__common', this.bird['name_' + lang]);
    const d_latin = elGenerator('span', 'b-name__latin', this.bird['latinName_' + lang]);
    d_fullname.append(d_name, d_latin);
    const aContainer = elGenerator('div', 'description-block__audio');
    this.descriptionPlayer = new audioPlayer(this.bird.sound, aContainer);
    const d_description = elGenerator(
      'div',
      'description-block__description',
      this.bird['description_' + lang]
    );
    const closeBtn = elGenerator('button', 'close-btn', interfaceText['closeBtn_' + lang]);
    cardModal.append(d_image, d_fullname, aContainer, d_description, closeBtn);
    closeBtn.addEventListener('click', () => m_bg.remove());
    m_bg.append(cardModal);
    return m_bg;
  }
}
