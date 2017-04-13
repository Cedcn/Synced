import $ from 'jquery';
import Vue from 'vue';
import EventForm from '../EventForm.vue';

const eventsHome = () => {
  new Vue({
    el: '#events-home',
    components: {
      EventForm
    },
    data: {
      showform: false,
      eventFormData: {}
    },
    methods: {
      openWindow(url) {
        window.open(`/admin/events/${url}`, '_self');
      },
      deleteEvent(id) {
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${id}`
          })
          .done(() => {
            this.$message({ showClose: true, message: '删除成功' });
            window.location.reload();
          });
        }
      },
      openModal(data) {
        this.showform = true;
        this.eventFormData = data;
      }
    }
  });
};

export default eventsHome;
