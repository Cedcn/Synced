import $ from 'jquery';
import Vue from 'vue';
import { clickAtOrigin } from './tool';

const load_search_component = () => {
  Vue.component('search_input', {
    template:
      "<div class='search_util'>" +
        "<input type='text' v-on:input='search' v-on:focus='search' placeholder='搜索添加合作伙伴'/>" +
        "<div class='search_result collection'>" +
          "<a class='btn collection-item' v-for='item, index in search_result' :data-id='item.id' v-on:click='clickResult(item)'>" +
            '<span>{{item.name}}</span>' +
          '</a>' +
        '</div>' +
      '</div>',
    mounted() {
      clickAtOrigin($(this.$el), this.emptySearchResult);
    },
    props: {
      search_url: {
        type: String,
        require: true
      },
      query_key: {
        type: String,
        require: true
      },
      whenClickResult: {
        type: Function,
        require: true
      }
    },
    data() {
      return {
        search_result: []
      };
    },
    methods: {
      emptySearchResult() {
        this.search_result = [];
      },
      clickResult(event) {
        this.whenClickResult(this.$el, event);
      },
      search(event) {
        const target = $(event.target);
        const text = target.val();
        const v_this = this;
        $.ajax({
          url: v_this.search_url,
          data: { [v_this.query_key]: text },
          dataType: 'json'
        }).done(data => {
          v_this.search_result = data;
        });
      }
    }
  });
};

export default load_search_component;
