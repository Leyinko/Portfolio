import './general-styles.css';

// > Set transformation to element >

export function setTransform(element, transform) {
  element.style.transform = transform;
}

// > Linear Interpolation formula >

export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// > Display none to innerHeight 800 >

export function checkInnerHeightDisplay(element) {
  if (window.innerHeight <= 800) {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
}

// > Opacity 0 to innerHeight/Width 800 >

export function checkInnerHeight(element) {
  if (window.innerHeight <= 600) {
    element.style.opacity = '0';
  } else {
    element.style.opacity = '1';
  }
}

export function checkInnerWidth(element) {
  if (window.innerWidth <= 1300) {
    element.style.opacity = '0';
  } else {
    element.style.opacity = '1';
  }
}

// > Horizontal Element to center >

export function centerElement(element, name) {
  let centerWidth = window.innerWidth / 2 - element.getBoundingClientRect().width / 2;
  document.documentElement.style.setProperty(`${name}`, `${centerWidth}px`);
}

// > Vertical Element to center >

export function centerElementVertical(element, name) {
  let centerWidth = window.innerHeight / 2 - element.getBoundingClientRect().height / 2;
  document.documentElement.style.setProperty(`${name}`, `${centerWidth}px`);
}

// > Falling letter text animation >

export function welcomeFallingLetters(letters, element) {
  letters.forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.animationDelay = `${(index * 0.5) / 20}s`;
    element.appendChild(span);
    element.classList.add('falling-animation');
  });
}

// NB : Awesome discovery of [access] => General viewport Height element >
// ! MEDIA QUERY LIKE :3

export function innerHeightViewportIntro(element, property, value) {
  if (window.innerHeight <= 750) {
    element.style[property] = `${value}`;
  } else {
    element.style[property] = '';
  }
}
