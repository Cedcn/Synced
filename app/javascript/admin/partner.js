import $ from 'jquery';
import Vue from 'vue';
import upload_multiple_image_component from '../component/upload_multiple_image_component.vue';

const partner = () => {
  $('.partner_form_modal').modal({
    ready() {
      new Vue({
        el: '#vue_image',
        components: {
          upload_multiple_image_component
        }
      });
    }
  });
};

export default partner;
