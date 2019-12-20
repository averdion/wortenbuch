import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

var state={
    LoggedUser: { userId:0, type: 0},
    domain: 'http://localhost:8000'
}

var mutations = {
    updateLoggedUser (user) {
      state.LoggedUser = user;
    }
}

export default new Vuex.Store({

    state : state,
    mutations : mutations
})