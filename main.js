import { horizontalScroll } from './src/hooks/horizontal-scroll';
import { routerObserver } from './src/hooks/router/router-observer';

import './src/components/progress-bar/progress-bar.js';
import './src/components/loading-welcome/loading.js';
import './src/components/header/header';
import './src/components/footer/footer';
import './src/pages/single-page-app-like';
// NB : SECTIONS >
import './src/pages/intro/intro-page';
import './src/pages/about/about';
import './src/pages/projects/projects';
import './src/pages/contact/contact';
// Dark mode
import './src/hooks/secret-mode.js';

window.addEventListener('resize', horizontalScroll);

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

horizontalScroll();
routerObserver();
