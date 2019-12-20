import Vue from 'vue';
import store from './libs/store.js';
import routes from './libs/routes.js';
import VueRouter from 'vue-router';
import App from './App.vue';
Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  saveScrollPosition: true,
  routes: routes
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')