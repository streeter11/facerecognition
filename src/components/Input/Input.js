import React from 'react';
import './Input.css';

const Input = ({onEntryChange, onButtonSubmit}) => {
  return (
    <div>
      <p className= "f3">
        {"Submit your request for the facial recognition analysis"}
      </p>
      <div className= "center mb4">
        <div className= "center form pa4 br3 shadow-5">
          <input className= "f4 pa2 w-70 center" type= "text" onChange= {onEntryChange}></input>
          <button className= "w-30 grow f4 link ph3 pv2 dib white bg-dark-blue" onClick= {onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default Input;