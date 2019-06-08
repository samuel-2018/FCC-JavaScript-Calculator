import React, {Component} from 'react';
import Key from './Key.js';

class KeyPad extends Component {
  constructor(props) {
    super(props);
    this.keyData = {
      zero: {
        keyID: 'zero',
        keyDisplay: '0',
        keyValue: '0',
      },
      one: {
        keyID: 'one',
        keyDisplay: '1',
        keyValue: '1',
      },
      two: {
        keyID: 'two',
        keyDisplay: '2',
        keyValue: '2',
      },
      three: {
        keyID: 'three',
        keyDisplay: '3',
        keyValue: '3',
      },
      four: {
        keyID: 'four',
        keyDisplay: '4',
        keyValue: '4',
      },
      five: {
        keyID: 'five',
        keyDisplay: '5',
        keyValue: '5',
      },
      six: {
        keyID: 'six',
        keyDisplay: '6',
        keyValue: '6',
      },
      seven: {
        keyID: 'seven',
        keyDisplay: '7',
        keyValue: '7',
      },
      eight: {
        keyID: 'eight',
        keyDisplay: '8',
        keyValue: '8',
      },
      nine: {
        keyID: 'nine',
        keyDisplay: '9',
        keyValue: '9',
      },
      add: {
        keyID: 'add',
        keyDisplay: '+',
        keyValue: '+',
      },
      subtract: {
        keyID: 'subtract',
        keyDisplay: '-',
        keyValue: '-',
      },
      multiply: {
        keyID: 'multiply',
        keyDisplay: '*',
        keyValue: '*',
      },
      divide: {
        keyID: 'divide',
        keyDisplay: '/',
        keyValue: '/',
      },
      clear: {
        keyID: 'clear',
        keyDisplay: 'AC',
        keyValue: 'c',
      },
      decimal: {
        keyID: 'decimal',
        keyDisplay: '.',
        keyValue: '.',
      },
      equals: {
        keyID: 'equals',
        keyDisplay: '=',
        keyValue: '=',
      },
    }
    // Makes values accessible in loops
    this.keyDataArr = Object.entries(this.keyData);

    // Binds method, allowing use in callbacks
    this.keyPrsCb = this.keyPrsCb.bind(this);
  }
  // 'e' takes in touch or keyboard info
  keyPrsCb(e) {
    let keyID = '';
    // Gets key value
    // From keyboard
    if(e.key !== undefined) {
      keyID = e.key.toLowerCase();
      // Or from touch/click
    } else if (e.target.getAttribute('keyValue') !== undefined) {
      keyID = e.target.getAttribute('keyValue');
    } else {
      return;
    }

  // Checks for target key
  // 'some' returns true if any of the values return true
  if (this.keyDataArr.some( obj => obj.keyValue === keyID) ) {
    // Sends keyID, via callback, to App
    this.props.keyPadPrsCb(keyID);
  }
  }

  componentDidMount() {
    // Creates listener for callback on keydown
    // Keydown info (event) is auto sent to callback
    document.addEventListener('keydown', this.keyPrsCb);
  }

  render(){
    

    return(
      <section>
        {
          this.keyDataArr.map( (item, index) => (
            <Key 
              key={index} 
              keyID={item.keyID} 
              keyDisplay={item.keyDisplay} 
              keyValue={item.keyValue} 
              keyPrsCb={this.state.keyPrsCb}
          />
          ))
        }
      </section>
       
    )
  }
}

export default KeyPad;

