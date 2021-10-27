import commonDarkeningLinks from './commonDarkeningLinks';
import { checkExistParent } from './checkExistParent';

export default function componentHeader() {
  const hostElem = document.querySelector('#header-host');

  if (hostElem) {
    const linksElems = hostElem.querySelectorAll('.header__control');
    const btnBurger = hostElem.querySelector('.header__burger');
    const menuElem = hostElem.querySelector('.header__controls-list');
    const menuWrapper = hostElem.querySelector('.header__menu-wrapper');

    if (btnBurger) {
      let isOpenMenu = false;

      const onOpenMenu = () => {
        menuWrapper.classList.add('mod-show');
        btnBurger.classList.add('mod-close-btn');
      }

      const onCloseMenu = () => {
        menuWrapper.classList.remove('mod-show');
        btnBurger.classList.remove('mod-close-btn');

      }

      btnBurger.parentElement.onclick = () => {
        onOpenMenu();
      };

      document.addEventListener('click', (e) => {
        if (isOpenMenu && (!checkExistParent(e.target, menuWrapper) || checkExistParent(e.target, btnBurger))) {
          onCloseMenu();
          isOpenMenu = false;
        } else {
          isOpenMenu = true;
        }
      })
    }

    commonDarkeningLinks(linksElems, menuElem);
  }
}
