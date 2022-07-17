import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContatoManager from '../views/ContatoManager'
import AddContato from '../views/AddContato'
import EditContato from '../views/EditContato'
import ViewContato from '../views/ViewContato'
import PageNotFound from '../views/PageNotFound'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/contato',
    component: HomeView
  },
  {
    path: '/contato',
    name: 'ContatoManager',
    component: ContatoManager
  },
  {
    path: '/contato/add',
    name: 'AddContato',
    component: AddContato
  },
  {
    path: '/contato/edit/:contatoId',
    name: 'EditContato',
    component: EditContato
  },
  {
    path: '/contato/view/:contatoId',
    name: 'ViewContato',
    component: ViewContato
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
