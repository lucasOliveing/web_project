import { createRouter, createWebHistory } from 'vue-router'

import main from '../pages/main.vue'
import adminHome from '../pages/admin.vue'

import publicAds from '../components/anuncio/public/allAds.vue'
import categoryAds from '../components/anuncio/public/categoryAds.vue'

import authAds from '../components/anuncio/auth.vue'

import adminAds from '../components/anuncio/auth/admin.vue'


import adminUsers from '../components/admin/users.vue'




const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/main',
      path: '/',
      component: main,
      children: [{
        path: '/ads',
        component: publicAds,
      },
      {
        path: '/categoria=:category',
        component: categoryAds,
      },
      ]
    },


    { path: '/userAds', component: authAds },
    
    {
      path: '/admin', component: adminHome,
      children: [{
        path: '/admin/ads', component: adminAds
      },
      {
        path: '/admin/users', component: adminUsers
      }
      ]
    },

    {
      path: '/adminUsers',
      component: adminUsers
    }
  ]
})



export default router;