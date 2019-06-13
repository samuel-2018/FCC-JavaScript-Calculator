import React, {Component} from 'react';
import KeyPad from './KeyPad.js';
import MainDisplay from './MainDisplay.js';
import getResult from './getResult';
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Receives most recent target key pressed
      keyPadPrsCb: (keyID) => {
        // Passes the keyID on to keyPressIntake for processing
        this.keyPressIntake(keyID);
      },
      displayHistory: [''],
      display: '0',
    }
    this.state.keyPadPrsCb = this.state.keyPadPrsCb.bind(this);
  }

  keyPressIntake(keyID) {
    const innerThis = this;
    
    let dispH = this.state.displayHistory;
    let disp = this.state.display;
    const lastValue = dispH[dispH.length - 1];
    const secLastValue = dispH[dispH.length - 2];

    // Passes keyID to a method, which will return two values to the other method (within obj, deconstruct into two)
    handleSetState(generateDataFromKeyPress(keyID));

    // Sends data to setState
    function handleSetState({displayHistory, display}) {
      innerThis.setState({
        displayHistory,
        display
      });
    }

    function generateDataFromKeyPress(keyID) {

      function isOperator(whatIsIt) {
        if(whatIsIt === '-' || whatIsIt === '+' || whatIsIt === '/' || whatIsIt === '*'   ){
          return true;
        }
        return false;
      }

      switch (keyID) {
        case 'c': {
          return {displayHistory: [''], display: '0' };
        }

        case '=': {
          if (isOperator(lastValue)) {
            dispH.pop();
          } else if (secLastValue === '=') {
            dispH.pop();
            dispH.pop();
          }
          const result = getResult(dispH);
          return {displayHistory: [...dispH, '=', result], display: result };
        }

        case '-': 
        case '+': 
        case '/': 
        case '*': {
          if (isOperator(lastValue)) {
            dispH.pop();
          } else if(secLastValue === '='){
            dispH = [lastValue];
            disp = keyID;
          }
          dispH.push(keyID);
          return {displayHistory: [...dispH], display: keyID };
        }

        case '0': {
          if (disp === '0') {
            return {displayHistory: [...dispH], display: disp};
          } 
          // else fall through to rules for 1-9
        }

        case '1': 
        case '2': 
        case '3': 
        case '4':
        case '5': 
        case '6': 
        case '7': 
        case '8':
        case '9': {
          if (isOperator(lastValue)) {
            dispH.push(keyID);
            disp= keyID;
          } else if(secLastValue === '=') {
            disp = keyID;
            dispH = [keyID];
          } else if(disp === '0'){
            dispH[dispH.length -1] = keyID;
            disp = keyID;
          } else {
            dispH[dispH.length -1] += keyID;
            disp += keyID;
          }
          
          return {displayHistory: [...dispH], display: disp };
        }

        case '.': {
          if (dispH === '') {
            disp = '0';
            dispH = ['0'];
          } else if(!disp.includes('.')) {
            dispH[dispH.length -1] += keyID;
            disp += keyID;
          } 
          // else returns original value
          return {displayHistory: [...dispH], display: disp };
        }

        default:
          break;
      }
    }
  }
  
  render(){
    return(
      <div className="calc-container">
        <MainDisplay 
          displayHistory={this.state.displayHistory}
          display={this.state.display}
        />
        <KeyPad 
           keyPadPrsCb={this.state.keyPadPrsCb}
        />
      </div>
    )
  }
}

export default App;