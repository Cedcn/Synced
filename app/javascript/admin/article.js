import $ from 'jquery';
import Vue from 'vue/dist/vue.js';
import articles_list from './articles/articles_list.vue';
import article_form from './articles/article_form.vue';
import ensureAlert from '../component/alerts/alert';

const article = () => {
  new Vue({
    el: '#article_index',
    components: {
      articles_list,
      article_form
    },
    data: {
      articles: [],
      show_new: false,
      edit_article: {}
    },
    watch: {
      'article.copyright': function () {
        if (this.article.id == null) {
          this.article.copyright_content = this.copyright_contents[this.article.copyright];
        }
      }
    },
    mounted() {
      this.refreshData();
    },
    methods: {
      refreshData() {
        this.hidden_new_page();
        $.ajax({
          url: '/admin/articles',
          data: {},
          dataType: 'json'
        }).done(data => {
          this.articles = data;
        });
      },
      show_new_page() {
        this.show_new = true;
      },
      hidden_new_page() {
        this.show_new = false;
      },
      editArticle(article) {
        this.edit_article = article;
        this.show_new_page();
      },
      destroyArticle(article) {
        const v_this = this;
        ensureAlert({
          message: '你确定删除吗？',
          agreeFun() {
            $.ajax({
              url: `/admin/articles/${article.id}`,
              type: 'DELETE',
              dataType: 'json'
            }).done(() => {
              v_this.refreshData();
            }).fail(() => {

            }).always(() => {

            });
          }
        });
      }
    }
  });
};

export default article;
