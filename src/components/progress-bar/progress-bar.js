import { centerElement } from '../../functions/styles-functions';
import './styles.css';

const htmlElement = document.documentElement;
export const progressContainer = document.createElement('div');
document.body.appendChild(progressContainer);
progressContainer.className = 'progress-container';

// > Scroll to discover TEXT

const scrollToDiscover = document.createElement('h1');
scrollToDiscover.className = 'scroll-to-discover';
scrollToDiscover.innerText = '( SCROLL TO DISCOVER )';

document.querySelector('#app').insertAdjacentElement('beforeend', scrollToDiscover);

window.addEventListener('load', () => {
  centerElement(scrollToDiscover, `--bottom-discover`);
});

window.addEventListener('resize', () => {
  centerElement(scrollToDiscover, `--bottom-discover`);
});

// > Scroll progress bar

window.addEventListener('scroll', scrollProgress);
window.addEventListener('resize', scrollProgress);

function scrollProgress() {
  const totalHeight = document.body.getBoundingClientRect().height;
  let currentScroll = window.scrollY;
  let scrollProgress = (currentScroll / (totalHeight - window.innerHeight)) * 100;
  if (window.scrollY === 0) {
    scrollProgress = 0;
  }
  htmlElement.style.setProperty('--scroll', `${scrollProgress.toFixed(2)}%`);
  //
  const containerHeight = progressContainer.getBoundingClientRect().height;
  let bottomViewport = document.querySelector('#app').getBoundingClientRect().bottom - containerHeight;
  htmlElement.style.setProperty('--bottomViewport', `${bottomViewport}px`);
  // Scroll Progress List Hide/Show elements >
  if (window.scrollY >= 400) {
    scrollToDiscover.style.transform = 'translateY(50px)';
  }
}

setTimeout(scrollProgress, 2000);
// scrollProgress();
