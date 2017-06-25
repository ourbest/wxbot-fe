import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentBot: ''
    },
    mutations: {
        open(state, bot) {
            state.currentBot = bot;
        }
    }
});


export default store;