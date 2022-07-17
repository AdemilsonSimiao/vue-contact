import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.css";
import "../src/style.css";



createApp(App).use(store).use(router).mount('#app')
