import $ from 'jquery';
import Vue from 'vue';

const eventHome = () => {
  new Vue({
    el: '#event-home',
    methods: {
      open(url) {
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
      }
    }
  });
};

export default eventHome;
