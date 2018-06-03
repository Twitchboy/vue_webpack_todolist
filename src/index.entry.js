import Vue from 'vue';
import App from './app';

import './assets/styles/global';

const root = document.createElement("div");
document.body.appendChild(root);

new Vue({
    render: (h) => h(App)
}).$mount(root);
