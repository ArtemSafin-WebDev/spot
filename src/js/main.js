import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import phoneMask from './phoneMask';
import onlyNumeric from './onlyNumeric';
import fileUpload from './fileUpload';
import componentTalentsList from './componentTalentsList';
import componentMainCatalog from './componentMainCatalog';
import componentTalents from './componentTalents';
import componentHeader from './componentHeader';
import test from './test';
import componentVideoWorks from './componentVideoWorks';
import componentVideoFilms from './componentVideoFilms';
import { CommonCircleLoader } from './commonCircleLoader';
import window from 'inputmask/lib/global/window';
import componentContent from './componentContent';

let loader;

document.addEventListener('DOMContentLoaded', function () {
  polyfills();
  detectTouch();
  setScrollbarWidth();
  validation();
  customSelects();
  phoneMask();
  onlyNumeric();
  fileUpload();
  test();

  componentHeader();
  componentTalentsList();
  componentTalents();
  componentVideoWorks();
  componentVideoFilms();
  componentContent();

  loader = new CommonCircleLoader('main');

  loader.onShow();
});

window.addEventListener('load', function () {
  document.body.classList.add('loaded');
  setTimeout(() => document.body.classList.add('animatable'), 300);

  loader.onClose();
  componentMainCatalog();
})
