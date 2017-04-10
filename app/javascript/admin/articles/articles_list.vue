<template>
  <div class='wrapper-content'>
    <table>
      <thead>
        <tr>
          <th>
            标题
          </th>
          <th>
            作者
          </th>
          <th>
            发布时间
          </th>
          <th>
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class='striped' v-for='(article, index) in articles'>
          <td>{{ article.title }}</td>
          <td>{{ (article.author || {}).username }}</td>
          <td>{{ article.pulished_at }}</td>
          <td>
            <a v-on:click='notifyEditArticle(article)'>编辑</a>
            <a v-on:click='notifyDestroyArticle(article)'>删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'articles_list',
  props: {
    articles: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  methods: {
    notifyEditArticle(article) {
      this.$emit('edit-article', article);
    },
    notifyDestroyArticle(article) {
      this.$emit('destroy-article', article);
    }
  }
}
</script>

<style lang='scss'>

</style>
