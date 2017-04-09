import Vue from 'vue/dist/vue.js';
const LoadingConstructor = Vue.extend(require('./loading_component.vue'));

let alertModal;
const LoadingView = config => {
  alertModal = new LoadingConstructor({ data: config });
  alertModal.id = 'alertModal';
  alertModal.vm = alertModal.$mount();
  document.body.appendChild(alertModal.vm.$el);
  alertModal.dom = alertModal.vm.$el;
};

LoadingView.show = () => {
  LoadingView();
};

LoadingView.close = () => {
  alertModal.close();
};

export default LoadingView;
