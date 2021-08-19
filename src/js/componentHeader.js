import commonDarkeningLinks from './commonDarkeningLinks';

export default function componentHeader() {
  const hostElem = document.querySelector('#header-host');

  if (hostElem) {
    const linksWrapperElems = hostElem.querySelector('.header__controls-list');
    const linksElems = hostElem.querySelectorAll('.header__control');

    commonDarkeningLinks(linksElems, linksWrapperElems);
  }
}
