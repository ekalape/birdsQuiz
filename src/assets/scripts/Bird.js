import birdsDataEn from '../../birds-json-en.js';
import birdsDataRu from '../../birds-json-ru.js';
import elGenerator from './elGenerator.js';

export default class Bird {
  id;
  name_ru;
  name_en;
  latinName_ru;
  latinName_en;
  descriprtion_ru;
  description_en;
  image;
  sound;

  constructor(outIndex, insideIndex) {
    if (birdsDataEn.length <= outIndex || birdsDataRu.length <= outIndex)
      throw new Error('index of birdData is too big');
    this.id = birdsDataRu[outIndex][insideIndex].id;
    this.name_ru = birdsDataRu[outIndex][insideIndex].name;
    this.latinName_ru = birdsDataRu[outIndex][insideIndex].species;
    this.name_en = birdsDataEn[outIndex][insideIndex].name;
    this.latinName_en = birdsDataEn[outIndex][insideIndex].species;
    this.description_ru = birdsDataRu[outIndex][insideIndex].description;
    this.description_en = birdsDataEn[outIndex][insideIndex].description;
    this.image = birdsDataRu[outIndex][insideIndex].image;
    this.sound = birdsDataRu[outIndex][insideIndex].audio;
  }
  drawDescriptionBlock() {}

  updateQuestionBlock() {}
}
