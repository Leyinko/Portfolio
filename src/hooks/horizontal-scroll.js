import { lerp, setTransform } from '../functions/styles-functions';

let mainWidth;
let current = 0;
let target = 0;
let ease = 0.5;

const totalContainer = document.querySelector('#app');

export function horizontalScroll() {
  init();
  animate();
}

function init() {
  mainWidth = totalContainer.getBoundingClientRect().width;
  document.body.style.height = `${mainWidth - (window.innerWidth - window.innerHeight)}px`;
}

function animate() {
  current = parseFloat(lerp(current, target, ease)).toFixed(2);
  target = window.scrollY;
  setTransform(totalContainer, `translateX(-${current}px)`);
  requestAnimationFrame(animate);
}
