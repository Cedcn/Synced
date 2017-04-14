<template>
  <el-table :data='articles' v-loading.body='isloading' stripe>
    <el-table-column prop='title' label='标题'/>
    <el-table-column label='作者'>
      <template scope='scope'>{{authorName(scope.row.author)}}</template>
    </el-table-column>
    <el-table-column prop='publish_at' label='发布时间'/>
    <el-table-column label='操作'>
      <template scope='scope'>
        <el-button size='small' type='success' @click='editArticle(scope.row)'>编辑</el-button>
        <el-button size='small' type='warning' @click='deleteArticle(scope.row)'>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
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

