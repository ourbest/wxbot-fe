import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';

import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import VueAxois from 'vue-axios'
import axios from "axios";
import Qs from "qs";

import store from './store';

Vue.use(VueRouter);

Vue.use(iView);

const ajax = axios.create({
    timeout: 30000,
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});


Vue.use(VueAxois, ajax);

import ArticleLink from './views/ArticleLink.vue'
Vue.component('ArticleLink', ArticleLink);

// 路由配置
const RouterConfig = {
    mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});