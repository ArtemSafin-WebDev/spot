import commonDarkeningLinks from './commonDarkeningLinks';

export default function componentHeader() {
  const hostElem = document.querySelector('#header-host');

  if (hostElem) {
    const linksWrapperElems = hostElem.querySelector('.header__links-list');
    const linksElems = hostElem.querySelectorAll('.header__link');

    commonDarkeningLinks(linksElems, linksWrapperElems);
  }
}
