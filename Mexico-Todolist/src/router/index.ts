import { createRouter, createWebHistory } from 'vue-router'
import { RouteNames } from './route-names'
import { RoutePaths } from './route-paths'

import HomePage from '../views/home-page.vue'
import TodoPage from '../views/todo-page.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: RoutePaths.HOME,
      name: RouteNames.HOME,
      component: HomePage,
    },
    {
      path: RoutePaths.TODO,
      name: RouteNames.TODO,
      component: TodoPage,
    },
  ],
})

export default router
