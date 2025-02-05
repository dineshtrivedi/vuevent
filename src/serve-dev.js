import Vue from 'vue';
import App from './App.vue'

import { Vuevent } from './plugin'

Vue.config.productionTip = false;

Vue.use(Vuevent)

new Vue({
  render: (h) => h(App),
}).$mount('#app');
