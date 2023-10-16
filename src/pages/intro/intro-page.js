import { welcomeFallingLetters } from '../../functions/styles-functions';
import './styles.css';

let introContainer = document.createElement('section');
introContainer.id = 'intro-container';
introContainer.setAttribute('href', '/Home');

document.querySelector('#app').appendChild(introContainer);

// > Content

let introTemplate = `
<div class='div-hide zero'></div>
  <div>
    <h2 id='top'></h2>
    <div class='div-hide one'></div>
  </div>
  <div>
    <h2 id='middle'></h2>
    <div class='div-hide two'></div>
  </div>
  <div>
    <h2 id='bottom'></h2>
    <div class='div-hide three'></div>
  </div>
`;

introContainer.innerHTML = introTemplate;

let titleContainer = document.createElement('h1');
titleContainer.id = 'title-intro';
introContainer.insertAdjacentElement('afterbegin', titleContainer);

const lastIntroContainer = document.createElement('div');
lastIntroContainer.id = 'last-intro';
lastIntroContainer.innerHTML = `
  <p></p>
  <button id='spotify-gift'></button>
`;

document.querySelector('.div-hide.three').appendChild(lastIntroContainer);

const fallingText = document.querySelector('#title-intro');

// > Visit message modifier >

window.addEventListener('load', welcomeText);

function welcomeText() {
  visitChecker();

  setTimeout(() => {
    if (localStorage.getItem('visits') > 1) {
      let welcomeBack = 'WELCOME BACK';
      let oneMoreWelcome = welcomeBack.split('');
      welcomeFallingLetters(oneMoreWelcome, fallingText);
    } else {
      let welcomeText = `WELCOME`;
      const firstWelcome = welcomeText.split('');
      welcomeFallingLetters(firstWelcome, fallingText);
    }
  }, 2000);
}

// > Visits & Button Hits Counter >

function visitChecker() {
  if (!localStorage.getItem('visits')) {
    let numberOfVisits = 1;
    localStorage.setItem('visits', numberOfVisits);
    return;
  } else {
    let oneMoreVisit = localStorage.getItem('visits');
    oneMoreVisit++;
    localStorage.setItem('visits', oneMoreVisit);
  }
}

function buttonHits() {
  if (!localStorage.getItem('hits')) {
    let numberOfHits = 1;
    localStorage.setItem('hits', numberOfHits);
    return;
  } else {
    let oneMoreHit = localStorage.getItem('hits');
    oneMoreHit++;
    localStorage.setItem('hits', oneMoreHit);
  }
}

// > Intro Container >

let arrowIcon = 'src/assets/icons/arrow-gift.svg';
let heartIcon = 'src/assets/icons/heart.png';
let eyeIcon = 'src/assets/icons/eye.png';
let coolGestureIcon = 'src/assets/icons/cool-gesture.svg';

let firstLine = document.querySelector('#top');
firstLine.innerHTML = `    HELLO<img src='${coolGestureIcon}'>`;

let secondLine = document.querySelector('#middle');
let thirdLine = document.querySelector('#bottom');

window.addEventListener('resize', introSize);
window.addEventListener('load', introSize);

function introSize() {
  if (window.innerWidth <= 1024 || !window.innerWidth >= 1024) {
    secondLine.innerHTML = `I AM<img src='${eyeIcon}'>LUCA`;
    thirdLine.innerHTML = `   LET'S<img src='${heartIcon}'>`;
  } else {
    secondLine.innerHTML = `MY NAME IS<img src='${eyeIcon}'>LUCA GIRO`;
    thirdLine.innerHTML = `   LET'S<img src='${heartIcon}'>CONNECT`;
  }
}

// > Button Container

document.querySelector('#last-intro p').innerText = `
There's nothing cozier than giving you a sneak peek into my musical tastes.
Let's be honest, everything gets better with a bit of music.`;

// > Fetching songs and playlist from JSON >

window.addEventListener('load', loadTextDocument);

let randomSpotifySong = '';
let playlistAccess = 'https://open.spotify.com/playlist/0b1bWX1wvs3jwQou9ul8y9';

function loadTextDocument() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //
      let jsonData = JSON.parse(this.responseText);
      // Random track
      let randomIndex = Math.floor(Math.random() * jsonData.items.length);
      randomSpotifySong = jsonData.items[`${randomIndex}`].track.external_urls.spotify;
    }
  };

  xhttp.open('GET', 'src/data/Sweet_Paradox.json', true);
  xhttp.send();
}

// ! > BUTTON GIFT CLICK >

