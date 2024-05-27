export function checkDisplay() {
  let container = document.body;

  if (window.innerWidth < 850) {
    document.body.innerHTML = '';
    document.body.style.display = 'flex';

    let black = document.createElement('div');
    Object.assign(black.style, {
      backgroundColor: 'black',
      width: '70svw',
      height: '100svh',
    });

    let white = document.createElement('div');
    Object.assign(white.style, {
      backgroundColor: 'var(--background-cyclo)',
      width: '30svw',
      height: '100svh',
    });

    container.append(black, white);

    // Message
    let blackMessage = document.createElement('h1');
    blackMessage.textContent = `THIS IS A DESKTOP PORTFOLIO.
    
    GET YOUR ASS TO A COMPUTER.
    `;
    blackMessage.className = 'black-message';
    black.appendChild(blackMessage);

    let whiteMessage = document.createElement('h1');
    whiteMessage.textContent = `THIS AIN'T INSTAGRAM.`;
    whiteMessage.className = 'white-message';

    white.appendChild(whiteMessage);
  }
}
