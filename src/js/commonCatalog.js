// fixme берем соотношение блоков 16/9 (примерное соотношение стандратных видео)

export default function commonCatalog(hostElem) {
  const catalogListElem = hostElem.querySelector('.gl-catalog__list');
  const cardTitleWrapper = hostElem.querySelectorAll('.gl-catalog__card-title-wrapper');

  const GRID_GAP = 20;

  const onResize = () => {
    const HEIGHT_CAPTION = cardTitleWrapper[0].clientHeight;
    let width;
    let height;
    switch (true) {
      case window.innerWidth > 1024:
        width = (catalogListElem.clientWidth - GRID_GAP * 2) / 3;
        height = ((width * 9 / 16) + HEIGHT_CAPTION - GRID_GAP * 2) / 3;
        catalogListElem.style.gridTemplateColumns = `repeat(3, minmax(0, ${ width }px))`;
        break;

      case window.innerWidth > 576:
        width = (catalogListElem.clientWidth - GRID_GAP) / 2;
        height = ((width * 9 / 16) + HEIGHT_CAPTION - GRID_GAP) / 3;
        catalogListElem.style.gridTemplateColumns = `repeat(2, minmax(0, ${ width }px))`;
        break;

      default:
        width = catalogListElem.clientWidth;
        height = ((width * 9 / 16) + HEIGHT_CAPTION) / 3;
        catalogListElem.style.gridTemplateColumns = `repeat(1, minmax(0, ${ width }px))`;
    }

    catalogListElem.style.gridAutoRows = `minmax(0, ${ height }px)`;
  }

  onResize();

  window.addEventListener('resize', onResize);
}
