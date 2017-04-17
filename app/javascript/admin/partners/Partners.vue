<template>
  <el-row v-loading="isLoading">
    <div class="wrapper--title">
      <span>合作伙伴</span>
    </div>
    <div class="wrapper--header">
      <el-button type="primary" icon="plus" @click="openFormModal('new', { name: '', url: '', logos: [] })">添加合作伙伴</el-button>
    </div>
    <el-dialog title="修改合作伙伴信息" v-model="isShowFormModal">
      <partners-form
        :form-data="formData"
        :type="type"
        :fetchData="fetchData"
        :openFormModal="openFormModal"
        :closeFromModal="closeFromModal"
      />
    </el-dialog>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="url" label="LOGO" />
      <el-table-column prop="url" label="链接" />
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button
            size="small"
            type="success"
            @click="openFormModal('edit', scope.row)"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="warning"
            @click="deletePartner(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
       <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        >
       </el-pagination>
    </div>
  </el-row>
</template>

<script>
  import $ from 'jquery';
  import PartnersForm from './Form';
  import { cloneDeep } from 'lodash';

  export default {
    data() {
      return {
        data: [],
        isShowFormModal: false,
        isLoading: false,
        type: '',
        formData: [],
        currentPage: 1,
        total: 100
      }
    },
    components: {
      PartnersForm
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.isLoading = true;
        $.ajax({
          url: `/admin/partners?page=${this.currentPage}`,
          dataType: 'json'
        })
        .done(data => {
          this.data = data;
        })
        .always(() => {
          this.isLoading = false;
        });
      },
      deletePartner(id) {
        if(!confirm('Are you sure?')) return;
        $.ajax({
          method: 'DELETE',
          url: `/admin/partners/${id}`,
          dataType: 'json'
        })
        .done(() => {
          this.$message({ showClose: true, message: '删除成功' });
          this.fetchData();
        })
        .fail(() => {
          this.$message({ showClose: true, message: '删除失败', type: 'error' });
        })
        .always(() => {
          this.isLoading = false;
        });
      },
      openFormModal(type, data) {
        this.isShowFormModal = true;
        this.type = type;
        this.formData = cloneDeep(data);
      },
      closeFromModal() {
        this.isShowFormModal = false;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.fetchData();
      }
    }
  }
</script>
