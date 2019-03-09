import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Order from './views/Order.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: Index.name,
            component: Index,
            meta: {
                title: '首頁'
            }
        },
        {
            path: '/Index',
            name: Index.name,
            component: Index,
            meta: {
                title: '首頁'
            }
        },
        {
            path: '/Order',
            name: Order.name,
            component: Order,
            meta: {
                title: '訂單'
            }
        }
    ]
})
