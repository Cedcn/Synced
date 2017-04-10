import Vue from 'vue/dist/vue.js';
const EnsureAlertConstructor = Vue.extend(require('./ensure_component.vue'));

const ensureAlert = config => {
  const alertModal = new EnsureAlertConstructor({ data: config });
  alertModal.id = 'alertModal';
  alertModal.vm = alertModal.$mount();
  document.body.appendChild(alertModal.vm.$el);
  alertModal.dom = alertModal.vm.$el;
  alertModal.open();
};

export default ensureAlert;
