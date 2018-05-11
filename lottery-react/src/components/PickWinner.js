import React from 'react';

const PickWinner = (props) => (
  <div>
    <h4>Ready to pick the winner out of {props.playersLength} Players ?</h4>
    <button onClick={props.onPickWinner}>Pick the winner</button>
    <hr/>
  </div>
);

export default PickWinner;
