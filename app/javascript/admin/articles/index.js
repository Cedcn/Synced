import $ from 'jquery';
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
      show_form: false
    },
    components: {
      ArticleList,
      ArticleForm
    },
    methods: {
      editArticle(article) {
        this.edit_article = article;
        this.show_form = true;
      },
      closeEditArticle() {
        this.show_form = false;
        this.$refs.articleList.refreshData();
      }
    },
    computed: {
      article_form_height() {
        return this.show_form ? `${$('.article-form').height()}px` : 'auto';
      }
    }
  });
};

export default articles;
