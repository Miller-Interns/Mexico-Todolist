import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home-page.vue'
import ToDoPage from '../views/todo-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomePage,
    },

    {
      path: '/todo',
      name: 'todo',
      component: ToDoPage
    },

  ],
})

export default router
