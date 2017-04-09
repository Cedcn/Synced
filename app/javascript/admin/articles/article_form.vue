<template>
  <div class="article_new">
    <div class="new-header">
      <div class="navbar-fixed">
        <nav class="nav-wrapper cyan">
          <div class="row">
            <div class="col s3">
              <div class="btn-floating waves-effect waves-light white" v-on:click="$emit('close')">
                <i class="material-icons">keyboard_arrow_left</i>
              </div>
            </div>
            <div class="col s1 offset-s5">
              <div class="btn">预览</div>
            </div>
            <div class="col s1">
              <div class="btn" v-on:click="submitArticle('draft')">保存草稿</div>
            </div>
            <div class="col s1">
              <div class="btn" v-on:click="submitArticle('publishing')">定时发布</div>
            </div>
            <div class="col s1">
              <div class="btn" v-on:click="submitArticle('published')">立即发布</div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="new-container">
      <div class="form_container">
        <form enctype="multipart/form-data" id="new_article_form">
          <input :value="article.id" name="article[id]" type="hidden" />
          <div class="row">
            <div class="input-field col s12"><label for="title">文章标题(70字以内)</label><input id="title" name="article[title]" type="text" v-model="article.title" /></div>
          </div>
          <div class="row">
            <div class="input-field col s5">
              <select name="article[user_id]">
                <option value="08c0ad5d-28d6-40e9-8c7d-0b02d4f8e016"></option>
              </select>
              <label>第一作者(显示在标题后面)</label>
            </div>
            <div class="input-field col s5 offset-s2">
              <select>
                <option value="08c0ad5d-28d6-40e9-8c7d-0b02d4f8e016"></option>
              </select>
              <label>联合作者(显示在文末)</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <label for="description">摘要(140字以内)</label>
              <input name="article[description]" type="text" v-model="article.description" />
            </div>
          </div>
          <div class="row copy-right-radio" id='abc'>
            <div class="col s12">
              <label>版权声明：</label>
              <div class="radio-item"><input id="original" name="article[copyright]" type="radio" v-model="article.copyright" value="original" /><label for="original">原创</label></div>
              <div class="radio-item"><input id="translate" name="article[copyright]" type="radio" v-model="article.copyright" value="translate" /><label for="translate">编译</label></div>
              <div class="radio-item"><input id="reproduce" name="article[copyright]" type="radio" v-model="article.copyright" value="reproduce" /><label for="reproduce">转载</label></div>
            </div>
          </div>
          <div class="row">
            <div class="col s12"><label>版权内容:</label><textarea class="materialize-textarea" name="article[copyright_content]" v-model="article.copyright_content"></textarea></div>
          </div>
          <div class="row">
            <div class="col s12"><label>查看要求:</label><textarea class="materialize-textarea" name="article[check_content]" v-model="article.check_content"></textarea></div>
          </div>
          <div class="row category-radio" id='ab'>
            <div class="col s12">
              <label>频道：</label>
              <div class="radio-item" v-for='(category, index) in categories'>
                <input :id='category.id' name="article_main_category" type="radio" :value="main_category_id"/>
                <label :for='category.id' v-on:click='choice(category)'>{{category.title}}</label>
              </div>
            </div>
            <div class="col s12">
              <div class="radio-item" v-for='(category, index) in sub_categories'>
                <input :id='category.id' name="article_sub_category" type="radio" :value="article.category_id"/>
                <label :for='category.id' v-on:click='choice(category)'>{{category.title}}</label>
              </div>
            </div>
          </div>
          <div class="row">
            <upload_image_component :config="{ destroy_btn: false, file_key: 'cover', temp: true }" :name_prefix="'article'" :url="(article.cover||{}).url"></upload_image_component>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import upload_image_component from 'component/upload_image_component.vue';

export default {
  name: 'article_form',
  components: {
    upload_image_component
  },
  mounted() {
    $('select').material_select();
    this.loadCategory();
  },
  updated() {
  },
  props: {
    edit_article: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      article: {},
      copyright_contents: {
        original: '本文由机器之心原创出品，版权归作者所有，转载请查看要求，机器之心对于违规侵权者保有法律追诉权。',
        translate: '本文由机器之心编译出品，原文来自quantamagazine，作者Ferris Jabr，转载请查看要求，机器之心对于违规侵权者保有法律追诉权。',
        reproduce: '本文由机器之心经授权转载自饶毅鲁白谢宇三位科学家主编的微信公号《知识分子》（ID：the-intellectual），禁止二次转载。'
      },
      category_url: '/admin/categories',
      main_category_id: '',
      categories: [],
      sub_categories: []
    };
  },
  computed: {
    isThisANewArticle(){
      return this.edit_article.id == null;
    },
    postUrl() {
      return (this.isThisANewArticle ? '/admin/articles' : `/admin/articles/${this.edit_article.id }`)
    }
  },
  methods: {
    choice(category){
      if ((category.sub_categories || []).length > 0) {
        this.sub_categories = category.sub_categories;
      }
      this.article.category_id = category.id;
    },
    loadCategory() {
      $.ajax({
        url: this.category_url,
        type: 'GET',
        dataType: 'json'
      }).done( (data) => {
        this.categories = data;
      });
    },
    setCurrentCategory(){
      const category_id = this.article.category_id;
      if (category_id == null) return;
      this.categories.each(function(category){
        if (category_id == category.id) {
          this.main_category_id == category_id;
        };
        category.sub_categories.each(function(sub_categroy) {
          if (sub_category.id == category_id) { this.main_category_id == category_id };
        });
      })
    },
    submitArticle(article_status) {
      const form_data = new FormData($('#new_article_form')[0]);
      form_data.append('article[status]', article_status);
      $.ajax({
        url: this.postUrl,
        type: this.isThisANewArticle ? 'POST' : 'PATCH',
        data: form_data,
        processData: false,
        contentType: false,
        dataType: 'json'
      }).done( () => {
        this.$emit('edit-success');
      }).fail(xhr => {
        if (xhr.status === 422) {
          alert(xhr.responseJSON.error);
        } else {
          alert('something wrong');
        }
      });
    },
  },
  watch: {
    'edit_article': function(){
      if (this.isThisANewArticle) {
        this.article = {
          copyright: '',
          check_content: '网站转载请在文章开头粗体注明：本文转载自机器之心，标明作者，并附上本文链接\n' +
                         '微信公众号转载请在开头粗体注明：本文转载自机器之心，标明作者，并设置阅读原文链接为本文链接，微博转载请附上本文链接并@机器之心synced。\n' +
                         '网站和微信转载具体文章后需来信至邮箱operation@jiqizhixin.com说明，备注转载文章标题、转载的微信号名称和转载日期。\n' +
                         '机器之心只接受如上几种转载方式，其余均视为侵权，如需商业合作请致信bd@jiqizhixin.com。'
        }
      } else {
        this.article = this.edit_article;
      }
    },
    'article.copyright': function () {
      if (this.isThisANewArticle) {
        this.article.copyright_content = this.copyright_contents[this.article.copyright];
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
