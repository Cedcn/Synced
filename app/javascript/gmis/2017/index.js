import $ from 'jquery';
import { isMobileUA, isWechat } from 'mdetect';
import 'jquery-lazyload';
import eruda from 'eruda';

import header from './header';
// import agenda from './agenda';
import address from './address';
import banner from './banner';
import video from './video';

import wechat from '../shared/wechat';


const init = () => $(() => {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  header();
  banner();
  video();
  // agenda();
  address();


  $.scrollIt({ topOffset: isMobileUA() ? 0 : -75 });
  $('.js-lazy').lazyload({
    threshold: 200,
    effect: 'fadeIn'
  });

  const isDev = process.env.NODE_ENV === 'development';
  if (isDev && isMobileUA()) eruda.init();

  // wechat share
  if (isWechat()) wechat();
});

export default init;
