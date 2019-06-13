import React, {Component} from 'react';

class MainDisplay extends Component {

  render(){
    const {displayHistory, display} = this.props;
    return(
      <div className="main-display">
        <div className="display-history-wrapper">
          <div className="display-history">             {displayHistory}
          </div>
        </div>
        <div className="display-wrapper">
          <div id="display" className="display">        {display}
          </div>
        </div>
      </div>
    )
  }
}

export default MainDisplay ;