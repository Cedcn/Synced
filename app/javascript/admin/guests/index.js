import Vue from 'vue';
import Guests from './Guests.vue';

const guests = () => {
  const mountPoint = '#guests';
  new Vue({
    el: mountPoint,
    render: h => h(Guests)
  });
};

export default guests;
