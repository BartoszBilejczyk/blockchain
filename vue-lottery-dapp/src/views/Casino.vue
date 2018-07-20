<template>
  <div class="casino">
     <h1>Welcome to the Casino</h1>
     <p>
       You can win up to {{ contractBalance }} ETH with a multiplier of 9.
     </p>

    <div class="metamask-error" v-if="metamaskError">
      You need to log in to Metamask and reload the app <br> in order to use the casino.
    </div>

     <div class="form__item-wrapper">
       <label for="amount">
         Amount to bet (min 100 wei, max {{ contractBalance / 10 }} ETH):
       </label>
       <div class="input-wrapper">
         <input
           v-model="amount"
           id="amount"
           placeholder="0 Ether"
         >
       </div>
     </div>
     <h4>Please pick a number between 1 and 10</h4>
     <ul>
       <li v-on:click="selectNumber">1</li>
       <li v-on:click="selectNumber">2</li>
       <li v-on:click="selectNumber">3</li>
       <li v-on:click="selectNumber">4</li>
       <li v-on:click="selectNumber">5</li>
       <li v-on:click="selectNumber">6</li>
       <li v-on:click="selectNumber">7</li>
       <li v-on:click="selectNumber">8</li>
       <li v-on:click="selectNumber">9</li>
       <li v-on:click="selectNumber">10</li>
    </ul>
    <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
    <div class="event" v-if="winEvent">
      <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i> Congratulations, you have won {{ winEvent._amount }} wei.</p>
      <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-check"></i> You lost. Try again.</p>
    </div>
    <HelloMetaMask />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloMetaMask from '@/components/HelloMetaMask'
import { mapState } from 'vuex'

export default {
  name: 'casino',
  components: {
    HelloMetaMask,
  },
  data() {
    return {
      amount: null,
      pending: false,
      winEvent: null,
    }
  },
  beforeCreate() {
    console.log('registerWeb3 Action dispatched from Casino Component');
    this.$store.dispatch('registerWeb3');
  },
  mounted() {
    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance');
  },
  computed: mapState({
    contractBalance: state => state.web3.contractBalance,
    injectedWeb3: state => state.web3.injectedWeb3,
    metamaskError: state => !state.web3.injectedWeb3,
  }),
  methods: {
    selectNumber(event) {
      if (this.injectedWeb3) {
        this.metamaskError = false;
        this.winEvent = null;
        this.pending = true;
        this.$store.state.contractInstance().bet(event.target.innerHTML, {
          gas: 300000,
          value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
          from: this.$store.state.web3.coinbase,
        }, (err) => {
          if (err) {
            console.log(err);
            this.pending = false;
          } else {
            let Won = this.$store.state.contractInstance().Won()
            Won.watch((err, result) => {
              if (err) {
                console.log('could not get event Won()')
              } else {
                this.winEvent = result.args;
                this.winEvent._amount = parseInt(result.args._amount, 10)
                this.pending = false;
              }
            })
          }
        })
      } else {
        this.metamaskError = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.casino {
  margin-top: 50px;
  text-align:center;
}

#loader {
  width: 150px;
}

.form__item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 50px 0;
}

.metamask-error {
  padding: 20px;
  border: 1px solid red;
  background: red;
  font-size: 14px;
  font-weight: bold;
  color: white;
  max-width: 500px;
  margin: 0 auto;
}

label {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: bold;
}

.input-wrapper {
  position: relative;

  &:after {
    content: 'ETH';
    position: absolute;
    display: block;
    right: 1px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: #9174dd;
    padding: 14px;
    border-radius: 0 10px 10px 0;
  }
}

input {
  padding: 15px 50px 15px 20px;;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid #9174dd;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
}

ul {
  margin-top: 20px;
  padding-left: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  padding: 20px;
  margin: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  background: #fff;
  border: 2px solid;
  border-color: #9174dd;
  color: #9174dd;
  transition: all .2s ease;
  font-weight: 500;
  font-size: 20px;
}

li:hover {
  border: 2px solid;
  background: #9174dd;
  border-color: #9174dd;
  color: white;
}

li:active {
  opacity: 0.7;
}

* {
  color: #444444;
}

#has-won,
#has-lost {
  font-size: 20px;
  font-weight: 500;
}

#has-won {
  color: #9174dd;
}

#has-lost {
  color: #d454a9;
}

</style>
