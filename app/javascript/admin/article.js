import $ from 'jquery';
import Vue from 'vue/dist/vue.js';
import articles_list from './articles/articles_list.vue';
import article_form from './articles/article_form.vue';
import { showMessage } from '../common/tool';

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
      destroyArticle() {
        const article = this.articles[index];
        $.ajax({
          url: '/admin/articles',
          action: 'DELETE',
          data: { id: article.id },
          dataType: 'json'
        }).done( () =>{
          this.refreshData();
          console.log('loading need here');
        })
      }
    }
  });
};

export default article;
