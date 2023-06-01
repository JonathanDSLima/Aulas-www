import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'
import FormTransaction from './../components/FormTransaction.vue'
import ListTransaction from './../components/ListTransaction.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list-transaction',
    name: 'ListTransaction',
    component: ListTransaction
  },
  {
    path: '/form-transaction',
    name: 'FormTransaction',
    component: FormTransaction
  }
]

const router = new VueRouter({
  routes
})

export default router