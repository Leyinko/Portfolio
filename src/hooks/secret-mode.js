export function secretModeOn() {
  //
  const allElements = document.querySelectorAll('*');
  const allImages = document.querySelectorAll('img');
  //
  allElements.forEach((element) => {
    element.style.backgroundColor = '#00000014';
    element.style.border = '1px solid black';
    element.style.transition = 'none';
  });
  //
  allImages.forEach((image) => {
    image.style.filter = 'invert(1)';
  });

  // Reach Objective >
  window.addEventListener('scroll', reachThePortrait);

  function reachThePortrait() {
    if (window.scrollY === 0) {
      let secret = document.querySelector('#portrait');
      secret.setAttribute('href', '/assets/img/Well-done.gif');

      secret.style.opacity = '1';
      secret.style.visibility = 'visible';

      secret.addEventListener('click', () => {
        window.open(secret.getAttribute('href'));
        window.location.reload();
      });
    }
  }
}
