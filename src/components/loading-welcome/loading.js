import './styles.css';

const loadingContainer = document.createElement('div');
loadingContainer.id = 'loading-background';
document.body.appendChild(loadingContainer);

const templateLoading = `
  <div class='loading-container'>
		<h3>Source: LUCA_GIRO_PORTFOLIO (Welcome)</h3>
		<div class="loading-progress-container">
			<div id="progression"></div>	
		</div>
		<div id="text">
			<span></span>
			<p></p>
		</div>
  </div>
`;

loadingContainer.innerHTML = templateLoading;

// > Loading Bar

const progression = document.getElementById('progression');

let fill = 0;
const progressionInterval = setInterval(loading, 14);

function loading() {
  if (fill === 100) {
    clearInterval(progressionInterval);
  } else {
    fill += 2;
    progression.style.width = `${fill}%`;
  }
}

// > Elapsed and Remaining

const textContainer = document.querySelector('#text');

let elapsed = textContainer.firstElementChild;
let remaining = textContainer.lastElementChild;

let elapsedTimer = 0;
let remainingTimer = 99;
const numberLoading = setInterval(numberTextLoading, 13);

let childNodes = loadingContainer.childNodes;

function numberTextLoading() {
  if (elapsedTimer === 99) {
    clearInterval(numberLoading);
    for (let i = 0; i < childNodes.length; i++) {
      const element = childNodes[i];
      if (element.nodeType === Node.ELEMENT_NODE) element.style.opacity = '0';
    }
    // Transformation at the end >
    loadingContainer.style.backgroundColor = 'transparent';
    // Timeout Settings >
    setTimeout(openUpView, 320);
  } else {
    elapsedTimer++;
    elapsed.innerText = 'Elapsed: 00:00:' + elapsedTimer.toString();
    remainingTimer--;
    remaining.innerText = 'Remaining: 00:00:' + remainingTimer.toString();
  }
}

function openUpView() {
  loadingContainer.addEventListener('transitionend', () => {
    loadingContainer.style.height = '0%';
    loadingContainer.style.zIndex = '-9999';
    document.querySelector('#app').style.filter = 'none';
  });
}
