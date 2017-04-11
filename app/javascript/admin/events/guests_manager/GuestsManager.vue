<template>
  <el-row v-loading="isLoading">
    <el-autocomplete
      v-model="queryString"
      :fetch-suggestions="querySearchAsync"
      placeholder="添加嘉宾"
      @select="handleSelect"
    ></el-autocomplete>
    <el-table ref="dragtable" :data="data" style="width: 100%">
     <el-table-column prop="guest.name" label="嘉宾名" width="180">
     </el-table-column>
     <el-table-column prop="show" label="是否显示" width="180">
       <template scope="scope">
         <el-switch
           v-model="scope.row.show"
           on-color="#13ce66"
           off-color="#ddd"
           @change="(bool) => switchGuest(bool, scope.row.guest.id)"
         />
       </template>
     </el-table-column>
     <el-table-column label="操作">
       <template scope="scope">
         <el-button
           class="delete-btn"
           size="small"
           type="danger"
           :data-guest-id="scope.row.guest.id"
           @click="deleteGuest(scope.row.guest.id)"
         >
           删除
         </el-button>
       </template>
     </el-table-column>
   </el-table>
  </el-row>
</template>

<script>
  import $ from 'jquery';
  import Sortable from 'sortablejs';

  export default {
    data() {
      return {
        data: [],
        showing: false,
        queryString: '',
        isLoading: false
      }
    },
    props: ['eventId'],
    created() {
      this.fetchData();
    },
    mounted() {
      const eventId = this.eventId;
      Sortable.create($(this.$refs.dragtable.$el).find('tbody').get(0), {
        onUpdate: evt => {
          const $item = $(evt.item);
          const position = evt.newIndex;
          const guestId = $item.find('.delete-btn').data('guest-id');

          $.ajax({
            method: 'PATCH',
            data: { events_guest: { rank_order_position: position } },
            url: `/admin/events/${eventId}/guests/${guestId}`,
            dataType: 'json'
          })
          .done(() => {
            this.$message({ showClose: true, message: '排序成功' });
          })
          .fail(() => {
            // alert erro need reload
          });
        }
      });
    },
    methods: {
      fetchData: function() {
        this.isLoading = true;
        $.ajax({
          url: `/admin/events/${this.eventId}/guests`,
          dataType: 'json'
        })
        .done(data => {
          this.data = data;
        })
        .always(() => {
          this.isLoading = false;
        });
      },
      switchGuest: function(bool, guest_id) {
        $.ajax({
          method: 'PATCH',
          url: `/admin/events/${this.eventId}/guests/${guest_id}`,
          data: { events_guest: { show: bool } },
          dataType: 'json'
        })
        .done(() => {
          this.$message({ showClose: true, message: '操作成功' });
        })
        .fail(() => {
          alert('error need reload');
        });
      },
      deleteGuest: function(guest_id) {
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${this.eventId}/guests/${guest_id}`,
            dataType: 'json'
          })
          .done(() => {
            this.fetchData();
            this.$message({ showClose: true, message: '操作成功' });
          })
          .fail(() => {
            alert('error need reload');
          });
        }
      },
      addGuest: function(guest_id) {
        $.ajax({
          method: 'POST',
          data: { id: guest_id },
          url: `/admin/events/${this.eventId}/guests`,
          dataType: 'json'
        })
        .done(data => {
          this.fetchData();
        })
        .fail(xhr => {
          if (xhr.status === 422) {
            alert(xhr.responseJSON.message);
          } else {
            console.log('need refresh and try again');
          }
        });
      },
      handleSelect({ id }) {
        this.queryString = '';
        this.addGuest(id);
      },
      querySearchAsync(queryString, cb) {
        $.ajax({
          url: '/admin/guests',
          data: { 'q[name_cont]': queryString },
          dataType: 'json'
        })
        .done(data => {
          const result = data.map(item => ({ value: item.name, id: item.id }))
          cb(result);
        });
      },
    }
  }
</script>
