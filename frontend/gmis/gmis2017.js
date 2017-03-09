import $ from 'jquery';
import { isMobileView, isWechat } from 'mdetect';
import 'jquery-lazyload';
import eruda from 'eruda';

import header from './2017/header';
// import agenda from './2017/agenda';
import address from './2017/address';
import banner from './2017/banner';
import vote from './2017/vote';
import video from './2017/video';

import wechat from './shared/wechat';


$(() => {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  $.ajaxSetup({ headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') } });

  header();
  banner();
  video();
  // agenda();
  vote();
  address();


  $.scrollIt({ topOffset: isMobileView() ? 0 : -75 });
  $('.js-lazy').lazyload({
    threshold: 200,
    effect: 'fadeIn'
  });

  const isDev = process.env.NODE_ENV === 'development';
  if (isDev && isMobileView()) eruda.init();

  // wechat share
  if (isWechat()) wechat();
});
