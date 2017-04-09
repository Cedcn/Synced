<template>
  <div class='loading-background'>
    <div class='loading-container'>
      <div class="preloader-wrapper big active">
        <div class="spinner-layer">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
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
    };
  },
  methods: {
    close() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}
</script>

<style lang='scss'>
.loading-background {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);;
  position: fixed;
  top: 0px;
  left: 0px;
  .loading-container {
    position: fixed;
    width: 80px;
    height: 80px;
    background-color: white;
    top: 50%;
    left: 0;
    right: 0;
    margin: 5px auto;
    z-index: 1003;
    border-radius: 5px;
    display: flex;
    opacity: 1;
    align-items: center;
    justify-content: center;
    .spinner-layer {
      border-color: #00bcd4;
    }
  }
}
</style>
