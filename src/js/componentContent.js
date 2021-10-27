import { Navigation, Swiper, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function componentContent() {
  const hostElem = document.querySelector('#content-host');
  if (!hostElem) return;

  const sliderElem = hostElem.querySelector('.js-swiper-container');
  const btnPrev = hostElem.querySelector('.js-btn-prev');
  const btnNext = hostElem.querySelector('.js-btn-next');
  const mobileBtnControlMenu = hostElem.querySelector('.js-mobile-btn-control-menu');
  const mobileMenuContainerElem = hostElem.querySelector('.js-mobile-menu-list-container');
  const mobileMenuElem = hostElem.querySelector('.js-mobile-menu-list');
  const contentBlockElem = hostElem.querySelector('.js-content-block');

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

  mobileBtnControlMenu.onclick = () => {
    if (isOpenMenu) {
      mobileBtnControlMenu.classList.remove('mod-close-btn');
      mobileMenuElem.classList.remove('mod-show');
      mobileMenuContainerElem.style.maxHeight = '0';
      contentBlockElem.classList.remove('mod-hide');
    } else {
      mobileBtnControlMenu.classList.add('mod-close-btn');
      mobileMenuElem.classList.add('mod-show');
      mobileMenuContainerElem.style.maxHeight = `${ mobileMenuElem.offsetHeight }px`;
      setTimeout(() => {
        contentBlockElem.classList.add('mod-hide');
      }, 400)
    }

    isOpenMenu = !isOpenMenu;
  }

  // для старого мобильного слайдера

  // const sliderTabletElem = hostElem.querySelector('.js-swiper-container-tablet');
  // const btnPrevTablet = hostElem.querySelector('.js-btn-prev-tablet');
  // const btnNextTablet = hostElem.querySelector('.js-btn-next-tablet');

  // const swiperMobile = new Swiper(sliderTabletElem, {
  //   slidesPerView: 1,
  //   lazy: true,
  //   keyboard: true,
  //   speed: 400,
  //   navigation: {
  //     prevEl: btnPrevTablet,
  //     nextEl: btnNextTablet
  //   }
  // })
}
