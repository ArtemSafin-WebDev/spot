import commonDarkeningLinks from './commonDarkeningLinks';
import { checkExistParent } from './checkExistParent';

export default function componentHeader() {
  const hostElem = document.querySelector('#header-host');

  if (hostElem) {
    const linksElems = hostElem.querySelectorAll('.header__control');
    const btnBurger = hostElem.querySelector('.header__burger-wrapper');
    const menuElem = hostElem.querySelector('.header__controls-list');
    const menuWrapper = hostElem.querySelector('.header__menu-wrapper');

    if (btnBurger) {
      let isOpenMenu = false;

      const onOpenMenu = () => {
        menuWrapper.classList.add('mod-show');
        btnBurger.classList.remove('mod-show');
        isOpenMenu = true;
      }

      const onCloseMenu = () => {
        menuWrapper.classList.remove('mod-show');
        setTimeout(() => {
          btnBurger.classList.add('mod-show');
        }, 1000)
        isOpenMenu = false;
      }

      btnBurger.onclick = () => {
        onOpenMenu();
      };

      document.addEventListener('click', (e) => {
        if (isOpenMenu && !checkExistParent(e.target, menuWrapper) && !checkExistParent(e.target, btnBurger)) {
          onCloseMenu();
        }
      })
    }

    commonDarkeningLinks(linksElems, menuElem);
  }
}
