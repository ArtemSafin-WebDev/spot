import commonDarkeningLinks from './commonDarkeningLinks';
import { checkExistParent } from './checkExistParent';

export default function componentHeader() {
  const hostElem = document.querySelector('#header-host');

  if (hostElem) {
    const linksWrapperElems = hostElem.querySelector('.header__controls-list');
    const linksElems = hostElem.querySelectorAll('.header__control');
    const btnBurger = hostElem.querySelector('.header__burger-wrapper');
    const menuElem = hostElem.querySelector('.header__controls-list');

    let isOpenMenu = false;

    const onOpenMenu = () => {
      menuElem.classList.add('mod-show');
      btnBurger.classList.remove('mod-show');
      isOpenMenu = true;
    }

    const onCloseMenu = () => {
      menuElem.classList.remove('mod-show');
      setTimeout(() => {
        btnBurger.classList.add('mod-show');
      }, 1000)
      isOpenMenu = false;
    }

    btnBurger.onclick = () => {
      onOpenMenu();
    };

    document.addEventListener('click', (e) => {
      if (isOpenMenu && !checkExistParent(e.target, menuElem) && !checkExistParent(e.target, btnBurger)) {
        onCloseMenu();
      }
    })

    commonDarkeningLinks(linksElems, linksWrapperElems);
  }
}
