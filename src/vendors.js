import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from 'axios';
import Qs from 'qs';
import VueAxios from 'vue-axios';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
    .config('https://c6eb05490aeb4f0088e45320b06160aa@sentry.io/183612')
    .addPlugin(RavenVue, Vue)
    .install();
// import echarts from 'echarts';