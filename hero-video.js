'use strict';

const video = document.querySelector('#hero-video');
const playback = document.querySelector('#hero-playback');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let pausedByUser = false;

function startHero() {
  if (motion.matches || pausedByUser) return;
  if (!video.getAttribute('src')) video.src = video.dataset.src;
  video.play().catch(() => {
    playback.hidden = false;
    playback.textContent = 'Play animation';
  });
}

video.addEventListener('playing', () => {
  video.classList.add('is-playing');
  playback.hidden = false;
  playback.textContent = 'Pause animation';
});

video.addEventListener('pause', () => {
  playback.textContent = 'Play animation';
});

playback.addEventListener('click', () => {
  if (video.paused) {
    pausedByUser = false;
    startHero();
  } else {
    pausedByUser = true;
    video.pause();
  }
});

motion.addEventListener('change', () => {
  if (motion.matches) {
    video.pause();
    video.classList.remove('is-playing');
    playback.hidden = true;
  } else {
    startHero();
  }
});

startHero();
