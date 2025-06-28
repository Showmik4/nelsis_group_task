import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App); 
app.use(router);            
app.mount('#content');     