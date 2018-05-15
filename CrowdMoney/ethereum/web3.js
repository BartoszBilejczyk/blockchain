// import Web3 from 'web3';
//
// let web3;
//
// // to handle window undefined error
//
// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   // in the browser and MetaMask injected web3
//   web3 = new Web3(window.web3.currentProvider);
// } else {
//   // in the server of user is not running metamask
//   const provider = new Web3.providers.HttpProvider(
//     'https://rinkeby.infura.io/n5p39Humy5UpG0hzz2vU'
//   );
//
//   web3 = new Web3(provider);
// }
//
// export default web3;

import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/n5p39Humy5UpG0hzz2vU'
  );
  web3 = new Web3(provider);
}

export default web3;
