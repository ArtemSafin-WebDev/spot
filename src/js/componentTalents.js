import commonCatalog from './commonCatalog';

export default function componentTalents() {
  const hostElem = document.querySelector('#talent-host');

  if (hostElem) {
    commonCatalog(hostElem);
  }
}
