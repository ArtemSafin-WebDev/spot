import Plyr from 'plyr';

export default function commonVideo(hostElem) {
  const videosElems = hostElem.querySelectorAll('.gl-catalog__card-video');

  videosElems.forEach(elem => {
    const parent = elem.parentElement;
    const plyr = new Plyr(elem, {
      controls: [],
      loadSprite: false,
      volume: 0
    });

    plyr.muted = true;

    parent.onmouseenter = () => {
      const playPromise = plyr.play();
      if (playPromise) {
        playPromise.then(() => {
        })
      }
    }

    parent.onmouseleave = () => {
      plyr.stop();
    };
  });
}
