import React, {Component} from 'react';

class Key extends Component {
  render(){
    const {keyID, keyPrsCb, keyDisplay, keyValue} = this.props;
    return(
      <div id={keyID} className={"key item-"+keyID} onClick={keyPrsCb} keyvalue={keyValue}>
        {keyDisplay}
      </div>
    )
  }
}

export default Key;

//TO DO Research the case of custom attributes 
//got error when having attribute in uppercase