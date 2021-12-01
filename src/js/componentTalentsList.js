import commonDarkeningLinks from './commonDarkeningLinks';

export default function componentTalentsList() {
  const hostElem = document.querySelector('#talents-list-host');
  if (hostElem) {
    const linkWrapperElem = document.querySelector('.talents__list');
    const linkElems = hostElem.querySelectorAll('.talents__item-link');
    const talentsContentElem = hostElem.querySelector('.talents__content');
    const photoElems = hostElem.querySelectorAll('.talents__item-photo');
    const talentsContainerElem = document.querySelector('.talents');
    const headerElem = document.querySelector('.header');

    let activeLink;

    const heightWithoutHeader = window.innerHeight - headerElem.clientHeight;

    if (heightWithoutHeader < linkWrapperElem.clientHeight) {
      console.log(heightWithoutHeader)
      console.log(linkWrapperElem.clientHeight)
      linkElems.forEach((link, i) => {
        link.addEventListener('mouseenter', () => {
          if (activeLink !== link) {
            activeLink = link;
            photoElems[i].style.top = `calc(50vh + ${ window.pageYOffset }px`;
          }
        })
      })
    } else {
      console.log(heightWithoutHeader)
      console.log(linkWrapperElem.clientHeight)
      linkElems.forEach((link, i) => {
        link.addEventListener('mouseenter', () => {
          if (activeLink !== link) {
            activeLink = link;
            photoElems[i].style.top = `${ linkWrapperElem.clientHeight / 2 + 160 }px`;
          }
        })
      })
    }

    document.addEventListener('scroll', () => {
      if (window.pageYOffset >= headerElem.clientHeight) {
        talentsContainerElem.style.position = 'initial';
      } else {
        talentsContainerElem.style.position = 'relative';
      }
    })

    commonDarkeningLinks(linkElems, talentsContentElem);
  }
}
