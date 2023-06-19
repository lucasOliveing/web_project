import { createRouter, createWebHistory } from 'vue-router'


const Home = { template: '<p>Página Inicial</p>' }
const About = { template: '<p>Sobre</p>' }

const routes = {
  '/': Home,
  '/sobre': About
}

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;