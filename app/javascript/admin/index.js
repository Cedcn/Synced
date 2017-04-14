import $ from 'jquery';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import 'jquery-ujs';
// import turbolinks from 'turbolinks';

import header from './shared/header';
import sidebar from './shared/sidebar';
import { runPage } from '../common/tool';
// import layout from './layout';
// import guest from './guest';
// import partner from './partner';
// import event from './event';

// commom components
import UploadImage from '../common/UploadImage.vue';

import partnerManager from './events/partner_manager';
import guestsManager from './events/guests_manager';
import eventsHome from './events/events_home';

import partners from './partners';
import articles from './articles';

// turbolinks.start();

const admin = () => {
  Vue.use(ElementUI);
  Vue.component(UploadImage.name, UploadImage);

  header();
  sidebar();

  runPage('admin-events-partner_categories-index', partnerManager);
  runPage('admin-events-guests-index', guestsManager);
  runPage('admin-events-index', eventsHome);
  runPage('admin-partners-index', partners);
  runPage('admin-articles-index', articles);
  // $(document).on('turbolinks:load', () => {
    // layout();
    // runPage('admin-guests-index', guest);
    // runPage('admin-partners-index', partner);
    // runPage(['admin-events-edit', 'admin-events-index', 'admin-events-new', 'admin-events-guests-index', 'admin-events-partner_categories-index'], event);
  // });
};

export default admin;
