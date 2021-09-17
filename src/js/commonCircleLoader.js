export class CommonCircleLoader {
  hostElem;

  constructor(id) {
    this.hostElem = document.querySelector(`#loader-wrapper-${ id }`);
  }

  onShow() {
    this.hostElem.classList.add('mod-show');
  }

  onClose() {
    this.hostElem.classList.remove('mod-show');
  }
}
