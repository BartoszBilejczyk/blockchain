import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); // Override Metamasks's 0.2 web3

export default web3
