import { createRouter, createWebHistory } from "vue-router";



import home from '@/pages/home.vue'


const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ()=> import('@/components/product.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router