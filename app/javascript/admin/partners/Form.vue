<template>
  <el-form
  ref="form"
  :model="formData"
  label-width="80px"
  enctype="multipart/form-data"
  accept-charset="UTF-8"
  :action="url"
  method="post"
  >
    <input name="utf8" type="hidden" value="✓">
    <input v-if="type === 'edit'" type="hidden" name="_method" value="patch">
    <el-form-item label="名称">
      <el-input name="partner[name]" v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="链接">
      <el-input name="partner[url]" v-model="formData.url"></el-input>
    </el-form-item>
    <el-form-item label="LOGO">
      <upload-image :data="formData.logos" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" name="commit" native-type="submit">保存</el-button>
      <el-button @click="closeFromModal()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import $ from 'jquery';
  import 'jquery-form';

  export default {
    props: ['formData', 'type', 'fetchData', 'closeFromModal'],
    computed: {
      url() {
        return this.type === 'edit' ? `/admin/partners/${this.formData.id}`: '/admin/partners'
      }
    },
    mounted() {
      const $form = $(this.$refs.form.$el);
      $form.ajaxForm({
        success: () => {
          this.closeFromModal();
          this.$message({ showClose: true, message: '保存成功' });
          this.fetchData();
        },
        error: xhr => {
          console.log(xhr);
          this.$message({ showClose: true, message: xhr.responseText, type: 'error' });
        }
      });
    }
  }
</script>
