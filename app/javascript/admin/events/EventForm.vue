<template>
  <el-form ref="form" :model="eventFormData" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="eventFormData.name"></el-input>
    </el-form-item>
    <el-form-item label="短标题">
      <el-input v-model="eventFormData.short_name"></el-input>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-date-picker type="date" placeholder="选择日期" v-model="eventFormData.start_date" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-date-picker type="date" placeholder="选择日期" v-model="eventFormData.end_date" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动详情">
      <el-input type="textarea" v-model="eventFormData.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: ['eventFormData', 'closeModal'],
    methods: {
      onSubmit() {
        console.log('save');
      }
    }
  }
</script>
