<template>
  <el-form ref="form" :model="eventFormData" label-width="80px">
    <el-form-item label="活动名称">
      <el-input name='event[name]' v-model="eventFormData.name"></el-input>
    </el-form-item>
    <el-form-item label="短标题">
      <el-input name='event[short_name]' v-model="eventFormData.short_name"></el-input>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-date-picker type="date" placeholder="选择日期" v-model="eventFormData.start_date" style="width: 100%;"></el-date-picker>
      <input type='hidden' :value='eventFormData.start_date' name='event[start_date]' />
    </el-form-item>
    <el-form-item label="结束时间">
      <el-date-picker name='event[end_date]' type="date" placeholder="选择日期" v-model="eventFormData.end_date" style="width: 100%;"></el-date-picker>
      <input type='hidden' :value='eventFormData.end_date' name='event[end_date]' />
    </el-form-item>
    <el-form-item label="活动详情">
      <el-input name='event[description]' type="textarea" v-model="eventFormData.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: {
      eventFormData: {
        type: Object,
        default() {
          return {
            start_date: '',
            end_date: ''
          }
        }
      }, closeModal: {
        type: Function
      }
    },
    computed: {
      url() {
        return this.isNewEvent() ? '/admin/events' : `/admin/events/${this.eventFormData.id}`
      },
      method() {
        return this.isNewEvent() ? 'post' : 'patch'
      }
    },
    methods: {
      isNewEvent() {
        return this.eventFormData.id == null;
      },
      onSubmit() {
        const $form = $(this.$refs.form.$el);
        $form.ajaxSubmit({
          url: this.url,
          method: this.method,
          success: () => {
            this.closeModal();
            this.$message({ showClose: true, message: '保存成功' });
          },
          error: xhr => {
            this.$message({ showClose: true, message: xhr.responseText, type: 'error' });
          }
        });
      }
    }
  }
</script>
