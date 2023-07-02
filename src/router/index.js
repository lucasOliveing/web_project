import { createRouter, createWebHistory } from 'vue-router'

import main from '../pages/main.vue'
import userAds from '../pages/authUser/userAds.vue'
import adminHome from '../pages/admin/admin.vue'
import anuncios from '../components/anuncio.vue'
import categoryAds from '../components/categoriaAds.vue'


// const routes = RouteRecordRaw[] = []:


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: main,
      children: [{
        path: '/main',
        component: anuncios
      },
        {
          path: '/categoria=:categoria',
          component: categoryAds
          
        }]
    },
    { path: '/userAds', component: userAds },
    { path: '/admin', component: adminHome },
  ]
})



export default router;