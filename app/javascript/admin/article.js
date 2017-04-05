import $ from 'jquery';
import Vue from 'vue/dist/vue.js';

const article = () => {
  $('select').material_select();
  new Vue({
    el: '#article_index',
    data: {
      articles: [],
      show_new: true,
      article: {username: ''}
    },
    mounted() {
      this.load_data();
    },
    methods: {
      load_data() {
        $.ajax({
          url: '/admin/articles',
          data: {},
          dataType: 'json'
        }).done(data => {
          console.log(data);
          this.articles = data;
        })
      },
      show_new_page() {
        this.show_new = true;
      },
      submitArticle() {
        const form_data = new FormData($('#new_article_form')[0]);
        $.ajax({
          url: '/admin/articles',
          type: 'POST',
          data: form_data,
          processData: false,
          contentType: false,
          dataType: 'json'
        }).done(data => {
          console.log(data);
        }).fail((xhr) => {
          if (xhr.status === 422) {
            alert(xhr.responseJSON.error);
          } else {
            alert('something wrong');
          }
        });
      }
    }
  });
}

export default article;
