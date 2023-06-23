import { createRouter, createWebHistory } from 'vue-router'

import main from '../pages/main.vue'
// import userAds from '../pages/userAds.vue'
import userAds from '../components/userAds.vue'


 

// const routes = RouteRecordRaw[] = []:


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: main },
      { path: '/userAds', component: userAds },
    ]
  })
  


export default router;