import birdsDataEn from '../../birds-json-en.js';
import birdsDataRu from '../../birds-json-ru.js';
import elGenerator from './elGenerator.js';

export default class Bird {
  id;
  nameRu;
  nameEn;
  latinNameRu;
  latinNameEn;
  descriprtionRu;
  descriptionEn;
  image;
  sound;
  btn;

  constructor(outIndex, insideIndex) {
    if (birdsDataEn.length <= outIndex || birdsDataRu.length <= outIndex)
      throw new Error('index of birdData is too big');
    this.id = birdsDataRu[outIndex][insideIndex].id;
    this.nameRu = birdsDataRu[outIndex][insideIndex].name;
    this.latinNameRu = birdsDataRu[outIndex][insideIndex].species;
    this.nameEn = birdsDataEn[outIndex][insideIndex].name;
    this.latinNameEn = birdsDataEn[outIndex][insideIndex].species;
    this.descriptionRu = birdsDataRu[outIndex][insideIndex].description;
    this.descriptionEn = birdsDataEn[outIndex][insideIndex].description;
    this.image = birdsDataRu[outIndex][insideIndex].image;
    this.sound = birdsDataRu[outIndex][insideIndex].audio;
  }
  drawDescriptionBlock() {}
  drawQuestionBlock() {}
  drawBirdBtn() {
    const btn = document.createElement('button');
    btn.classList.add('answer-option-btn');
    btn.textContent = this.nameRu;
  }
  updateBirdBtn() {}
  updateQuestionBlock() {}
}
