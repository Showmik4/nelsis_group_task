import { createRouter,createWebHistory } from "vue-router";
import AddNew from './../crud/AddNew.vue';
import List from './../crud/List.vue';
import Edit from './../crud/Edit.vue';
import Login from './../auth/Login.vue';


const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'List', component: List, beforeEnter: requireAuth },
  { path: '/edit/:id', name: 'Edit', component: Edit, beforeEnter: requireAuth },
  { path: '/add-new', name: 'AddNew', component: AddNew, beforeEnter: requireAuth },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;