<template>
  <el-row>
    <div class='wrapper--title'>
      <span>文章管理</span>
    </div>
    <div class="wrapper--header">
      <el-button type="primary" icon="plus" @click="openFormModal('new', { name: '', url: '', logos: [] })">添加文章</el-button>
    </div>
    <article-list/>
  </el-row>
</template>

<script>
import $ from 'jquery';
import ArticleList from './ArticleList.vue';

export default {
  name: 'ArticleIndex',
  components: {
    ArticleList,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
};
</script>
