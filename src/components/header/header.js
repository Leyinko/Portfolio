import { secretModeOn } from '../../hooks/secret-mode';
import './styles.css';

const header = document.createElement('header');
document.body.insertBefore(header, document.body.firstChild);

let mailIcon = 'src/assets/icons/mail.svg';
let startIcon = 'src/assets/icons/start.svg';
let secretPortrait = 'src/assets/icons/portrait.svg';

const headerTemplate = `
	<div>
		<img id='portrait' src="${secretPortrait}">
	</div>
	<div id='theme-container'></div>
	<div>
		<img id='contact-mail' src="${mailIcon}">
		<img id='back-to-start' src="${startIcon}">
	</div>
`;

header.innerHTML = headerTemplate;

// > Toggle Dark Mode

const toggleContainer = document.querySelector('#theme-container');

const toggleButton = document.createElement('div');
toggleButton.className = 'circle-toggle';
toggleContainer.appendChild(toggleButton);

// > Mail Button

const contactMailButton = document.querySelector('#contact-mail');

contactMailButton.setAttribute('role', 'button');

contactMailButton.addEventListener('click', contactByMail);

function contactByMail() {
  const myEmail = 'co.giro.luca@gmail.com';
  let subject = 'Subject of your email';

  const mailToLink = 'mailto:' + myEmail + '?subject=' + encodeURIComponent(subject);

  window.location.href = mailToLink;
}

// > Back to start Button

const backToStart = document.querySelector('#back-to-start');

backToStart.setAttribute('role', 'button');

backToStart.addEventListener('click', () => {
  window.scrollTo(0, 0);
});

// > Secret access >

toggleContainer.addEventListener('click', () => {
  secretModeOn();
  toggleButton.style.left = '16px';
});
