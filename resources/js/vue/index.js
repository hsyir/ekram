
window.Vue = require('vue').default;

import store from "./store";
import router from "./router";
import App from './components/App';
import "./components";
import "./plugins";


import vuetify from "./plugins/vuetify"
const app = new Vue({
    el: '#app',
    vuetify,
    store,
    router,
    ...App
});
