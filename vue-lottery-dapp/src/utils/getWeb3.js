import Web3 from 'web3';

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass the result
* 3. Get networkId - Now we can check whether the user is connected
* to the right network to use our app
* 4. Get user account from metamask
* 5. Get user balance
*/

let getWeb3 = new Promise((resolve, reject) => {
  // Check for injected web3
  let web3js = window.web3;

  if (typeof web3js !== 'undefined') {
    let web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: web3.isConnected(),
      web3() {
        return web3;
      },
    })
  } else {
    reject(new Error('Unable to connect to MetaMask'));
  }
})
  .then(result => {
    return new Promise((resolve, reject) => {
      // Retrieve network id
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          reject(new Error('Unable to retrieve network ID'));
        } else {
          // Assign the networkId property to our result and resolve promise
          result = Object.assign({}, result, { networkId });
          resolve(result);
        }
      })
    })
  })
  .then(result => {
    return new Promise((resolve, reject) => {
      // Retrieve coinbase
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'));
        } else {
          result = Object.assign({}, result, { coinbase });
          resolve(result);
        }
      })
    })
  })
  .then(result => {
    return new Promise((resolve, reject) => {

      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase));
        } else {
          result = Object.assign({}, result, { balance });
          resolve(result);
        }
      })
    })
  })
  .then(result => {
    return new Promise((resolve, reject) => {
      // Retrieve balance for contract
      result.web3().eth.getBalance('0x3fecb15638ec8687fadf3d44b2d9bd675438dc8e', (err, contractBalance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for contract: 0x3fecb15638ec8687fadf3d44b2d9bd675438dc8e'));
        } else {
          const contractBalanceParsed = contractBalance.c[0] / 10000;
          console.log(contractBalanceParsed)
          result = Object.assign({}, result, {
            contractBalance: contractBalanceParsed
          });
          resolve(result);
        }
      });
    })
  });

export default getWeb3;
