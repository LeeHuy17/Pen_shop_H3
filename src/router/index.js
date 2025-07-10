import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import loginForm from '../components/loginForm.vue'
import registerForm from '../components/reGin.vue'
import CartPage from '../components/CartPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: loginForm
  },
  {
    path: '/register',
    name: 'register',
    component: registerForm
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router