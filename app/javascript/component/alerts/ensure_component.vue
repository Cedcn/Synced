<template>
  <div id="ensure-modal" class="ensure-modal modal">
    <div class="modal-content">
      <h4>{{message}}</h4>
    </div>
    <div class="modal-footer">
      <a v-on:click="agree" class="modal-action modal-close btn-flat">确定</a>
      <a v-on:click="disAgree" class="modal-action modal-close btn-flat">取消</a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  mounted() {
  },
  data() {
    return {
      message: '你确定吗？',
      agreeFun() {},
      show: false
    };
  },
  methods: {
    open() {
      const v_this = this;
      $('.ensure-modal').modal({complete: function(){
        v_this.$destroy(true);
        v_this.$el.parentNode.removeChild(v_this.$el);
      }});
      $('.ensure-modal').modal('open');
    },
    agree() {
      this.agreeFun();
    },
    disAgree() {

    },
    destroyElement() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.show = false;
    }
  }
}
</script>

<style lang='scss'>
  .ensure-modal {
    width: 30%;
    min-height: 300px;
    top: 20%;
    .modal-content {
      min-height: 200px;
      display: flex;
      align-items: center;
    }
    .modal-footer {
      display: flex;
      justify-content: space-around;
      .btn-flat {
        width: 35%;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        padding: 0 5px;
        margin-left: 5px;
        text-align: center;
        border: 1px solid #00bcd4;
        &:hover {
          background-color: #00bcd4;
          color: white;
        }
      }
    }
  }
</style>
