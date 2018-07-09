import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import getWeb3 from './utils/getWeb3'
import pollWeb3 from './utils/pollWeb3'
import getContract from './utils/getContract'

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
      pollWeb3();
    },
    pollWeb3Instance(state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload);
      state.web3.coinbase = payload.coinbase;
      state.web3.balance = parseInt(payload.balance, 10);
    },
    registerContractInstance(state, payload) {
      console.log('Casino contract instance: ', payload)
      state.contractInstance = () => payload;
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
    },
    pollWeb3({ commit }, payload) {
      console.log('pollWeb3 actio being executed');
      commit('pollWeb3Instance', payload)
    },
    getContractInstance({commit}) {
      getContract
        .then(result => {
          commit('registerContractInstance', result)
        })
        .catch(e => console.log(e));
    },
  }
})
