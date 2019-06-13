import React, {Component} from 'react';

class MainDisplay extends Component {

  render(){
    const {displayHistory, display} = this.props;
    return(
      <div className="main-display">
        <div className="display-history">DISPLAY HISTORY: {displayHistory}</div>
        <div id="display" className="display">DISPLAY: {display}</div>
      </div>
    )
  }
}

export default MainDisplay ;