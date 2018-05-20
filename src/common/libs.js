let context = new AudioContext();
let oscillator = context.createOscillator();
oscillator.connect(context.destination);

// const list = document.getElementById('midi-list');
// const debugEl = document.getElementById('debug');

let isStarted = false;

export function changeType(type) {
  oscillator.type = type;
}

const length = 2;
const eps = 0.01;

// This is a tetris theme transposed from
// https://musescore.com/user/16693/scores/38133
const tetris = [
  [76, 4], [71, 8], [72, 8], [74, 4], [72, 8], [71, 8], [69, 4], [69, 8], [72, 8], [76, 4], [74, 8], [72, 8], [71, 4], [71, 8], [72, 8], [74, 4], [76, 4], [72, 4], [69, 4], [69, 4], [0,  4], [74, 3], [77, 8],[81, 4], [79, 8], [77, 8], [76, 3], [72, 8], [76, 4], [74, 8], [72, 8], [71, 4], [71, 8], [72, 8], [74, 4], [76, 4], [72, 4], [69, 4], [69, 4], [0, 4],
];
export const defaultSong = () => JSON.parse(JSON.stringify(tetris))

export function playSong(song = tetris) {
  if (!isStarted) {
    oscillator.start(0);
    isStarted = true;
  } else {
    context.resume();
  }

  let time = context.currentTime + eps;
  console.log('currentTime', time);
  song.forEach(note => {
    const freq = Math.pow(2, (note[0] - 69) / 12) * 440;
    oscillator
    .frequency
    .setTargetAtTime(freq, time, 0.001);
    time += length / note[1];
  });
  oscillator
    .frequency
    .setTargetAtTime(0, time - eps, 0.001);
}

export function noteOn(midiNote) {
  if (!isStarted) {
    oscillator.start(0);
    isStarted = true;
  } else {
    context.resume();
  }

  console.log(midiNote)
  const freq = Math.pow(2, (midiNote - 69) / 12) * 440;
  oscillator
    .frequency
    .setTargetAtTime(freq, context.currentTime, 0);
}

export function noteOff() {
  setTimeout(() => context.suspend(), 10);
}
