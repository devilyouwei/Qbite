import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Cooker from './views/Cooker.vue'
import Waiter from './views/Waiter.vue'
import PrintIncome from './views/PrintIncome.vue'

Vue.use(Router)
import {i18n} from './plugins/i18n'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Main',
            meta: {
                title: 'Quick Bite'
            },
            component: () => import('./official/Main.vue')
        },
        {
            path: '/Home',
            name: 'Home',
            meta: {
                title: i18n.t('title_official_home')
            },
            component: () => import('./official/Home.vue')
        },
        {
            path: '/Cart',
            name: 'Cart',
            meta: {
                title: i18n.t('title_official_cart')
            },
            component: () => import('./official/Cart.vue')
        },
        {
            path: '/Login',
            name: Login.name,
            component: Login,
            meta: {
                title: i18n.t('title_login')
            }
        },
        {
            path: '/Register',
            name: Register.name,
            component: Register,
            meta: {
                title: i18n.t('title_reg')
            }
        },
        {
            path: '/Index',
            name: Index.name,
            component: Index,
            meta: {
                title: i18n.t('title_index')
            }
        },
        {
            path: '/Cooker',
            name: Cooker.name,
            component: Cooker,
            meta: {
                title: i18n.t('title_cooker')
            }
        },
        {
            path: '/Waiter',
            name: Waiter.name,
            component: Waiter,
            meta: {
                title: i18n.t('title_waiter')
            }
        },
        {
            path: '/PrintIncome',
            name: PrintIncome.name,
            component: PrintIncome,
            meta: {
                title: i18n.t('title_print')
            }
        }
    ]
})
