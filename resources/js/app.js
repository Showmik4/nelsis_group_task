import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App); 
app.use(router);            
app.mount('#content');     