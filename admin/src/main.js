import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'

import 'element-ui/lib/theme-chalk/index.css'
/*
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
*/
import './assets/style.css'
import {i18n} from './plugins/i18n'
import FlagIcon from 'vue-flag-icon'

//Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(FlagIcon)
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount('#app')
