import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

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
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction to complete...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been added to the lottery' })
  };

  onWinnerPick = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on winner picking transaction to complete... Good luck!' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked. Check your account to see if you won!' });
  };

  // showPickWinner({ players }) {
  //   if (!players.length) {
  //     return null;
  //   } else {
  //     return (
  //       <div>
  //         <h4>Ready to pick the winner out of {this.state.players.length} Players ?</h4>
  //         <button onClick={this.onWinnerPick}>Pick the winner</button>
  //
  //
  //         <hr/>
  //       </div>
  //
  //     )
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Lottery</h1>
        <p>Manager of the contract</p>
        <h5>{this.state.manager}</h5>

        <hr/>

        <div className='ether-box'>
          <div className='wave one'></div>
          <div className='wave two'></div>
          <div className='wave three'></div>
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

        <div>
          <h4>Ready to pick the winner out of {this.state.players.length} Players ?</h4>
          <button onClick={this.onWinnerPick}>Pick the winner</button>


          <hr/>
        </div>


        <h4>{this.state.message}</h4>
      </div>
    );
  }
}

export default App;
