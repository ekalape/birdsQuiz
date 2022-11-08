import elGenerator from './elGenerator';

export default class audioPlayer {
  p;
  constructor(src, wrapper) {
    this.src = src;
    this.wrapper = wrapper;

    this.drawPlayer();
    this.audioFile.src = this.src;
    this.audioFile.addEventListener('loadedmetadata', () => {
      this.audioDuration = this.audioFile.duration;
      console.log(this.audioFile);
      this.started = false;
      this.curTime = 0;
      this.volumeUp = true;
      this.curVolume = this.volumeRange.value;
      this.infoTime.textContent = `${this.curTime.toFixed(1)} / ${this.audioDuration.toFixed(1)}`;
      this.playerFunctionality();
    });
  }

  drawPlayer() {
    this.audioFile = elGenerator('audio', 'question-audio__audiofile');
    this.playBtn = elGenerator('img', 'question-audio__pp-btn play-pause');
    this.playBtn.src = '../assets/icons/play-black.svg';
    this.playBtn.alt = 'play audio';
    const soundRangeWr = elGenerator('span', 'sound-range__wrapper');
    this.audioRange = elGenerator('input', 'question-audio__range sound-range');
    this.audioRange.type = 'range';
    this.audioRange.min = '0';
    this.audioRange.max = '100';
    this.audioRange.value = '0';
    this.audioThumb = elGenerator('span', 'question-audio__thumb thumb');
    soundRangeWr.append(this.audioRange, this.audioThumb);

    const info = elGenerator('div', 'question-audio__info sound-info');
    this.infoTime = elGenerator('span', 'question-audio-info__time');
    this.volumeBtn = elGenerator('img', 'question-audio-info__on-off on-off');
    this.volumeBtn.src = '../assets/icons/volume-up.png';
    this.volumeBtn.alt = 'volume button';
    info.append(this.infoTime, this.volumeBtn);

    const volumeWr = elGenerator('span', 'volume-range__wrapper');
    this.volumeRange = elGenerator('input', 'question-audio__volume sound-range');
    this.volumeRange.type = 'range';
    this.volumeRange.min = '0';
    this.volumeRange.max = '10';
    this.volumeRange.value = '5';
    this.volumeThumb = elGenerator('span', 'question-audio__thumb-volume thumb-volume');
    volumeWr.append(this.volumeRange, this.volumeThumb);

    this.wrapper.append(this.audioFile, this.playBtn, soundRangeWr, info, volumeWr);
  }

  playerFunctionality() {
    console.log(this.playBtn);
    this.playBtn.addEventListener('click', () => this.playPause.call(this));
    this.audioFile.addEventListener('timeupdate', (e) => {
      this.curTime = e.target.currentTime;
      this.updateData.call(this);
    });
    this.audioRange.addEventListener('input', (e) => this.changeAudioRangeValue.call(this));
  }

  playPause() {
    if (!this.started) {
      this.audioFile.curTime = this.curTime;
      this.p = this.audioFile.play();
      this.started = true;
      this.playBtn.src = '../assets/icons/pause-black.svg';
      this.updateData();
    } else {
      if (this.p !== undefined) {
        this.audioFile.pause();
        this.started = false;
        this.playBtn.src = '../assets/icons/play-black.svg';
      }
    }
  }
  changeAudioRangeValue(e) {
    console.log(this.audioRange.value);
    console.log(this.curTime);
    this.curTime = +this.audioRange.value;
    this.audioFile.currentTime = (this.curTime * this.audioDuration) / 100;
    this.infoTime.textContent = `${this.curTime.toFixed(1)} / ${this.audioDuration.toFixed(1)}`;
    this.audioThumb.style.left = `${this.audioRange.value}%`;
  }
  updateData() {
    this.audioRange.value = (this.curTime / this.audioDuration) * 100;
    this.infoTime.textContent = `${this.curTime.toFixed(1)} / ${this.audioDuration.toFixed(1)}`;
    this.audioThumb.style.left = `${this.audioRange.value}%`;

    if (this.curTime >= this.audioDuration) {
      this.started = false;
      this.audioRange.value = 0;
      this.playBtn.src = '../assets/icons/play-black.svg';
      this.infoTime.textContent = `0.0 / ${this.audioDuration.toFixed(1)}`;
    }
  }
}
