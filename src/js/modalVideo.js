import Plyr from 'plyr';
import { checkExistParent } from './checkExistParent';

export class ModalVideo {
  hostElem;
  videosElems;
  player;
  btnClose;
  newElem;
  bodyElem;
  isOpenModal = false;

  constructor() {
    this.checkClickByModal = this.checkClickByModal.bind(this);

    this.hostElem = document.querySelector('#modal-host');
    this.videosTitle = this.hostElem.querySelector('.js-title');
    this.btnClose = this.hostElem.querySelector('.js-btn-close');
    this.modalContent = this.hostElem.querySelector('.js-modal-content');
    this.bodyElem = document.querySelector('body');
  }

  onOpenModal(videoLink, videoTitle) {
    this.hostElem.classList.add('mod-show');
    this.newElem = document.createElement('div');
    this.newElem.innerHTML = `
      <div data-plyr-provider="vimeo" data-plyr-embed-id="${ videoLink }"
         class="js-video-modal">
      </div>
    `;
    this.modalContent.appendChild(this.newElem);
    this.videosElems = this.hostElem.querySelector('.js-video-modal');
    this.plyr = new Plyr(this.videosElems, {
      volume: 0
    });
    this.videosTitle.innerText = videoTitle;

    this.plyr.on('playing', event => {
      this.videosTitle.classList.add('mod-hide');
    });

    this.plyr.on('pause', event => {
      this.videosTitle.classList.remove('mod-hide');
    });

    this.bodyElem.classList.add('mod-no-scroll');

    this.btnClose.onclick = () => {
      this.onCloseModal();
    }

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.onCloseModal();
      }
    });

    document.addEventListener('click', this.checkClickByModal);

    this.bodyElem.classList.remove('mod-no-scroll');
  }

  onCloseModal() {
    this.isOpenModal = false;
    this.hostElem.classList.remove('mod-show');
    this.videosElems.removeAttribute('data-plyr-embed-id');
    this.videosTitle.classList.remove('mod-hide');
    this.plyr = null;
    this.newElem.remove();
  }

  checkClickByModal(event) {
    if (this.isOpenModal && !checkExistParent(event.target, this.modalContent)) {
      this.onCloseModal();
    } else {
      this.isOpenModal = true;
    }
  }
}
