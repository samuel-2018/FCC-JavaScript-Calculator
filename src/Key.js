import React, {Component} from 'react';

class Key extends Component {
  // constructor(props){
  //   super(props);
  // }
  render(){
    const {keyID, keyPrsCb, keyDisplay, keyValue} = this.props;

    return(
      <div id={keyID} className={"key "+keyID} onClick={keyPrsCb} keyValue={keyValue}>
        {keyDisplay}
      </div>
    )
  }
}

export default Key;