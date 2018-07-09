import Web from 'web3'
import { address, ABI } from './constants/casinoContract';

let getContract = new Promise((resolve, reject) => {
  let web3 = new Web3(window.web3.currentProvider);
  let casinoContract = web3.eth.contract(ABI);
  let casinoContractInstance = casinoContract.at(address);
  // casinoContractInstance = () => casinoContractInstance;
  resolve(casinoContractInstance);
})

export default getContract;
