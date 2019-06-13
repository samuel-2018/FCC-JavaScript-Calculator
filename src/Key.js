import React, {Component} from 'react';

class Key extends Component {
  // constructor(props){
  //   super(props);
  // }
  render(){
    const {keyID, keyPrsCb, keyDisplay, keyValue} = this.props;
    // console.log('key component, keyPrsCb: ', keyPrsCb);
    
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