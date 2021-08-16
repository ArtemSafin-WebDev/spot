import commonCatalog from './commonCatalog';

export default function componentMainCatalog() {
  const hostElem = document.querySelector('#main-catalog-host');
  if (hostElem) {
    commonCatalog(hostElem);
  }
}
