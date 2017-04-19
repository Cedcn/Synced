import $ from 'jquery';
import Vue from 'vue';
import EventForm from '../EventForm.vue';

const eventsHome = () => {
  new Vue({
    el: '#events-home',
    components: {
      EventForm
    },
    mounted() {
      this.fetchData();
    },
    data: {
      events: [],
      showform: false,
      eventFormData: {}
    },
    methods: {
      fetchData() {
        this.isLoading = true;
        $.ajax({
          url: `/admin/events?page=${this.currentPage}`,
          dataType: 'json'
        })
        .done(data => {
          this.events = data;
        })
        .always(() => {
          this.isLoading = false;
        });
      },
      deleteEvent(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${id}`
          })
          .done(() => {
            this.$message({ showClose: true, message: '删除成功' });
            this.fetchData();
          });
        }).catch(() => {});
      },
      openModal(data) {
        this.showform = true;
        this.eventFormData = data;
      },
      closeModal() {
        this.showform = false;
        this.fetchData();
      }
    }
  });
};

export default eventsHome;
