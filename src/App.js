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
        // console.log('test');
        
      },
      // keyPressed: '',
      displayHistory: [''],
      display: '0',
    }
    this.state.keyPadPrsCb = this.state.keyPadPrsCb.bind(this);
  }

  keyPressIntake(keyID) {
    const innerThis = this;
    // console.log('keyPressIntake ran');
    
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
 
    
    //needs to return a value for both displayHistory, display (even if leaving them unchanged)
    // example:
      // return {displayHistory: '', display: [''] }

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

    
    
    // is it AC 'c'
      // this set state... display and display history to defaults




    // is it the =

      // check to make sure the last value of displayHistory is not an operator, if it is remove the operator.

      // if second to last value is '=', then remove the last two values

      // finaly, send the array to getResult
      // use the return value to update state.display
      // append '=' and the result onto the end of state.displayHistory




    // is it an operator
      // check to make sure the last value of display is not an operator, if it is remove the operator.
      // add keyID onto the end of state.displayHistory
      // update state.display

    // is it 0
      // if display is already === '0', the keep all values the same
      // otherwise, fall through to the rules for 1-9


    // is it a number 1-9
      // check to see if the last value of displayHistory is an operator
        //if it is, then add keyID onto the end of state.displayHistory and update state.display with keyID

      // check to see if second to last value of displayHistory is '=',
        // if it is, set both display and displayHistory to keyID
      // check to see if the last value of displayHistory is a number (or use a correctly chained 'else'?)


        // if it is then CONCATE keyID onto the END of the value at the end of state.displayHistory and CONCATE keyID onto the END of state.display value



    // is it '.'
      // if display history is '', then set both display and displayHistory to "0."
      // if display is a number without a '.' (check with regex?), then concat keyID onto the last value of displayHistory and concate keyID onto the end of display

  }
  
  render(){

    return(
      <div>
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