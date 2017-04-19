<template>
  <div class='upload-single-image'>
    <div :class="`upload-image--item ${!isEmpty(backgroundImage) ? '' : 'item__add'}`">
      <a class='item--wrapper' href='javascript:;' :style="{ backgroundImage: `url(${backgroundImage})` }" @click='triggerInput'>
        <i class="iconfont icon-plus" v-show='isEmpty(backgroundImage)' />
      </a>
      <input ref='fileInput' :name='keyword' type='file' @change='changeHandle'/>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import { readImageFile } from './tool';
  import { isEmpty, cloneDeep } from 'lodash';

  export default {
    name: 'UploadSingleImage',
    props: {
      keyword: {
        type: String,
        default: ''
      },
      'delete-keyword': {
        type: String,
        default: ''
      },
      imageUrl: {
        type: String
      }
    },
    data() {
      return {
        backgroundImage: '',
        isDestroy: false
      }
    },
    methods: {
      changeHandle(e) {
        readImageFile(e).then(result => {
          this.backgroundImage = result;
        })
      },
      triggerInput() {
        $(this.$refs.fileInput).trigger('click');
      },
      isEmpty(v) {
        return isEmpty(v);
      },
      destroy() {
        this.backgroundImage = '';
        this.isDestroy = true;
      }
    },
    watch: {
      imageUrl: function(val) {
        this.backgroundImage = val;
      }
    }
  }
</script>

<style lang='scss'>
  .upload-single-image {
    display: flex;
    flex-wrap: wrap;

    input[type="file"],
    input[type="checkbox"] {
      display: none;
    }

    .upload-image--item {
      position: relative;
      display: inline-block;
      line-height: 0;
      width: 120px;
      height: 120px;
      margin-right: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      overflow: hidden;
      &:hover {
        border-color: #6c6c6c;

        .item--delete__btn,
        .item--default__btn {
          display: block;
        }
      }

      .item--delete__btn {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 25px;
        height: 25px;
        line-height: 25px;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        text-align: center;
      }

      .item--default__btn {
        display: none;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        line-height: 25px;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
      }
    }

    .item__add {
      position: relative;
      background-color: #eee;
      border-style: dashed;

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
      background-size: 90%;
      background-position: center;
    }
  }
</style>
