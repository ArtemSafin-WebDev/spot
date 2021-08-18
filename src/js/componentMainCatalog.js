import commonCatalog from './commonCatalog';
import commonVideo from './commonVideo';

export default function componentMainCatalog() {
  const hostElem = document.querySelector('#main-catalog-host');
  if (hostElem) {
    commonCatalog(hostElem);
    commonVideo(hostElem);
  }
}
