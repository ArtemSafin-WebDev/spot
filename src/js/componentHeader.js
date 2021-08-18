import commonDarkeningLinks from './commonDarkeningLinks';

export default function componentHeader() {
  const hostElem = document.querySelector('#header-host');

  if (hostElem) {
    const linksElems = hostElem.querySelectorAll('.header__link');

    commonDarkeningLinks(linksElems);
  }
}
