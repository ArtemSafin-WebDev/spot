import Masonry from 'masonry-layout';
// fixme берем соотношение блоков 16/9 (примерное соотношение стандратных видео)

export default function commonCatalog(hostElem) {
  const catalogListElem = hostElem.querySelector('.gl-catalog__list');
  const catalogItems = hostElem.querySelectorAll('.gl-catalog__item');

  const cardTitleWrapper = hostElem.querySelectorAll('.gl-catalog__card-title-wrapper');
  const cardTitleWithNumElems = hostElem.querySelectorAll('.gl-catalog__card-title-wrapper.with-num');

  const GRID_GAP = 20;

  let currentSize; // 'desk' | 'mobile'

  const arrBig = [];
  const arrSmall = [];
  let isNoPair = false;
  let lastBig = false;
  let start = 0;

  cardTitleWithNumElems.forEach((elem, i) => {
    if (elem.className.includes('with-num')) {
      const newElem = document.createElement('div');
      newElem.classList.add('gl-catalog__card-title-number');
      if (i + 1 < 10) {
        newElem.innerText = `0${ i + 1 }`;
      } else {
        newElem.innerText = `${ i + 1 }`;
      }
      elem.appendChild(newElem);
    }
  })

  const onResize = () => {
    let widthBlock;
    switch (true) {
      case window.innerWidth > 1024:
        widthBlock = (catalogListElem.clientWidth - GRID_GAP * 2) / 3;
        break;

      case window.innerWidth > 576:
        widthBlock = (catalogListElem.clientWidth - GRID_GAP) / 2;
        break;

      default:
        widthBlock = catalogListElem.clientWidth;
    }

    let height;
    let width;
    let ratio; // 9 / 16 у видосов
    let columnLength;
    catalogItems.forEach((elem, i) => {
      switch (true) {
        case elem.className.includes('gl-catalog__item--poster-vertical'): // fixme постер
          if (window.innerWidth > 576) {
            columnLength = 1;
          } else {
            columnLength = 1 / 2;
          }
          ratio = 690 / 500;
          break;

        case elem.className.includes('gl-catalog__item--poster-square'): // fixme квадрат
          if (window.innerWidth > 576) {
            columnLength = 1;
          } else {
            columnLength = 1 / 2;
          }
          ratio = 1;
          break;

        case elem.className.includes('gl-catalog__item--video-small'): // fixme маленькое видео
          columnLength = 1;
          ratio = 9 / 16; // 280 / 500;
          break;

        case elem.className.includes('gl-catalog__item--video-medium'): // fixme среднее видео
          ratio = 9 / 16; // 600 / 1020;
          columnLength = window.innerWidth > 576 ? 2 : 1;
          break;

        case elem.className.includes('gl-catalog__item--video-large'): // fixme большое видео
          ratio = 9 / 16; // 875 / 1540;
          if (window.innerWidth > 1024) {
            columnLength = 3;
          } else if (window.innerWidth > 576) {
            columnLength = 2;
          } else {
            columnLength = 1;
          }
          break;
      }

      let gap = GRID_GAP * (columnLength - 1);

      if (columnLength === 1 / 2) {
        width = widthBlock * columnLength - GRID_GAP / 2;
      } else if (columnLength === 1) {
        width = widthBlock * columnLength;
      } else {
        width = widthBlock * columnLength + gap;
      }

      height = (((widthBlock * columnLength + gap) * ratio) + cardTitleWrapper[i].clientHeight);

      elem.style.width = `${ width }px`;
      elem.style.height = `${ height }px`;
    })
  }

  catalogItems.forEach(elem => {
    if (elem.className.includes('gl-catalog__item--poster')) {
      arrSmall.push(elem);
    } else {
      arrBig.push(elem);
    }
  });

  let order = 1;

  const commonPush = arr => {
    const elem = arr[0];
    if (elem) {
      elem.style.order = order.toString();
      arr.shift();
      order++;
      return true;
    }

    return false;
  }

  const pushToBigArr = () => {
    if (!commonPush(arrBig)) {
      pushToSmallArr();
    } else {
      lastBig = true;
    }
  }

  const pushToSmallArr = () => {
    if (!commonPush(arrSmall)) {
      pushToBigArr();
    } else {
      lastBig = false;
      isNoPair = !isNoPair;
    }
  }

  const mixDumElems = () => {
    if (start < 2) {
      pushToBigArr();
      start++;
    } else {
      if (lastBig || isNoPair) {
        pushToSmallArr();
      } else {
        pushToBigArr();
      }
    }

    if (arrBig.length || arrSmall.length) {
      mixDumElems();
    }
  }

  onResize();
  mixDumElems();

  if (window.innerWidth > 576) {
    const msnry = new Masonry(catalogListElem, {
      itemSelector: '.gl-catalog__item',
      percentPosition: true,
      gutter: GRID_GAP,
      horizontalOrder: false
    });
  }

  window.addEventListener('resize', () => {
    onResize();
    if (window.innerWidth > 576 && currentSize === 'mobile') {
      currentSize = 'desk';
      msnry.on(eventName, listener)
    } else if (window.innerWidth <= 576 && currentSize === 'desk') {
      currentSize = 'mobile';
      msnry.off(eventName, listener )
      mixDumElems();
    }
  });
}
