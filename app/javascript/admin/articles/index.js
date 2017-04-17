import Vue from 'vue';
import ArticleList from './ArticleList.vue';
import ArticleForm from './ArticleForm.vue';

const articles = () => {
  const mountPoint = '#articles';
  new Vue({
    el: mountPoint,
    data: {
      isShowFormModal: false,
      edit_article_id: '',
      activeName: 'second'
    },
    components: {
      ArticleList,
      ArticleForm
    },
    methods: {
      tapClick(tab, event) {
        console.log(tab, event);
      },
      editArticle(article) {
        this.isShowFormModal = true;
        this.edit_article_id = article.id;
      },
      closeEditArticle() {
        this.isShowFormModal = false;
      }
    }
  });
};

export default articles;
