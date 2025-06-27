import { createRouter,createWebHistory } from "vue-router";
import AddNew from './../crud/AddNew.vue';
import List from './../crud/List.vue';

const routes =[

     {path: '/add-new', name: 'AddNew', component: AddNew},
     {path: '/list', name: 'List', component: List}

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;