import $ from 'jquery';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import 'jquery-ujs';

import header from './shared/header';
import sidebar from './shared/sidebar';
import { runPage } from '../common/tool';
import UploadImage from '../common/UploadImage.vue';
import UploadSingleImage from '../common/UploadSingleImage.vue';

import partnerManager from './events/partner_manager';
import guestsManager from './events/guests_manager';
import eventsHome from './events/events_home';

import partners from './partners';
import guests from './guests';
import articles from './articles';

const admin = () => {
  Vue.use(ElementUI);
  Vue.component(UploadImage.name, UploadImage);
  Vue.component(UploadSingleImage.name, UploadSingleImage);

  header();
  sidebar();

  runPage('admin-events-partner_categories-index', partnerManager);
  runPage('admin-events-guests-index', guestsManager);
  runPage('admin-events-index', eventsHome);
  runPage('admin-partners-index', partners);
  runPage('admin-articles-index', articles);
  runPage('admin-guests-index', guests);

  // $(document).on('turbolinks:load', () => {
    // layout();
    // runPage('admin-guests-index', guest);
    // runPage('admin-partners-index', partner);
    // runPage(['admin-events-edit', 'admin-events-index', 'admin-events-new', 'admin-events-guests-index', 'admin-events-partner_categories-index'], event);
  // });
};

export default admin;
