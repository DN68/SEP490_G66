import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "chart.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as jQuery from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery';
// Make jQuery available globally
window.jQuery = window.$ = jQuery;
createApp(App).use(router).mount('#app')
