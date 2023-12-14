import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "chart.js";
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  jQuery from 'jquery';
// Make jQuery available globally
window.jQuery = window.$ = jQuery;


createApp(App).use(router).mount('#app')
