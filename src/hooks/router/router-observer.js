const application = document.querySelector('#app').childNodes;

const routerObserverOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: '0px',
};

export function routerObserver() {
  //
  const routerObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      history.replaceState('', '', entry.target.getAttribute('href'));
      document.title = `Portfolio | ` + location.pathname.slice(1);
    });
  }, routerObserverOptions);

  application.forEach((element) => {
    if (element.nodeName.toLocaleLowerCase() === 'section') {
      routerObserver.observe(element);
    }
  });
}
