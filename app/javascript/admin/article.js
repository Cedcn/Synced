import $ from 'jquery';
import Vue from 'vue/dist/vue.js';
import upload_image_component from '../component/upload_image_component.vue';

const article = () => {
  $('select').material_select();
  new Vue({
    el: '#article_index',
    components: {
      upload_image_component
    },
    data: {
      articles: [],
      show_new: false,
      article: {
        copyright: '',
        check_content: '网站转载请在文章开头粗体注明：本文转载自机器之心，标明作者，并附上本文链接\n' +
                       '微信公众号转载请在开头粗体注明：本文转载自机器之心，标明作者，并设置阅读原文链接为本文链接，微博转载请附上本文链接并@机器之心synced。\n' +
                       '网站和微信转载具体文章后需来信至邮箱operation@jiqizhixin.com说明，备注转载文章标题、转载的微信号名称和转载日期。\n' +
                       '机器之心只接受如上几种转载方式，其余均视为侵权，如需商业合作请致信bd@jiqizhixin.com。'
      },
      copyright_contents: {
        original: '本文由机器之心原创出品，版权归作者所有，转载请查看要求，机器之心对于违规侵权者保有法律追诉权。',
        translate: '本文由机器之心编译出品，原文来自quantamagazine，作者Ferris Jabr，转载请查看要求，机器之心对于违规侵权者保有法律追诉权。',
        reproduce: '本文由机器之心经授权转载自饶毅鲁白谢宇三位科学家主编的微信公号《知识分子》（ID：the-intellectual），禁止二次转载。'
      }
    },
    watch: {
      'article.copyright': function () {
        if (this.article.id == null) {
          this.article.copyright_content = this.copyright_contents[this.article.copyright];
        }
      }
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
          this.articles = data;
        });
      },
      show_new_page() {
        this.show_new = true;
      },
      submitArticle(article_status) {
        const form_data = new FormData($('#new_article_form')[0]);
        form_data.append('article[status]', article_status);
        $.ajax({
          url: '/admin/articles',
          type: 'POST',
          data: form_data,
          processData: false,
          contentType: false,
          dataType: 'json'
        }).success(article => {
          this.articles.shift(article);
        }).fail(xhr => {
          if (xhr.status === 422) {
            alert(xhr.responseJSON.error);
          } else {
            alert('something wrong');
          }
        });
      }
    }
  });
};

export default article;
