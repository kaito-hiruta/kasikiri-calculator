// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import VueScrollTo from 'vue-scrollto'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import FIRE_BASE_CONFIG from '../config/local.env.js'

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(VueScrollTo)

Vue.config.productionTip = false

const config = {
  apiKey: FIRE_BASE_CONFIG.FIRE_BASE.API_KEY,
  authDomain: FIRE_BASE_CONFIG.FIRE_BASE.AUTH_DOMAIN,
  databaseURL: FIRE_BASE_CONFIG.FIRE_BASE.DATABASE_URL,
  projectId: FIRE_BASE_CONFIG.FIRE_BASE.PROJECT_ID,
  storageBucket: FIRE_BASE_CONFIG.FIRE_BASE.STORAGE_BUCKET,
  messagingSenderId: FIRE_BASE_CONFIG.FIRE_BASE.MESSAGING_SENDERID
}

firebase.initializeApp(config)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
