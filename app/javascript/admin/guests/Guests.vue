<template>
  <el-row v-loading="isLoading">
    <div class="wrapper--title">
      <span>嘉宾管理</span>
    </div>
    <div class="wrapper--header">
      <el-button type="primary" icon="plus" @click="openFormModal('new', { name: '', url: '', avatars: [] })">添加嘉宾</el-button>
    </div>
    <el-dialog :title="modalTitle" v-model="isShowFormModal">
      <guests-form
        :form-data="formData"
        :type="type"
        :fetchData="fetchData"
        :openFormModal="openFormModal"
        :closeFromModal="closeFromModal"
      />
    </el-dialog>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="company" label="公司" width="180" />
      <el-table-column prop="title" label="职位" />
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
            @click="deleteGuest(scope.row.id)"
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
  import GuestsForm from './Form';
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
      GuestsForm
    },
    computed: {
      modalTitle: function() {
        return this.type === 'edit' ? '修改嘉宾信息' : '添加嘉宾';
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.isLoading = true;
        $.ajax({
          url: `/admin/guests?page=${this.currentPage}`,
          dataType: 'json'
        })
        .done(data => {
          console.log(data);
          this.data = data;
        })
        .always(() => {
          this.isLoading = false;
        });
      },
      deleteGuest(id) {
        if(!confirm('Are you sure?')) return;
        $.ajax({
          method: 'DELETE',
          url: `/admin/guests/${id}`,
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
