import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

