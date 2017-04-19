<template>
  <el-table :data='articles' v-loading.body='isloading' stripe>
    <el-table-column prop='title' label='标题'/>
    <el-table-column label='作者'>
      <template scope='scope'>{{authorName(scope.row.author)}}</template>
    </el-table-column>
    <el-table-column label='标签'>
      <template scope='scope'>{{scope.row.tag_list.join()}}</template>
    </el-table-column>
    <el-table-column prop='publish_at' label='发布时间'>
      <template scope='scope'>{{publish_at(scope.row.publish_at)}}</template>
    </el-table-column>
    <el-table-column label='状态'>
      <template scope='scope'>{{article_status(scope.row.status)}}</template>
    </el-table-column>
    <el-table-column label='操作'>
      <template scope='scope'>
        <el-button size='small' type='success' @click='editArticle(scope.row)'>编辑</el-button>
        <el-button size='small' type='warning' @click='deleteArticle(scope.row)'>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ArticleList',
  props: {
    editArticle: {
      type: Function
    }
  },
  mounted() {
    this.refreshData();
  },
  data() {
    return {
      articles: [],
      isloading: false
    };
  },
  methods: {
    deleteArticle(article){
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isloading = true;
        $.ajax({
          url: `/admin/articles/${article.id}`,
          type: 'DELETE',
          dataType: 'json'
        }).done(() => {
          this.$message({ type: 'success', showClose: true, message: '删除成功' });
          this.refreshData();
        }).always(()=> {
          this.isloading = false;
        })
      }).catch(() => {});
    },
    authorName(user) {
      if (user == null) return '';
      return user.username || user.name;
    },
    publish_at(time_string) {
      return moment(time_string).format('MM-DD HH:mm');
    },
    article_status(status) {
      return { draft: '草稿', published: '已发布' }[status];
    },
    refreshData() {
      this.isloading = true;
      $.ajax({
        url: '/admin/articles',
        data: {},
        dataType: 'json'
      }).done(data => {
        this.articles = data;
      }).always(() => {
        this.isloading = false;
      });
    }
  }
}
</script>

<style lang='scss'>

</style>

