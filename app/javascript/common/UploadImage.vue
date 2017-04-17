<template>
  <div class="upload-image">
    <div
      :class="`upload-image--item ${image.isDestroy ? 'destory' : ''} ${image.default ? 'default' : ''} ${!isEmpty(image) ? '' : 'item__add'}`"
      v-for="(image, index) in imagesData"
    >
      <template v-if="!isEmpty(image)">
        <a
          class="item--wrapper"
          href="javascript:;"
          :style="{ backgroundImage: `url(${image.file.url})` }"
          @click="() => editFileInput(index)"
        />
        <input :ref="`fileInput${index}`" :name="`${formSpace}[logos_attributes][${index}][file]`" type="file" @change="changeHandle" v-if="image.isChanged" />
        <input :ref="`fileInput${index}`" type="file" @change="changeHandle" v-else/>
        <input type='hidden' :name="`${formSpace}[logos_attributes][${index}][id]`" :value='image.id'>
        <input type='checkbox' :name="`${formSpace}[logos_attributes][${index}][_destroy]`" :checked='image.isDestroy'>
        <input type='hidden' :name="`${formSpace}[logos_attributes][${index}][default]`" :value='image.default ? 1 : 0' />
        <a class="item--delete__btn" href="javascript:;" @click="() => destroy(index)">
          <i class="iconfont icon-closed" />
        </a>
        <a class="item--default__btn" href="javascript:;" @click="() => setDefault(index)">
          设为默认
        </a>
      </template>
      <template v-else>
        <a class="item--wrapper" href="javascript:;" @click="() => addFileInput(index)">
          <i class="iconfont icon-plus" />
        </a>
        <input :ref="`fileInput${index}`" type="file" @change="changeHandle" />
      </template>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import { readImageFile } from './tool';
  import { concat, isEmpty, cloneDeep } from 'lodash';

  export default {
    name: 'uploadImage',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      formSpace: {
        type: String,
        default: 'partner'
      }
    },
    data() {
      return {
        newData: this.data.map(item => ({ ...item, isChanged: false, isDestroy: false })),
        changeStatus: 'add',
        currentIndex: 0,
        checks: []
      }
    },
    computed: {
      imagesData() {
        return concat(this.newData, [{}]);
      }
    },
    watch: {
      data: function() {
        this.newData = this.data.map(item => ({ ...item, isChanged: false, isDestroy: false }));
      }
    },
    methods: {
      changeHandle(e) {
        readImageFile(e).then(result => {
          const s = cloneDeep(this.newData);
          if(this.changeStatus === 'add') {
            s.push({ file : { url: result } });
            s[this.currentIndex].isNew = true;
            s[this.currentIndex].isChanged = true;
          }

          if (this.changeStatus === 'edit') {
            s[this.currentIndex].file.url = result;
            s[this.currentIndex].isChanged = true;
          }
          this.newData = s;
        })
      },
      triggerInput() {
        $(this.$refs[`fileInput${this.currentIndex}`]).trigger('click');
      },
      addFileInput(index) {
        this.currentIndex = index;
        this.changeStatus = 'add';
        this.triggerInput();
      },
      editFileInput(index) {
        this.currentIndex = index;
        this.changeStatus = 'edit';
        this.triggerInput();
      },
      isEmpty(v) {
        return isEmpty(v);
      },
      destroy(index) {
        const s = cloneDeep(this.newData);
        s[index].isDestroy = true;
        s[index].isChanged = true;
        this.newData = s;
      },
      setDefault(index) {
        const s = cloneDeep(this.newData);

        s.forEach(item => {
          item.default = false;
        });

        s[index].default = true;
        this.newData = s;
      }
    }
  }
</script>

<style lang='scss'>
  .upload-image {
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

      &.destory {
        display: none;
      }

      &.default {
        border-color: #20a0ff;
      }

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
