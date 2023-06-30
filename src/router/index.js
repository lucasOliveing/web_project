import { createRouter, createWebHistory } from 'vue-router'

import main from '../pages/main.vue'
import userAds from '../pages/authUser/userAds.vue'
import adminHome from '../pages/admin/admin.vue'
 

// const routes = RouteRecordRaw[] = []:


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: main },
      { path: '/userAds', component: userAds },
      { path: '/admin', component: adminHome},
    ]
  })
  


export default router;