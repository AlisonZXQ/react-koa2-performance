import ReactGA from 'react-ga';
import { isProduction } from './helper';

const online = isProduction();

if (online) {
  ReactGA.initialize('UA-108388802-2');
} else {
  ReactGA.initialize('UA-108388802-1');  
}

function eventTrack(category, action, label = '') {
  ReactGA.event({ category, action, label });
}

function pageTrack() {
  const pathname = window.location.pathname.replace(/\d+/g, '***');
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
}

export {
  eventTrack, 
  pageTrack,
};
