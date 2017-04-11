<template>
  <el-row v-loading="isLoading">
    <el-button type="primary" icon="plus" @click="dialogVisible = true">添加分类</el-button>
    <template v-for="item, index in data">
      <partner-manager-item :eventId="eventId" :category="item" :fetchData="fetchData" :index="index" :count="data.length">
      </partner-manager-item>
    </template>
    <el-dialog title="添加合作伙伴分类" v-model="dialogVisible">
      <el-input v-model="categoryName" placeholder="请输入分类名.."></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createPartnerCategory()">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import $ from 'jquery';
  import PartnerManagerItem from './PartnerManagerItem';

  export default {
    data() {
      return {
        data: [],
        dialogVisible: false,
        categoryName: '',
        isLoading: false
      }
    },
    components: {
      PartnerManagerItem
    },
    props: ['eventId'],
    created() {
      this.fetchData();
    },
    methods: {
      fetchData: function() {
        this.isLoading = true;
        $.ajax({
          url: `/admin/events/${this.eventId}/partner_categories`,
          dataType: 'json'
        })
        .done(data => {
          this.data = data;
        })
        .always(() => {
          this.isLoading = false;
        });
      },
      createPartnerCategory() {
        $.ajax({
          method: 'POST',
          data: { partner_category: { name: this.categoryName, rank_order_position: '0' } },
          url: `/admin/events/${this.eventId}/partner_categories`,
          dataType: 'json'
        })
        .done(() => {
          this.fetchData();
        })
        .fail(xhr => {
          if (xhr.status === 422) {
            alert(xhr.responseJSON.message);
          } else {
            console.log('need refresh and try again');
          }
        })
        .always(() => {
          this.dialogVisible = false;
        });
      },
    }
  }
</script>
