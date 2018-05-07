const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'car rally detect evolve weapon come curious paddle trade afraid sugar forest',
  'https://rinkeby.infura.io/n5p39Humy5UpG0hzz2vU'
);

const web3 = new Web3(provider);


const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account' , accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface)) // interface is abi
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({
      gas: '5000000',
      from: accounts[0]
    });

  console.log('Contract deployed to', result.options.address);
};

deploy();
