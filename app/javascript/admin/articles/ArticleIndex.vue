<template>
  <article-list/>
</template>

<script>
import $ from 'jquery';
import ArticleList from './ArticleList.vue';

export default {
  name: 'ArticleIndex',
  components: {
    ArticleList,
  },
  props: {
    editArticle: {
      type: Function,
      default: function() {},
      require: true
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    test() {
      console.log('abc');
    }
  }
};
</script>
