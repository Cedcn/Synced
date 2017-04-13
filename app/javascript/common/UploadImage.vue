<template>
  <div class="upload-image">
    <div class="upload-image--item" v-for="(image, index) in data">
      <a
        class="item--wrapper"
        href="javascript:;"
        :style="{ backgroundImage: `url(${image.file.url})` }"
        @click="() => editFileInput(index)"
      />
      <input :name="`${formSpace}[files][${index}]`" type="hidden" v-model="image.file.url" />
    </div>
    <a class="upload-image--item item__add" href="javascript:;" @click="addFileInput">
      <i class="iconfont icon-plus" />
    </a>
    <input ref="fileInput" type="file" @change="changeHandle" />
  </div>
</template>

<script>
  import $ from 'jquery';
  import { readFile } from './tool';

  export default {
    name: 'uploadImage',
    data() {
      return {
        changeStatus: 'add',
        inputIndex: 0,
      }
    },
    props: {
      data: {
        type: Array,
        default: () => []
      },
      formSpace: {
        type: String,
        default: 'partners'
      }
    },
    methods: {
      changeHandle(e) {
        readFile(e, result => {
          if (result === '') return;

          if(this.changeStatus === 'add') {
            this.data.push({ file : { url: result } });
          }

          if (this.changeStatus === 'edit') {
            this.data[this.inputIndex].file.url = result;
          }
        })
      },
      triggerInput() {
        $(this.$refs.fileInput).trigger('click');
      },
      addFileInput() {
        this.changeStatus = 'add';
        this.triggerInput();
      },
      editFileInput(index) {
        this.inputIndex = index;
        this.changeStatus = 'edit';
        this.triggerInput();
      }

    }
  }
</script>

<style lang='scss'>
  .upload-image {
    display: flex;
    flex-wrap: wrap;

    input[type="file"] {
      display: none;
    }

    .upload-image--item {
      display: inline-block;
      line-height: 0;
      width: 120px;
      height: 120px;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .item__add {
      position: relative;
      background-color: #eee;

      .iconfont {
        position: absolute;
        font-size: 30px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ababab;
      }
    }

    .item--wrapper {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      border: 1px solid #ddd;
      background-size: 90%;
      background-position: center;
      border-radius: 5px;

      &:hover {
        border-color: #20a0ff;
      }
    }
  }
</style>
