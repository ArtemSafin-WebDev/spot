import Masonry from 'masonry-layout'
// fixme берем соотношение блоков 16/9 (примерное соотношение стандратных видео)

export default function commonCatalog(hostElem) {
  const catalogListElem = hostElem.querySelector('.gl-catalog__list');
  const catalogItems = hostElem.querySelectorAll('.gl-catalog__item');

  const cardTitleWrapper = hostElem.querySelectorAll('.gl-catalog__card-title-wrapper');
  const cardTitleWithNumElems = hostElem.querySelectorAll('.gl-catalog__card-title-wrapper.with-num');

  const GRID_GAP = 20;

  let currentSize; // 'desk' | 'mobile'

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

  // const mixDumElems = () => {
  //   if (window.innerWidth > 576 && (!currentSize || currentSize !== 'desk')) {
  //     currentSize = 'desk';
  //
  //   } else if (window.innerWidth <= 576 && (!currentSize || currentSize !== 'mobile')) {
  //     currentSize = 'mobile';
  //     const halfItemsArr = [];
  //     const wholeItemsArr = [];
  //     const fullItemsArr = [];
  //     catalogItems.forEach(elem => {
  //       if (elem.className.includes('gl-catalog__item--poster-vertical') || elem.className.includes('gl-catalog__item--poster-square')) {
  //         halfItemsArr.push({
  //           half: elem
  //         });
  //       } else {
  //         wholeItemsArr.push({
  //           whole: elem
  //         });
  //       }
  //     });
  //
  //     let indexLastUnpairedPoster = null;
  //     catalogItems.forEach((el, i) => {
  //       if (i < 2) { // первые два - обязатльено большие
  //         fullItemsArr.push(el);
  //         wholeItemsArr.pop();
  //       } else if (fullItemsArr[fullItemsArr.length - 1].whole || fullItemsArr[fullItemsArr.length - 2].whole) { // если последние 2 - большие
  //         fullItemsArr.push(el);
  //       }
  //
  //       else if (halfItemsArr.length && !indexLastUnpairedPoster) {
  //         halfItemsArr.pop();
  //         fullItemsArr.push(el);
  //         indexLastUnpairedPoster = fullItemsArr.length - 1;
  //       } else if (halfItemsArr.length && indexLastUnpairedPoster) {
  //         halfItemsArr.pop();
  //         fullItemsArr.push(el);
  //         indexLastUnpairedPoster = null;
  //       }
  //     })
  //
  //     fullItemsArr.forEach(elem => {
  //       catalogListElem.appendChild(elem);
  //     })
  //
  //     //   if (elem.className.includes('gl-catalog__item--poster-vertical') || elem.className.includes('gl-catalog__item--poster-square')) {
  //     //     if (i < 1) {
  //     //       catalogListElem.insertBefore(elem, catalogItems[2]);
  //     //       itemsTypesArr[1] = ('qwe');
  //     //       console.log(itemsTypesArr)
  //     //     } else if (itemsTypesArr.lastIndexOf('qwe')) {
  //     //       catalogListElem.insertBefore(elem, catalogItems[itemsTypesArr.lastIndexOf('qwe')]);
  //     //       itemsTypesArr[itemsTypesArr.lastIndexOf('qwe') - 1] = 'qwe'
  //     //     }
  //     //     // catalogListElem.insertBefore(elem, catalogItems[2]);
  //     //   } else {
  //     //     itemsTypesArr[i]('1');
  //     //   }
  //   }
  // }

  onResize();
  // mixDumElems();

  const msnry = new Masonry(catalogListElem, {
    itemSelector: '.gl-catalog__item',
    percentPosition: true,
    gutter: GRID_GAP,
    horizontalOrder: false
  });

  window.addEventListener('resize', () => {
    onResize();
    // mixDumElems();
  });
}
