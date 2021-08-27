import commonCatalog from './commonCatalog';
import commonVideo from './commonVideo';

export default function test() {
  const hostElem1 = document.querySelector('#main-catalog-host-1');
  if (hostElem1) {
    commonCatalog(hostElem1);
    commonVideo(hostElem1);
  }

  const hostElem2 = document.querySelector('#main-catalog-host-2');
  if (hostElem2) {
    commonCatalog(hostElem2);
    commonVideo(hostElem2);
  }

  const hostElem3 = document.querySelector('#main-catalog-host-3');
  if (hostElem3) {
    commonCatalog(hostElem3);
    commonVideo(hostElem3);
  }

  const hostElem4 = document.querySelector('#main-catalog-host-4');
  if (hostElem4) {
    commonCatalog(hostElem4);
    commonVideo(hostElem4);
  }
}
