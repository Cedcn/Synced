<template>
  <div class='upload_image_item'>
    <img :src='file_url' :class='{ be_delete: delete_checked }'/>
    <div class='upload_input'>
      <input type='file' :name='file_name' v-on:change='displayImage'/>
      <div class='btn' v-on:click='clickChangeImage' v-show='upload_config.add_btn && !delete_checked'>{{image_blank ? '添加' : '替换'}}</div>
      <div class='btn' v-on:click='clickDeleteImage' v-show='upload_config.destroy_btn && !image_blank'>{{delete_checked? '取消删除' : '删除'}}</div>
      <input class='delete_input' type='checkbox' :name='delete_name' value='1' />
      <template v-if='upload_config.temp || !image_blank'><slot></slot></template>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'upload_image_component',
  props: {
    name_prefix: {
      type: String,
      require: true
    },
    url: {
      type: String,
      default: ''
    },
    afterFileChange: {
      type: Function,
      default: function(){}
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      file_url: this.url,
      delete_checked: false
    };
  },
  watch: {
    'url': function(){
      this.file_url = this.url || '';
    }
  },
  computed: {
    upload_config() {
      const default_config = { add_btn: true, destroy_btn: true, file_key: 'file' };
      const merged_config = Object.assign({}, default_config, this.config);
      return merged_config;
    },
    image_blank() {
      return this.file_url.length == 0;
    },
    file_name() {
      return this.name_prefix + `[${this.upload_config.file_key}]`;
    },
    delete_name() {
      return this.name_prefix + '[_destroy]';
    }
  },
  methods: {
    clickChangeImage(event) {
      const $button = $(event.target);
      $button.siblings("input[type='file']").trigger('click');
    },
    clickDeleteImage(event) {
      const $delete_input = $(event.target).siblings('.delete_input');
      this.delete_checked = !this.delete_checked;
      $delete_input.prop('checked', this.delete_checked);
    },
    displayImage(event) {
      const $file_input = $(event.target);
      const $this = this;
      this.afterFileChange($file_input[0], this.$el);
      this.readInputFile($file_input[0], file_url => {
        $this.file_url = file_url;
      });
    },
    readInputFile(input, complete) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          complete(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
</script>

<style lang='scss'>
.upload_image_item{
  width: 120px;
  height: 120px;
  position: relative;
  overflow: hidden;
  img {
    margin: 10px;
    width: 100px;
    height: 100px;
  }
  input {
    display: none;
  }
  &:hover {
    .upload_input {
      top: 0;
    }
  }
  .upload_input {
    width: 120px;
    height: 120px;
    position: absolute;
    top: -200px;
    left: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    transition: all 0.3s ease;
    .btn {
      width: 80px;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      padding: 2px;
    }
  }
}
.be_delete {
  opacity: 0.5;
}
</style>
