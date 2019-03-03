import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: Login.name,
            component: Login,
            meta: {
                title: '后台-登陆'
            }
        },
        {
            path: '/Login',
            name: Login.name,
            component: Login,
            meta: {
                title: '后台-登陆'
            }
        },
        {
            path: '/Index',
            name: Index.name,
            component: Index,
            meta: {
                title: '后台-首页'
            }
        }
    ]
})
