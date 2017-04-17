<template>
  <el-form
  ref="form"
  :model="article"
  label-width="80px"
  enctype="multipart/form-data"
  action='/admin/articles'
  method='post'
  id='new_article_form'
  >
    <el-row>
      <el-col :span=12>
        <el-form-item label="文章标题">
          <el-input name="article[title]" v-model="article.title"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=12>
        <el-form-item label='摘要（140字以内）'>
          <el-input type='textarea' name="article[description]" v-model="article.description"></el-input>
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
      <el-form-item>
        <el-date-picker
        v-model="article.publish_at"
        type="datetime"
        placeholder="选择发布时间"
        >
        </el-date-picker>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="timepickerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitArticle('published')">确 定</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import $ from 'jquery';
import 'jquery-form';

export default {
  name: 'ArticleForm',
  components: {  },
  mounted() {
    this.loadCategory();
  },
  props: {
    article_id: {
      type: String
    }
  },
  data() {
    return {
      article: {
        copyright: 'original',
        publish_at: ''
      },
      category_url: '/admin/categories',
      main_category_id: '',
      categories: [],
      sub_categories: [],
      timepickerDialogVisible: false
    };
  },
  computed: {
    isThisANewArticle(){
      return this.article_id == null;
    },
    postUrl() {
      return (this.isThisANewArticle ? '/admin/articles' : `/admin/articles/${this.article_id }`)
    }
  },
  methods: {
    cancelPublishat() {
      this.article.publish_at = '';
    },
    choice(category) {
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
      const $form = $(this.$refs.form.$el);
      $form.ajaxSubmit({
        url: '/admin/articles',
        method: 'POST',
        dataType: 'json',
        data: {
          'article[status]': article_status
        },
        success: () => {
          this.$message({ showClose: true, message: '保存成功' });
        },
        error: (e) => {
          this.$message({ showClose: true, message: e.responseJSON.error, type: 'error' });
        }
      });
    },
  },
  watch: {
  }
}
</script>

<style lang='scss'>
</style>

