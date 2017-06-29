import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentBot: '',
        reload: 0
    },
    mutations: {
        open(state, bot) {
            state.currentBot = bot;
        },

        reload(state) {
            state.reload = new Date().getTime();
        }
    }
});


export default store;