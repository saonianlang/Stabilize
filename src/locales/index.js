import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from './zh-CN';
import enLocale from './en';

Vue.use(VueI18n);

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    'zh-hans': {
        ...zhLocale,
        ...elementZhLocale
    }
};

const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: store.getters.language,
    // set locale messages
    messages
});

export default i18n;
