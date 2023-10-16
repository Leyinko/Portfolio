import { formAutoFill } from '../../data/constants';
import './styles.css';

let contactSection = document.createElement('section');
contactSection.id = 'contact-container';
contactSection.setAttribute('href', '/Contact');

document.querySelector('#projects-container').insertAdjacentElement('afterend', contactSection);

const titleContact = document.createElement('h1');
titleContact.innerText = 'CONTACT';
titleContact.className = 'title-contact';

contactSection.appendChild(titleContact);

// > Contact Catch Phrase >

function initNoNeedPhrase() {
  const catchContainer = document.createElement('div');
  catchContainer.className = 'catch-container';

  const sayHi = document.createElement('span');
  sayHi.textContent = 'SAY HI';

  const arrowRight = '/assets/icons/arrow-right-shy.svg';
  const chat = '/assets/icons/chat.svg';

  const noNeed = document.createElement('div');
  noNeed.className = 'no-need-container';
  noNeed.innerHTML = `<div id='hiding-arrow'></div><img src='${arrowRight}'><h1>NO NEED</h1><img src='${chat}'>`;

  const shyGif =
    'https://images.prismic.io/cyclops-club/610c8911-3ef6-4a73-b7ed-6e0c11f0e5a1_giphy.gif?auto=compress,format';

  const toBeShy = document.createElement('div');
  toBeShy.id = 'shy-div';
  toBeShy.innerHTML = `<h1>TO BE</h1><img src='${shyGif}'><h1>SHY.</h1>`;

  catchContainer.append(sayHi, noNeed, toBeShy);
  contactSection.appendChild(catchContainer);

  let hoverDiv = document.querySelector('#shy-div');

  hoverDiv.addEventListener('mouseenter', () => {
    let text = document.querySelectorAll('#shy-div h1');
    text.forEach((text) => {
      text.style.transform = 'translateX(0px)';
    });
  });

  hoverDiv.addEventListener('mouseleave', () => {
    let text = document.querySelectorAll('#shy-div h1');
    text.forEach((text) => {
      text.style.transform = '';
    });
  });
}

// > Input Form >

const formTemplate = `
  <div>
    <div class='span-cont'>
      <span>01</span>
    </div>
    <div>
      <h3>I'M</h3>
      <input id='input-name' type="text">
    </div>
  </div>
  <div id='section-container'>
    <div class='span-cont'>
      <span>02</span>
    </div>
    <div id='section-container'>
      <h3>HERE IS MY EMAIL</h3>
      <input id='input-email' type="text">
    </div>
  </div>
  <div>
    <div class='span-cont'>
      <span>03</span>
    </div>
    <div id='section-container' class='select-container'>
      <h3>I HEARD ABOUT THIS FROM</h3>
      <select name="" id="">
        <option value=""></option>
        <option value="Friend">A friend</option>
        <option value="My pet">My pet</option>
        <option value="Other">Other</option>
        <option style='display:none' value="Aliens">Aliens</option>
      </select>
    </div>
  </div>
  <div>
    <div class='span-cont'>
      <span>04</span>
    </div>
    <div id='section-container'>
      <h3>I WANT TO SAY TO YOU</h3>
      <input id='input-say'type="text">
    </div>
  </div>
  <div>
    <div class='span-cont'>
      <span>05</span>
    </div>
    <div id='section-container'>
      <h3>ONE LAST WORD</h3>
      <input id='input-last-word' type="text">
    </div>
  </div>
  <button id='submit-button' type='submit'>Submit</button>

`;

function initForm() {
  const formContainer = document.createElement('form');
  formContainer.id = 'form-container';

  formContainer.innerHTML = formTemplate;
  contactSection.appendChild(formContainer);

  initFakeFormFill();
}

// > Submit fake form >

function initFakeFormFill() {
  let buttonSubmitDOM = document.querySelector('#submit-button');

  const messagePop = document.createElement('span');
  messagePop.className = 'pop-container';
  messagePop.innerText = `This will soon be up and running.`;

  buttonSubmitDOM.appendChild(messagePop);

  const clipPath = document.createElement('div');
  messagePop.appendChild(clipPath);

  buttonSubmitDOM.addEventListener('click', (e) => {
    //
    let inputs = document.querySelectorAll('input');
    // Secret Access
    if (inputs[3].value === 'let me in' || inputs[3].value === 'Let me in') {
      e.preventDefault();
      messagePop.innerText = `Congratulations, secret access button unlocked.`;
      messagePop.appendChild(clipPath);
      //
      document.body.style.transition = 'all 3s ease-in-out';
      //
      const themeToggle = document.querySelector('#theme-container');
      themeToggle.style.visibility = 'visible';
      themeToggle.style.opacity = '1';
      themeToggle.style.cursor = 'pointer';
      document.querySelector('.circle-toggle').style.cursor = 'pointer';
    }
    // Normal output
    e.preventDefault();
    messagePop.style.animation = '';
    void messagePop.offsetWidth;
    messagePop.style.animation = 'pop-the-message 5s ease-in-out';
    setTimeout(() => {
      messagePop.style.opacity = '0';
    }, 2000);
    messagePop.addEventListener('animationend', autoFillForm);
  });

  // > Auto fill form function >

  const animateText = (index, source, output) => {
    if (index < source.length) {
      output.value += source[index];
      setTimeout(() => {
        animateText(index + 1, source, output);
      }, 50);
    }
  };

  let keysAutoFill = Object.values(formAutoFill);
  let inputsValue = document.querySelectorAll('input');

  inputsValue.forEach((input) => input.setAttribute('autocomplete', 'off'));

  function autoFillForm() {
    inputsValue.forEach((input) => (input.value = ''));
    animateText(0, keysAutoFill[0], inputsValue[0]);
    animateText(0, keysAutoFill[1], inputsValue[1]);
    document.querySelector('select').value = 'Aliens';
    animateText(0, keysAutoFill[2], inputsValue[2]);
    animateText(0, keysAutoFill[3], inputsValue[3]);
  }
}

// > Intersection Observer CONTACT >

const contactAnchor = document.querySelector('#contact');

const sectionsOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: '0px',
};

const contactObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    titleContact.classList.add('title-appear');
    // Anchors
    contactAnchor.classList.add('title-appear');
    contactAnchor.style.cursor = 'pointer';
    // Section
    initNoNeedPhrase();
    initForm();
    // Unobserve
    contactObserver.unobserve(entry.target);
  });
}, sectionsOptions);

setTimeout(() => {
  contactObserver.observe(contactSection);
}, 5000);
