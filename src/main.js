import Vue from 'vue';
import App from './App';

import Element from 'element-ui';
// A modern alternative to CSS resets
import 'normalize.css/normalize.css';
// Global css
import './styles/index.scss';

// Icon svg
import './icons';

import store from './store';
import router from './router';

// Locales
import i18n from './locales';

// Load extension
import './utils/filter';
import './utils/vueExtension';

// Use element
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value),
    size: 'medium'
});

const context = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});

export default context;
