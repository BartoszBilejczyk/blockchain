<template lang="html">
  <div class='metamask-info'>
    <div class="box" v-if="injectedWeb3">
      <p><i aria-hidden="true" class="fa fa-check"></i><b class="title">METAMASK:</b> Metamask installed</p>
    </div>
    <div class="box" v-else>
      <p><i aria-hidden="true" class="fa fa-times"></i><b class="title">METAMASK:</b> Metamask not found</p>
    </div>
    <div class="box">
      <p><b class="title">NETWORK:</b> {{ network }}</p>
    </div>
    <div class="box">
      <p><b class="title">ACCOUNT:</b> {{ coinbase }}</p>
    </div>
    <div class="box">
      <p><b class="title">BALANCE:</b> {{ ethBalance }} <b>ETH</b></p>
    </div>
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
  margin-top: 100px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.box {
  display: flex;
  padding: 20px;
  margin: 10px;
  background: linear-gradient(135deg, #d454a9, #9174dd);
  font-size: 20px;
  width: calc(25% - 60px);
  min-width: 200px;
  height: 200px;
  color: white;
  word-wrap: break-word;
  border-radius: 15px;

  p {
    width: 100%;
  }

  .title {
    display: block;
    font-size: 25px;
    height: 70px;
  }
}
</style>
