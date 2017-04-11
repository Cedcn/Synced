import $ from 'jquery';
import Vue from 'vue';
import PartnerManager from './PartnerManager.vue';

const partnerManager = () => {
  const mountPoint = '#events-partner-manager';
  const eventId = $(mountPoint).data('event-id');
  new Vue({
    el: mountPoint,
    render: h => h(PartnerManager, { props: { eventId } })
  });
};

export default partnerManager;
