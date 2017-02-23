import $ from 'jquery';
import 'navsync/dist/navsync.min';

import header from './2017/header';
import agenda from './2017/agenda';
import address from './2017/address';

$(() => {
  header();
  agenda();
  address();
  $('#gmis-nav').navSync({
    offset: 60,
    highlightClass: 'active'
  });
});
