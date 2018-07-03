import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

import PickWinner from './components/PickWinner'

import ethereumLogo from './assets/images/ethereum-logo.svg';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = { manager: '' }
  // }

  // automatically changed to a constructor
  state = {
    manager: '',
    currentAccounts: [],
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const currentAccounts = await web3.eth.getAccounts();

    this.setState({ manager, players, balance, currentAccounts });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    this.setState({ message: 'Waiting on transaction to complete...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been added to the lottery' })
  };

  handlePickWinner = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on winner picking transaction to complete... Good luck!' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked. Check your account to see if you won!' });
  };

  render() {
    const isManager = this.state.currentAccounts[0] === this.state.manager;

    return (
      <div>
        <h1>Lottery</h1>
        <p>Manager of the contract</p>
        <h5>{this.state.manager}</h5>

        <hr/>

        <div className="ether-box">
          <div className="wave one"></div>
          <div className="wave two"></div>
          <div className="wave three"></div>
          <div className='title'>
            {web3.utils.fromWei(this.state.balance, 'ether')} ETH
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <div>
            <label>Try your luck in the lottery, insert amount of ETH</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={this.state.value}
                step="0.01"
                min="0.01"
                onChange={event => this.setState({ value: event.target.value })}/>
              <img src={ethereumLogo} alt="Ethereum Logo" />
            </div>
          </div>

          <button>Enter lottery</button>
        </form>

        <hr/>

        {
          isManager && (
            <PickWinner
              playersLength={this.state.players.length}
              onPickWinner={this.handlePickWinner}
            />
          )
        }

        <h4>{this.state.message}</h4>
      </div>
    );
  }
}

export default App;
