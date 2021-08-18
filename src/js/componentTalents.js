import commonCatalog from './commonCatalog';
import commonVideo from './commonVideo';

export default function componentTalents() {
  const hostElem = document.querySelector('#talent-host');

  if (hostElem) {
    commonCatalog(hostElem);
    commonVideo(hostElem);
  }
}
