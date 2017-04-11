<template>
  <el-col :span="24">
    <el-row>
      <el-col :span="4">
        <el-input v-model="category.name" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="updatePartnerCategory(category)">修改</el-button>
        <el-button type="warning" @click="deletePartnerCategory(category)">删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-autocomplete
          v-model="queryString"
          :fetch-suggestions="querySearchAsync"
          placeholder="添加合作伙伴"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>
    <el-table :data="category.partner_categories_partners" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="partner.name" label="名称" />
      <el-table-column prop="name" label="操作">
        <template scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="deleteParnterCategoriesPartner(category.id, scope.row)"
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
  import _ from 'lodash';

  export default {
    data() {
      return {
        queryString: ''
      }
    },
    props: ['category', 'reloadData', 'eventId'],
    methods: {
      deleteParnterCategoriesPartner(category_id, partner_categories_partner) {
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${this.eventId}/partner_categories/${category_id}/partners/${partner_categories_partner.partner.id}`
          })
          .done(() => {
            this.reloadData();
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
      addPartnerCategory(partner_id) {
        $.ajax({
          method: 'POST',
          data: { id: partner_id },
          url: `/admin/events/${this.eventId}/partner_categories/${this.category.id}/partners`,
          dataType: 'json'
        })
        .done(() => {
          this.$message({ showClose: true, message: '添加成功' });
          this.reloadData();
        })
        .fail(xhr => {
          this.$message({ showClose: true, message: '操作失败', type: 'error' });
        });
      },
      updatePartnerCategory(category) {
        $.ajax({
          method: 'PATCH',
          url: `/admin/events/${this.eventId}/partner_categories/${category.id}`,
          data: { partner_category: { name: category.name } }
        })
        .done(() => {
          this.$message({ showClose: true, message: '修改成功' });
          this.reloadData();
        })
        .fail(xhr => {
          this.$message({ showClose: true, message: '操作失败', type: 'error' });
        });
      },
      deletePartnerCategory(category) {
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${this.eventId}/partner_categories/${category.id}`
          })
          .done(() => {
            this.reloadData();
          });
        }
      },
    }
  }
</script>
