import commonDarkeningLinks from './commonDarkeningLinks';

export default function componentTalentsList() {
  const hostElem = document.querySelector('#talents-list-host');
  if (hostElem) {
    const linkElems = hostElem.querySelectorAll('.talents__item-link');
    const talentsContentElem = hostElem.querySelector('.talents__content');

    commonDarkeningLinks(linkElems, talentsContentElem);
  }
}
