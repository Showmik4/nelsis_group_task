import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App); 
app.use(router);            // use router on the app instance
app.mount('#content');      // mount the app