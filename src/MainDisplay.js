import React, {Component} from 'react';

class MainDisplay extends Component {

  render(){
    const {displayHistory, display} = this.props;
    return(
      <div className="main-display">
        <div>DISPLAY HISTORY: {displayHistory}</div>
        <div id="display">DISPLAY: {display}</div>
      </div>
    )
  }
}

export default MainDisplay ;