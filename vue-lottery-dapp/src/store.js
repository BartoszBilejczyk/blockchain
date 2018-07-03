import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import getWeb3 from './utils/getWeb3'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    registerWeb3Instance(state, payload) {
      console.log('registerWeb3Instance mutation being executed', payload)
      let result = payload;
      let web3Copy = state.web3;
      web3Copy.coinbase = result.coinbase;
      web3Copy.networkId = result.networkId;
      web3Copy.balance = result.balance;
      web3Copy.isInjected = result.isInjected;
      web3Copy.web3Instance = result.web3Instance;
      state.web3 = web3Copy;
    }
  },
  actions: {
    registerWeb3({ commit }) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    }
  }
})
