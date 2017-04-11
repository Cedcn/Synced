<template>
  <el-col :span="24">
    <el-row>
      <el-col :span="4">
        <el-input v-model="category.name" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="updatePartnerCategory()">修改</el-button>
        <el-button type="warning" @click="deletePartnerCategory()">删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-autocomplete
          v-model="queryString"
          :fetch-suggestions="querySearchAsync"
          placeholder="添加合作伙伴"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
      <el-col :span="4">
        <el-button v-if="index > 0" type="primary" size="small" @click="moveCategory('top')">上移</el-button>
        <el-button v-if="index < count - 1" type="primary" size="small" @click="moveCategory('down')">下移</el-button>
      </el-col>
    </el-row>
    <el-table
      ref="dragtable"
      class="dragtable"
      :data="category.partner_categories_partners"
    >
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="partner.name" label="名称" />
      <el-table-column prop="name" label="操作">
        <template scope="scope">
          <el-button
            class="delete-btn"
            size="small"
            type="danger"
            :data-partner-id="scope.row.partner.id"
            @click="deleteParnterCategoriesPartner(scope.row.partner.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script>
  import $ from 'jquery';
  import Sortable from 'sortablejs';

  export default {
    data() {
      return {
        queryString: ''
      }
    },
    props: ['category', 'fetchData', 'eventId', 'index', 'count'],
    mounted() {
      const categoryId = this.category.id;
      const eventId = this.eventId;
      Sortable.create($(this.$refs.dragtable.$el).find('tbody').get(0), {
        onUpdate: evt => {
          const $item = $(evt.item);
          const position = evt.newIndex;
          const partnerId = $item.find('.delete-btn').data('partner-id');

          $.ajax({
            method: 'PATCH',
            data: { partner_categories_partner: { rank_order_position: position } },
            url: `/admin/events/${eventId}/partner_categories/${categoryId}/partners/${partnerId}`,
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
      moveCategory(type) {
        const position = type === "top" ? this.index - 1 : this.index + 1;
        $.ajax({
          method: 'PATCH',
          data: { partner_category: { rank_order_position: position } },
          url: `/admin/events/${this.eventId}/partner_categories/${this.category.id}`,
          dataType: 'json'
        })
        .done(() => {
          this.$message({ showClose: true, message: '排序成功' });
          this.fetchData();
        })
        .fail(() => {
          // alert erro need reload
        });
      },
      deleteParnterCategoriesPartner(partnerId) {
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${this.eventId}/partner_categories/${this.category.id}/partners/${partnerId}`
          })
          .done(() => {
            this.fetchData();
          });
        }
      },
      querySearchAsync(queryString, cb) {
        $.ajax({
          url: '/admin/partners',
          data: { 'q[name_cont]': queryString },
          dataType: 'json'
        })
        .done(data => {
          const result = data.map(item => ({ value: item.name, id: item.id }))
          cb(result);
        });
      },
      createStateFilter(queryString) {
        return state => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect({ id }) {
        this.queryString = '';
        this.addPartnerCategory(id);
      },
      addPartnerCategory(partnerId) {
        $.ajax({
          method: 'POST',
          data: { id: partnerId },
          url: `/admin/events/${this.eventId}/partner_categories/${this.category.id}/partners`,
          dataType: 'json'
        })
        .done(() => {
          this.$message({ showClose: true, message: '添加成功' });
          this.fetchData();
        })
        .fail(xhr => {
          this.$message({ showClose: true, message: '操作失败', type: 'error' });
        });
      },
      updatePartnerCategory() {
        $.ajax({
          method: 'PATCH',
          url: `/admin/events/${this.eventId}/partner_categories/${this.category.id}`,
          data: { partner_category: { name: this.category.name } }
        })
        .done(() => {
          this.$message({ showClose: true, message: '修改成功' });
        })
        .fail(xhr => {
          this.$message({ showClose: true, message: '操作失败', type: 'error' });
        });
      },
      deletePartnerCategory() {
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${this.eventId}/partner_categories/${this.category.id}`
          })
          .done(() => {
            this.fetchData();
          });
        }
      },
    }
  }
</script>
