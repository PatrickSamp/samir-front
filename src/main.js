import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'font-awesome/css/font-awesome.css'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify'
import router from './config/routes/router'

export default {
  data () {
    return {
      headers: {
        frameOptions: 'deny',
      },
    };
  },
};

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

import VueMask from 'v-mask';
Vue.use(VueMask);

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin

Vue.use(IconsPlugin)


Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')

