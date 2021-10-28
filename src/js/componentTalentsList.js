import commonDarkeningLinks from './commonDarkeningLinks';

export default function componentTalentsList() {
  const hostElem = document.querySelector('#talents-list-host');
  if (hostElem) {
    const layoutWrapperElem = document.querySelector('.layout-wrapper');
    const linkElems = hostElem.querySelectorAll('.talents__item-link');
    const talentsContentElem = hostElem.querySelector('.talents__content');
    const photoElems = hostElem.querySelectorAll('.talents__item-photo');

    let activeLink;

    linkElems.forEach((link, i) => {
      link.addEventListener('mouseenter', () => {
        if (activeLink !== link) {
          activeLink = link;
          console.log(`calc(50vw + ${ window.pageYOffset }px`)
          photoElems[i].style.top = `calc(50vh + ${ window.pageYOffset }px`;

          // const cloneLink = link.cloneNode(true);
          // cloneLink.classList.add('js-pseudo-element')
          // cloneLink.classList.add('talents__pseudo-link')
          // cloneLink.style.top = `${ link.getBoundingClientRect().y }px`;
          // cloneLink.style.left = `${ link.getBoundingClientRect().x }px`;
          // layoutWrapperElem.prepend(cloneLink);

          // cloneLink.onmouseleave = () => {
          //   console.log(2)
          //   cloneLink.remove();
          // };
        }
      })
    })

    commonDarkeningLinks(linkElems, talentsContentElem);
  }
}