let rewardButton = document.querySelector('#last-intro button');

rewardButton.addEventListener('click', () => {
  // Check for reward first >
  if (localStorage.getItem('hits') == 3) {
    window.open(playlistAccess);
  }
  // Else open daily Gift
  window.open(randomSpotifySong);
  loadTextDocument();
  // Countdown
  startCountdown();
  // Button Hits + 1 and Message Days Award
  buttonHits();
  waitTextHit();
  // Update reload
  window.location.reload();
});

// > Countdown >

let countdownDisplay = '';

function startCountdown() {
  const countdownDuration = 24 * 60 * 60 * 1000;
  const startTime = Date.now();
  const endTime = startTime + countdownDuration;

  localStorage.setItem('countdownEndTime', endTime);

  updateCountdown();
}

window.addEventListener('load', updateCountdown);

function updateCountdown() {
  const endTime = parseInt(localStorage.getItem('countdownEndTime'));
  const currentTime = Date.now();
  const timeRemaining = endTime - currentTime;
  //
  const hours = Math.floor(timeRemaining / 3600000);
  const minutes = Math.floor((timeRemaining % 3600000) / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  countdownDisplay = `${hours}h ${minutes}m ${seconds}s`;

  buttonLayout(localStorage.getItem('countdownEndTime'));

  if (localStorage.getItem('countdownEndTime') && timeRemaining <= 0) {
    localStorage.removeItem('countdownEndTime');
    buttonLayout(localStorage.getItem('countdownEndTime'));
    return;
  }
  // Testing solution reload >
  if (countdownDisplay === `0h 0m 0s`) {
    window.location.reload();
  }

  if (localStorage.getItem('countdownEndTime') === 0) {
    localStorage.removeItem('countdownEndTime');
  }

  setTimeout(updateCountdown, 1000);
}

// > Button Layout Check >

window.addEventListener('load', buttonLayout);

const commonStylesButton = {
  pointerEvents: 'none',
  textAlign: 'center',
  padding: '0px',
};

function buttonLayout(countdown) {
  // First check for playlist access >
  if (localStorage.getItem('hits') == 3 && localStorage.getItem('countdownEndTime') <= 0) {
    rewardButton.innerHTML = `Get your awesome reward`;
    Object.assign(rewardButton.style, {
      backgroundColor: '#5a768f',
      textAlign: 'center',
      padding: '0px',
    });
    return;
  }
  // End-game >
  if (countdown && localStorage.getItem('hits') > 3) {
    rewardButton.innerHTML = `Infinity and randomness`;
    Object.assign(rewardButton.style, {
      textAlign: 'center',
      padding: '0px',
    });
  }
  // Last wait >
  if (localStorage.getItem('hits') == 3) {
    rewardButton.innerHTML = `Reward in ${countdownDisplay}`;
    Object.assign(rewardButton.style, commonStylesButton);
  }
  // Original config >
  if (!countdown) {
    rewardButton.innerHTML = `<img src='${arrowIcon}'>Get your awesome track`;
    Object.assign(rewardButton.style, {
      pointerEvents: '',
      textAlign: '',
      padding: '',
    });
  } else if (countdown && localStorage.getItem('hits') < 3) {
    rewardButton.innerHTML = `Next track in ${countdownDisplay}`;
    Object.assign(rewardButton.style, {
      pointerEvents: 'none',
      ...commonStylesButton,
    });
  }
}

// > Hit your reward >

window.addEventListener('load', waitTextHit);

let bottomContainerText = document.querySelector('#last-intro p');

const hitsText = {
  firstHit: 'Hit the button 2 more times to unlock a reward',
  secondHit: 'One more hit before reward',
  thirdHit: 'Congratulations, you now have access to the full playlist!',
};

function hitTextTemplate(hit) {
  return `
There's nothing cozier than giving you a sneak peek into my musical tastes.</br>
Let's be honest, everything gets better with a bit of music.
</br><span id='hit-description'>${hit}</span>`;
}

function waitTextHit() {
  if (localStorage.getItem('hits') == 1) {
    bottomContainerText.innerHTML = hitTextTemplate(hitsText.firstHit);
  } else if (localStorage.getItem('hits') == 2) {
    bottomContainerText.innerHTML = hitTextTemplate(hitsText.secondHit);
  }
  //
  if (localStorage.getItem('hits') == 3 && localStorage.getItem('countdownEndTime') <= 0) {
    bottomContainerText.innerHTML = hitTextTemplate(hitsText.thirdHit);
  }
}
