import Vue from 'vue';
import ArticleIndex from './ArticleIndex.vue';

const articles = () => {
  const mountPoint = '#articles';
  new Vue({
    el: mountPoint,
    render: h => h(ArticleIndex)
  });
};

export default articles;

