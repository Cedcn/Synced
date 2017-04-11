import $ from 'jquery';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import 'jquery-ujs';
// import turbolinks from 'turbolinks';

import sidebar from './shared/sidebar';
import { runPage } from '../common/tool';
// import layout from './layout';
// import guest from './guest';
// import partner from './partner';
// import event from './event';
import partnerManager from './events/partner_manager';
import guestsManager from './events/guests_manager';

// turbolinks.start();

const admin = () => {
  Vue.use(ElementUI);
  sidebar();
  runPage('admin-events-partner_categories-index', partnerManager);
  runPage('admin-events-guests-index', guestsManager);
  // $(document).on('turbolinks:load', () => {
    // layout();
    // runPage('admin-guests-index', guest);
    // runPage('admin-partners-index', partner);
    // runPage(['admin-events-edit', 'admin-events-index', 'admin-events-new', 'admin-events-guests-index', 'admin-events-partner_categories-index'], event);
  // });
};

export default admin;
