import Vue from 'vue';
import ArticleList from './ArticleList.vue';
import ArticleForm from './ArticleForm.vue';

const articles = () => {
  const mountPoint = '#articles';
  new Vue({
    el: mountPoint,
    data: {
      isShowFormModal: false,
      edit_article: {},
      activeName: 'index'
    },
    components: {
      ArticleList,
      ArticleForm
    },
    methods: {
      tapClick(tab, event) {
        if (tab.name == 'index') this.$refs.articleList.refreshData();
      },
      editArticle(article) {
        this.edit_article = article;
        this.activeName = 'form';
      },
      closeEditArticle() {
        this.activeName = 'index';
      }
    }
  });
};

export default articles;
