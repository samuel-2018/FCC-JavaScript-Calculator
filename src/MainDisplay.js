import React, {Component} from 'react';

class MainDisplay extends Component {

  render(){
    const {displayHistory, display} = this.props;
    return(
      <div className="main-display">
        <div>{displayHistory}</div>
        <div id="display">{display}</div>
      </div>
    )
  }
}

export default MainDisplay ;