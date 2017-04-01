import $ from 'jquery';
import Vue from 'vue/dist/vue.js';
import upload_multiple_image_component from '../component/upload_multiple_image_component.vue';

const guest = () => {
  $('.guest_form_modal').modal({
    ready: () => {
      new Vue({
        el: '#vue_image',
        components: {
          upload_multiple_image_component
        }
      });
    }
  });
};

export default guest;
