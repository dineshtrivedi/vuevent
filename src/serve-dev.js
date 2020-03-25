import Vue from 'vue';
import App from './App.vue'

import { GlobalEvents } from './plugin'

Vue.config.productionTip = false;

Vue.use(GlobalEvents)

new Vue({
  render: (h) => h(App),
}).$mount('#app');
