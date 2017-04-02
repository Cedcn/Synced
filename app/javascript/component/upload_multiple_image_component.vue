<template>
  <div class='multiple_image_upload'>
    <div v-for='(image, index) in image_data'>
      <upload_image_component :url='image.file.url' :name_prefix='imagePrefix(index)' :afterFileChange='afterFileChange' :class='{ default: image.default }'>
        <div class='btn' v-on:click='clickDefaultBtn(index, $event)'>设为默认</div>
        <input class='default_input' type='hidden' :name="imagePrefix(index)+ '[default]'" :value='image.default ? 1 : 0'/>
        <input type='hidden' :name="imagePrefix(index) + '[id]'" :value='image.id'>
      </upload_image_component>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import upload_image_component from './upload_image_component.vue';
export default {
  name: 'upload_multiple_image_component',
  components: {
    upload_image_component
  },
  props: {
    name_prefix: {
      type: String
    },
    start_index: {
      type: Number,
      default: 0
    },
    limit_count: {
      type: Number,
      default: 100
    },
    images: {
      type: Array,
      default: [{}]
    }
  },
  mounted() {
    this.image_data = this.images.map(e => {
      return JSON.parse(e);
    });
    this.image_data.push({file: {url: '', default: false}});
  },
  data() {
    return { image_data: [] };
  },
  methods: {
    clickDefaultBtn(index, event){
      this.image_data.forEach((image, index) => {
        this.image_data[index].default = false;
      });
      this.image_data[index].default = true;
    },
    imagePrefix(current_index) {
      return `${this.name_prefix}[${current_index}]`;
    },
    afterFileChange($file_input, $child) {
      const current_index = $('.upload_image_item').index($child);
      if (current_index != (this.image_data.length - 1)) return;
      if (this.image_data.length >= this.limit_count) return;
      this.image_data.push({file: {url: '', default: false}});
    }
 }
}
</script>

<style lang='scss'>
.multiple_image_upload {
  display: flex;
  flex-wrap: wrap;
  .default{
    background: #e0e0e0;
  }
}
</style>
