import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/src/jquery.js'
// import 'bootstrap/dist/js/bootstrap.min.js'

import router from './router'


const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')