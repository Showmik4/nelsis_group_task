import { createRouter,createWebHistory } from "vue-router";
import AddNew from './../crud/AddNew.vue';
import List from './../crud/List.vue';
import Edit from './../crud/Edit.vue';

const routes =[
     {path: '/add-new', name: 'AddNew', component: AddNew},
     {path: '/', name: 'List', component: List},
     { path: '/edit/:id', name: 'Edit', component: Edit },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;