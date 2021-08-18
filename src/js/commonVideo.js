import Plyr from 'plyr';

export default function commonVideo(hostElem) {
  const videosElems = hostElem.querySelectorAll('.gl-catalog__card-video');

  videosElems.forEach((elem, i) => {
    const parent = elem.parentElement;
    const plyr = new Plyr(elem, {
      controls: [],
      loadSprite: false,
      volume: 0
    });

    plyr.muted = true;

    parent.onmouseenter = () => {
      plyr.play();
    }
    parent.onmouseleave = () => {
      plyr.pause();
    };
  });
}
