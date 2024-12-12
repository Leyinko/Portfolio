import { projectsInfo } from '../../../public/data/constants';
import './styles.css';

let projectSection = document.createElement('section');
projectSection.id = 'projects-container';
projectSection.setAttribute('href', '/Projects');

document.querySelector('#about-container') &&
  document.querySelector('#about-container').insertAdjacentElement('afterend', projectSection);

const titleProjects = document.createElement('h1');
titleProjects.innerText = 'PROJECTS';
titleProjects.className = 'title-projects';

let anchors = document.querySelectorAll('footer div a');

projectSection.appendChild(titleProjects);

// > Header Text Projects >

const artRetorico = document.createElement('h1');
const contactArtText = document.createElement('p');

function initArtRetorico() {
  artRetorico.classList.add('art-retorico');
  artRetorico.innerText = `BUT WE ARE NOT HERE TO TALK ABOUT ART...`;

  const artRetoricoTwo = document.createElement('h1');
  artRetoricoTwo.classList.add('art-retorico-two');
  artRetoricoTwo.innerText = 'ARE WE ?';

  let artText = `If you are itching for an engaging awesome conversation about art or any related topic, and cannot wait...</br>`;
  contactArtText.innerHTML = artText;

  artRetorico.addEventListener('animationend', () => {
    anchors[1].click();
  });

  artRetorico.appendChild(artRetoricoTwo);
  projectSection.append(artRetorico, contactArtText);
}

// > Suspense Sentence >

function initSuspenseText() {
  //
  let wait = ' WAIT...';
  let loadingEndSentence = 'Now, hit the button that just popped up on the right corner of your screen.';
  //
  setTimeout(() => {
    let finalSpan = document.createElement('span');
    finalSpan.className = 'final-span';
    contactArtText.appendChild(finalSpan);
    contactArtText.classList.add('button-suspense');

    let waitLetters = wait.split('');

    const animateText = (index) => {
      if (index < waitLetters.length) {
        finalSpan.textContent += waitLetters[index];
        finalSpan.style.animationDelay = `${index * 0.5}s`;
        //
        setTimeout(() => {
          animateText(index + 1);
        }, 500);
      }
      if (index === waitLetters.length) {
        finalSpan.remove();
      }
    };
    animateText(0);
  }, 8000);

  setTimeout(() => {
    let lastFinalSpan = document.createElement('span');
    contactArtText.appendChild(lastFinalSpan);
    contactArtText.classList.add('button-suspense');

    let letters = loadingEndSentence.split('');

    const animateText = (index) => {
      if (index < letters.length) {
        lastFinalSpan.textContent += letters[index];
        lastFinalSpan.style.animationDelay = `${(index * 0.4) / 20}s`;
        //
        setTimeout(() => {
          animateText(index + 1);
        }, 30);
      } else if (index === letters.length) {
        document.querySelector('#contact-mail').style.opacity = '1';
      }
    };
    animateText(0);
  }, 14000);
}

// > Projects injection >

function initProjects() {
  const sliderContainer = document.createElement('div');
  sliderContainer.id = 'slider-inner';
  projectSection.appendChild(sliderContainer);

  const hidingCards = document.createElement('div');
  hidingCards.className = 'description-container hider';
  projectSection.appendChild(hidingCards);

  projectsInfo.forEach((project, index) => {
    //
    const item = document.createElement('div');
    const itemImgContainer = document.createElement('div');
    item.className = 'item';
    itemImgContainer.className = 'img';

    item.appendChild(itemImgContainer);

    item.style.animation = ' appear-bottom-big 1.3s ease-in-out forwards';
    item.style.animationDelay = `${index / 10}s`;

    sliderContainer.appendChild(item);
    //
    let images = [...document.querySelectorAll('.img')];
    //
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'description-container';

    projectSection.appendChild(descriptionContainer);
    //
    const keys = Object.keys(projectsInfo);
    const key = keys[index % keys.length];
    const element = projectsInfo[key];
    images[index].style.backgroundImage = `url(${element.image})`;
    //
    // let techList = '';

    // element.technologies_used.forEach((item) => {
    //   techList += createTechElement(item);
    // });
    //
    descriptionContainer.innerHTML += projectPaint(
      element.project_title,
      element.project_description,
      element.project_link
    );
    //
    images[index].addEventListener('click', (e) => {
      descriptionProjectCard();
      e.detail === 2 && window.open(document.querySelector('.container-selected h2').getAttribute('href'), '_blank');
    });
    //
    document
      .querySelectorAll('#project-link-container h2')
      .forEach((link) => link.addEventListener('click', (e) => window.open(e.target.getAttribute('href'), '_blank')));
  });

  // > Slider buttons >

  const buttonSliderNext = document.createElement('button');
  buttonSliderNext.id = 'button-slider-next';

  const buttonSliderPrevious = document.createElement('button');
  buttonSliderPrevious.id = 'button-slider-previous';

  projectSection.append(buttonSliderNext, buttonSliderPrevious);

  const scrollSlider = (amount) => () => sliderContainer.scrollBy(amount, 0);

  buttonSliderNext.addEventListener('click', scrollSlider(400));
  buttonSliderPrevious.addEventListener('click', scrollSlider(-400));
}

function descriptionProjectCard() {
  let images = [...document.querySelectorAll('.img')];
  //
  let containerProjects = document.querySelectorAll('.description-container');
  //
  images.forEach((image, index) => {
    if (image === event.target) {
      image.classList.add('project-selected');
      containerProjects[index + 1].classList.add('container-selected');
    } else {
      image.classList.remove('project-selected');
      containerProjects[index + 1].classList.remove('container-selected');
    }
  });
}

// > Description Project Templates >

function projectPaint(title, description, link) {
  return `
  <div id='project-link-container'>
    <h2 href='${link}'>${title}</h2>
  </div>
  <p>${description}</p>
  `;
}

function createTechElement(tech) {
  return `
  <li style='display:inline-block'>
    <img class='tech-icons' src='${tech}'>
  </li>`;
}

// > Intersection Observer PROJECTS >

const projectAnchor = document.querySelector('#projects');

const sectionsOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: '0px',
};

const projectsObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    titleProjects.classList.add('title-appear');
    // Anchors
    projectAnchor.classList.add('title-appear');
    projectAnchor.style.cursor = 'pointer';
    // Section
    initArtRetorico();
    initSuspenseText();
    setTimeout(initProjects, 18000);
    // Unobserve
    projectsObserver.unobserve(entry.target);
  });
}, sectionsOptions);

setTimeout(() => {
  projectsObserver.observe(projectSection);
}, 5000);
