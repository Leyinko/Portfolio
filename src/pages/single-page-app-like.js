export function scrollToAnchor() {
  const anchorsLinks = document.querySelector('footer').querySelectorAll('div:last-of-type a');
  //
  const application = document.querySelector('#app').childNodes;
  anchorsLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      application.forEach((section) => {
        if (section.id.includes(event.target.id)) {
          const approxPercentage = 0.15 * window.innerWidth;
          const coordY = section.offsetLeft - approxPercentage;
          window.scrollTo(0, coordY);
        }
      });
    });
  });
}

scrollToAnchor();

// The change of path is made through the Intersection Observer :flower:
