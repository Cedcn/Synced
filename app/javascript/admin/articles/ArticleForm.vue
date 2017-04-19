<template>
  <div>
    <el-form ref="form" :model="article" label-width="80px" enctype="multipart/form-data" action='/admin/articles' method='post'>
      <el-row>
        <el-col :span=12>
          <el-form-item label="文章标题">
            <el-input name="article[title]" v-model="article.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=6>
          <el-form-item label="文章作者">
            <el-select v-model='article.author_id' filterable remote placeholder="搜索作者" :remote-method='searchAuthor' style='width: 100%'>
              <el-option v-for='author in authors' :key='author.id' :label='author.name || author.username' :value='author.id'></el-option>
            </el-select>
            <input type='hidden' name='article[author_id]' :value='article.author_id' >
          </el-form-item>
        </el-col>
        <el-col :span=6>
          <el-form-item label='合作作者'>
            <el-select v-model='article.cooperation_author_ids' filterable multiple disabled remote placeholder="搜索作者" :remote-method='searchAuthor' style='width: 100%'>
              <el-option
                v-for='author in authors'
                :key='author.id'
                :label='author.name || author.username'
                :value='author.id'>
              </el-option>
            </el-select>
            <input type='hidden' name='article[cooperation_author_ids]' :value='article.cooperation_author_ids' >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label='版权声明'>
            <el-radio label='original' name='article[copyright]' v-model='article.copyright' value=''>原创</el-radio>
            <el-radio label='translate' name='article[copyright]' v-model='article.copyright' value=''>编译</el-radio>
            <el-radio label='reproduce' name='article[copyright]' v-model='article.copyright' value=''>转载</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <input type='hidden' name='article[category_id]' :value='article.category_id'>
        <el-col :span=12>
          <el-form-item label='文章分类'>
            <el-radio-group v-model='main_category_id' name='main_category'>
              <el-radio :label='category.id' @click.native='choice(category, true)' :key='category.id' v-for='category in categories'>{{category.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show='sub_categories.length > 0'>
        <el-col :span=12>
          <el-form-item>
            <el-radio-group v-model='article.category_id' name='vice_category'>
              <el-radio :label='category.id' @click.native='choice(category)' :key='category.id' v-for='category in sub_categories'>{{category.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label='文章内容'>
            <textarea id="editor" class="editor" name='article[content]' v-model='article.content'/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=6>
          <el-form-item label='文章标签'>
            <el-select v-model='article.tag_list' multiple filterable remote placeholder="搜索Tag" :remote-method='searchTag' style='width: 100%'>
              <el-option v-for='tag in tags' :key='tag.name' :label='tag.name' :value='tag.name'></el-option>
            </el-select>
            <input type='hidden' name='article[tag_list]' :value='article.tag_list' >
          </el-form-item>
        </el-col>
        <el-col :span=6>
          <el-button @click='tagDialogVisible=true'>新增标签</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=6>
          <el-form-item label='文章图片'>
            <upload-single-image keyword='article[cover_image]' delete-keyword='article[_destroy]' :imageUrl="article.cover_image.url || ''"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item>
            <el-button type="primary" @click="submitArticle">预览</el-button>
            <el-button type="primary" @click="submitArticle('draft')">保存草稿</el-button>
            <el-button type="primary" @click="timepickerDialogVisible=true">定时发布</el-button>
            <el-button type="primary" @click="submitArticle('published')">立即发布</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <input type='hidden' v-model='article.publish_at' name='article[publish_at]'/>
      <el-dialog title='定时发送' v-model='timepickerDialogVisible' size='tiny' close='cancelPublishat'>
        <el-form-item label='时间选择'>
          <el-date-picker v-model='article.publish_at' type='datetime' placeholder='选择发布时间'></el-date-picker>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button @click="timepickerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitArticle('published')">确 定</el-button>
        </span>
      </el-dialog>
    </el-form>
    <el-dialog title='创建标签' v-model='tagDialogVisible' size='tiny'>
      <el-form ref='tag_form' action='/admin/tags' method='post'>
        <el-form-item label='标签名'>
          <el-input name='tag[name]'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitTag">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery';
import wangeditor from 'wangeditor';

import 'jquery-form';

const default_article = {
  title: '',
  copyright: 'original',
  publish_at: '',
  author_id: '',
  content: '',
  cooperation_author_ids: [],
  category_id: '',
  author: { id: '' },
  tag_list: [],
  cover_image: {}
}
export default {
  name: 'ArticleForm',
  mounted() {
    this.loadCategory();
    this.editor = new wangeditor('editor');
    this.editor.create();
  },
  props: {
    edit_article: {
      type: Object,
      default: function(){
        return default_article;
      }
    },
    closeEditArticle: {
      type: Function
    }
  },
  data() {
    return {
      editor: {},
      article: default_article,
      main_category_id: '',
      categories: [],
      sub_categories: [],
      timepickerDialogVisible: false,
      tagDialogVisible: false,
      authors: [],
      tags: [],
      article_url: '/admin/articles',
      category_url: '/admin/categories',
      author_url: '/admin/users',
      tag_url: '/admin/tags',
    };
  },
  computed: {
    isThisANewArticle() {
      return this.article.id == null;
    },
    postUrl() {
      return (this.isThisANewArticle ? '/admin/articles' : `/admin/articles/${this.article.id }`)
    }
  },
  methods: {
    initEditorContent() {
      this.editor.$txt.html(this.article.content);
    },
    cancelPublishat() {
      this.article.publish_at = '';
    },
    choice(category, is_main_category=false) {
      if (is_main_category) {
        this.sub_categories = category.sub_categories || [];
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
      this.main_category_id = category_id;
      if (category_id == null) {
        this.choice({}, true);
      }
      const v_this = this;
      this.categories.forEach(function(category){
        if (category_id == category.id) {
          v_this.main_category_id = category_id;
          return;
        };
        (category.sub_categories||[]).forEach(function(sub_category) {
          if (sub_category.id == category_id) {
            v_this.sub_categories = category.sub_categories || [];
            v_this.main_category_id = category.id;
            v_this.article.category_id = category_id;
          };
        });
      })
    },
    submitArticle(article_status) {
      const $form = $(this.$refs.form.$el);
      $form.ajaxSubmit({
        url: this.postUrl,
        method: this.isThisANewArticle ? 'POST' : 'PATCH',
        dataType: 'json',
        data: {
          'article[status]': article_status
        },
        success: () => {
          this.$message({ showClose: true, message: '保存成功' });
          this.closeEditArticle();
          this.timepickerDialogVisible = false;
        },
        error: (e) => {
          this.$message({ showClose: true, message: e.responseJSON.error, type: 'error' });
        }
      });
    },
    submitTag(){
      const $form = $(this.$refs.tag_form.$el);
      $form.ajaxSubmit({
        url: this.tag_url,
        dataType: 'json',
        success: () => {
          this.$message({ showClose: true, message: '添加成功' });
          this.tagDialogVisible = false;
        },
        error: (e) => {
          this.$message({ showClose: true, message: e.responseJSON.error, type: 'error' });
        }
      });
    },
    searchAuthor(text) {
      if (text !== '') {
        $.ajax({
          url: this.author_url,
          data: { 'q[name_or_username_cont]': text },
          dataType: 'json'
        }).done(data => {
          this.authors = data;
        });
      }
    },
    searchTag(text) {
      if (text !== '') {
        $.ajax({
          url: this.tag_url,
          data: { query: text },
          dataType: 'json'
        }).done(data => {
          this.tags = data;
        })
      }
    }
  },
  watch: {
    edit_article: function(val, oldval){
      this.article = val;
      if (this.article.author != null) {
        this.authors = [{ id: this.article.author.id, name: this.article.author.name || this.article.author.username }];
      }
      this.initEditorContent();
      this.setCurrentCategory();
      this.article.cooperation_author_ids = [];
    }
  }
}
</script>

<style lang='scss'>
  .editor {
    height: 380px;
    max-height: 500px;
  }
</style>
