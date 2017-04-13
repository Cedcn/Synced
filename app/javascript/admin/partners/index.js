import Vue from 'vue';
import Partners from './Partners.vue';

const partners = () => {
  const mountPoint = '#partners';
  new Vue({
    el: mountPoint,
    render: h => h(Partners)
  });
};

export default partners;
