import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Cooker from './views/Cooker.vue'
import Waiter from './views/Waiter.vue'
import PrintIncome from './views/PrintIncome.vue'

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
                title: '登錄'
            }
        },
        {
            path: '/Login',
            name: Login.name,
            component: Login,
            meta: {
                title: '登錄'
            }
        },
        {
            path: '/Register',
            name: Register.name,
            component: Register,
            meta: {
                title: '註冊'
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
            path: '/Cooker',
            name: Cooker.name,
            component: Cooker,
            meta: {
                title: '廚師專頁'
            }
        },
        {
            path: '/Waiter',
            name: Waiter.name,
            component: Waiter,
            meta: {
                title: '服务员專頁'
            }
        },
        {
            path: '/PrintIncome',
            name: PrintIncome.name,
            component: PrintIncome,
            meta: {
                title: '收入報告打印'
            }
        }
    ]
})
