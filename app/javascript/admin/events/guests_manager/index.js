import $ from 'jquery';
import Vue from 'vue';
import GuestsManager from './GuestsManager.vue';

const guestsManager = () => {
  const mountPoint = '#events-guests-manager';
  const eventId = $(mountPoint).data('event-id');
  new Vue({
    el: mountPoint,
    render: h => h(GuestsManager, { props: { eventId } })
  });
};

export default guestsManager;
