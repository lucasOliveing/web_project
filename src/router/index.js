import { createRouter, createWebHistory } from 'vue-router'

import header from "../components/head.vue"

const routes = [
    { path: '/', componet: header},
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;