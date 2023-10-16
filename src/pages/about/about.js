import { picturesClicking } from '../../data/constants';
import './styles.css';

let aboutSection = document.createElement('section');
aboutSection.id = 'about-container';
aboutSection.setAttribute('href', '/About');

document.querySelector('#intro-container').insertAdjacentElement('afterend', aboutSection);

const titleAbout = document.createElement('h1');
titleAbout.innerText = 'ABOUT';
titleAbout.className = 'title-about';
titleAbout.setAttribute('href', '/About');

let anchors = document.querySelectorAll('footer div a');

aboutSection.appendChild(titleAbout);

// > Top text >

export function initAboutText() {
  const completeTextContainer = document.createElement('div');
  completeTextContainer.className = 'complete-text';

  const topCap = document.createElement('h2');
  topCap.textContent = `I AM A FULLSTACK DEVELOPMENT STUDENT.`;
  const botCap = document.createElement('h2');
  botCap.innerHTML = `I LOVE MINIMAL AND BRUTALIST DESIGN.</br>
  I LOVE NATURE, PASTA AND ART.`;

  const insiderText = document.createElement('span');
  insiderText.className = 'insider-text';

  insiderText.innerText = `
  I was born in France with a mix of Italian and Spanish culture.
  After completing my primary college course in marketing, I delved into Photography by pursuing a master's degree in the field  in both France and Spain.
  Over the years,  I've had the opportunity to call various countries home, including Scotland and Holland, before finally returning to Spain.
  `;

  topCap.addEventListener('animationend', () => {
    anchors[0].click();
  });

  completeTextContainer.append(topCap, insiderText, botCap);

  aboutSection.appendChild(completeTextContainer);
}

// > Inside Container >

const xClickIcon = '/assets/img/Profile-X-A.png';

function initAboutImagesXLogo() {
  //
  const photographsContainer = document.createElement('div');
  photographsContainer.className = 'photographs-container';
  aboutSection.appendChild(photographsContainer);

  const imagesContainer = document.createElement('div');
  imagesContainer.id = 'logo-block';
  photographsContainer.appendChild(imagesContainer);

  const logoXClickImage = document.createElement('img');
  logoXClickImage.src = xClickIcon;
  logoXClickImage.id = 'logo';
  //
  logoXClickImage.style.animation = 'appear-right-big 1s ease-in-out 3s backwards';
  //
  logoXClickImage.addEventListener('animationend', () => {
    logoXClickImage.style.animation = '';
    void logoXClickImage.offsetWidth;
    logoXClickImage.style.animation = 'cross-x 0.5s forwards ease-in;';
  });
  //
  aboutSection.appendChild(logoXClickImage);

  let image = document.querySelector('#logo');
  image.addEventListener('click', randomPhotographsOnClick);
}

// > Images Block >

let numberIndex = 10;

function randomPhotographsOnClick() {
  //
  const imageBlock = document.querySelector('#logo-block');
  let image = document.querySelector('#logo');
  //
  if (numberIndex === 0) {
    aboutSection.appendChild(image);
    image.classList.add('end-pictures-effect');
    imageBlock.style.animation = 'disappear-bottom-to-top 0.3s ease-out forwards';
    image.style.pointerEvents = 'none';
    document.querySelector('.complete-text').style.borderBottom = '1px solid black';
    return;
  }
  //
  let containerPopUp = document.createElement('div');
  containerPopUp.className = 'pop-up-container';
  let imagePopUp = document.createElement('img');
  imagePopUp.className = 'pop-up-image';
  containerPopUp.appendChild(imagePopUp);
  imageBlock.appendChild(containerPopUp);
  //
  let imageRandom = picturesClicking[Math.floor(Math.random() * `${numberIndex}`)];
  imagePopUp.src = Object.values(imageRandom);
  let indexToDelete = picturesClicking.indexOf(imageRandom);
  picturesClicking.splice(indexToDelete, 1);
  numberIndex--;
  // Center on section view >
  anchors[0].click();
}

// > Intersection Observer ABOUT >

const aboutAnchor = document.querySelector('#about');

const sectionsOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: '0px',
};

const aboutObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    // Title
    titleAbout.classList.add('title-appear');
    // Anchors
    aboutAnchor.classList.add('title-appear');
    aboutAnchor.style.cursor = 'pointer';
    // Sections Apparitions
    initAboutText();
    initAboutImagesXLogo();
    // Unobserve
    aboutObserver.unobserve(entry.target);
  });
}, sectionsOptions);

setTimeout(() => {
  aboutObserver.observe(aboutSection);
}, 5000);
