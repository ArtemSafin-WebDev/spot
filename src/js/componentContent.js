import { Navigation, Swiper, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function componentContent() {
  const hostElem = document.querySelector('#content-host');
  if (!hostElem) return;

  const sliderElem = hostElem.querySelector('.js-swiper-container');
  const btnPrev = hostElem.querySelector('.js-btn-prev');
  const btnNext = hostElem.querySelector('.js-btn-next');
  const mobileBtnControlMenu = hostElem.querySelector('.js-mobile-btn-control-menu');
  const mobileBtnControlMenuLines = hostElem.querySelector('.content__btn-control-menu');
  const mobileMenuContainerElem = hostElem.querySelector('.js-mobile-menu-list-container');
  const mobileMenuElem = hostElem.querySelector('.js-mobile-menu-list');
  const contentBlockElem = hostElem.querySelector('.js-content-block');
  const tabMenuDeskElems = hostElem.querySelectorAll('.js-tab-menu-desk');
  const btnNavWrapper = hostElem.querySelector('.content__btn-nav-wrapper');

  let isOpenMenu = false;

  const swiperDesk = new Swiper(sliderElem, {
    slidesPerView: 1,
    lazy: true,
    keyboard: true,
    speed: 400,
    navigation: {
      prevEl: btnPrev,
      nextEl: btnNext
    }
  })

  if (tabMenuDeskElems.length <= 5) {
    btnNavWrapper.classList.add('mod-hide');
  }

  tabMenuDeskElems.forEach((tab, i) => {
    if (tab.className.includes('mod-active')) {
      swiperDesk.slideTo(parseInt(i / 5))
    }
  })

  mobileBtnControlMenu.onclick = () => {
    if (isOpenMenu) {
      mobileBtnControlMenuLines.classList.remove('mod-close-btn');
      mobileMenuElem.classList.remove('mod-show');
      mobileMenuContainerElem.style.maxHeight = '0';
      contentBlockElem.classList.remove('mod-hide');
      setTimeout(() => {
        contentBlockElem.classList.remove('mod-opacity');
      })
    } else {
      mobileBtnControlMenuLines.classList.add('mod-close-btn');
      mobileMenuElem.classList.add('mod-show');
      mobileMenuContainerElem.style.maxHeight = `${ mobileMenuElem.offsetHeight }px`;
      contentBlockElem.classList.add('mod-opacity');
      setTimeout(() => {
        contentBlockElem.classList.add('mod-hide');
      }, 400)
    }

    isOpenMenu = !isOpenMenu;
  }
}
