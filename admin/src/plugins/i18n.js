import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { zh } from '../languages/zh'
import { en } from '../languages/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        zh
    }
})