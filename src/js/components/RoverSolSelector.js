import React from 'react';

class RoverSolSelector extends React.Component {

  constructor(props) {
    super(props);
    this._handleSolSelection = this._handleSolSelection.bind(this);
  }
  _handleSolSelection(event) {
    this.props.setRoverSol(event.target.value);
  }

  render() {
    if(this.props.isShowing) {
      let rover = this.props.rover;
      return (
        <React.Fragment>
          <p>Sol</p>
          <input
            onChange={this._handleSolSelection}
            type='number'
            min='0'
            max={rover.max_sol}
            placeholder={`Min: 0, max: ${rover.max_sol}`}
            value={rover.selectedSol || 0}
          />
        </React.Fragment>
      )
    }
    else {
      return null;
    }
  }
}

export default RoverSolSelector;