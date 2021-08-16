export default function componentTalentsList() {
  const hostElem = document.querySelector('#talents-list-host');
  if (hostElem) {
    const linkElems = hostElem.querySelectorAll('.talents__item-link');
    const talentsContentElem = hostElem.querySelector('.talents__content');

    linkElems.forEach((link, index) => {
      link.onmouseenter = () => {
        linkElems.forEach((elem, i) => {
          if (i !== index) {
            elem.classList.add('no-hover');
          } else {
            elem.classList.remove('no-hover');
          }
        })
      }
    })

    talentsContentElem.onmouseout = () => {
      linkElems.forEach(link => {
        link.classList.remove('no-hover');
      })
    }
  }
}
