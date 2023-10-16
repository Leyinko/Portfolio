import './styles.css';

const footer = document.createElement('footer');
document.body.insertBefore(footer, document.body.lastChild);

const footerTemplate = `
	<aside></aside>
	<div>
		<a id='about'>ABOUT</a>
		<a id='projects'>PROJECTS</a>
		<a id='contact'>CONTACT</a>
	</div>
`;

footer.innerHTML = footerTemplate;

const aside = document.querySelector('aside');

const linkAndHref = {
  '/assets/icons/github.svg': 'https://github.com/Leyinko',
  '/assets/icons/discord.svg': 'https://discordapp.com/users/324998120553447425',
  '/assets/icons/codewars.svg': 'https://www.codewars.com/users/Leyinko',
};

const keyValuePair = Object.entries(linkAndHref);

keyValuePair.forEach((array, index) => {
  let icon = array[0];
  let href = array[1];
  const anchor = document.createElement('img');
  anchor.setAttribute('href', href);
  anchor.src = icon;
  anchor.setAttribute('target', '_blank');
  anchor.style.animationDelay = `${4.5 + (index * 0.5) / 7}s`;
  anchor.addEventListener('click', () => {
    window.open(href);
  });
  aside.appendChild(anchor);
  anchor.classList.add('link-apparition');
});
