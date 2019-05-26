import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


import data from './modules/data';


export default new Vuex.Store({
  modules: {
    data
  } 
});