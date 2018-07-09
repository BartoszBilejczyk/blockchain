<template lang="html">
  <div class='metamask-info'>
    <p v-if="injectedWeb3" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask installed</p>
    <p v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> Metamask not found</p>
    <p>Network: {{ network }}</p>
    <p>Account: {{ coinbase }}</p>
    <p>Balance: {{ balance }} Wei // {{ ethBalance }} Eth</p>
  </div>
</template>

<script>
import { NETWORKS } from '../utils/constants/networks'
import { mapState } from 'vuex'

export default {
  name: 'hello-metamask',
  computed: mapState({
    injectedWeb3: state => state.web3.injectedWeb3,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    }
  })
}
</script>

<style lang="scss" scoped>

.metamask-info {
  text-align: center;
}

#has-metamask {
  color: green;
}

#no-metamask {
  color: red;
}
</style>
