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
        <div class='rover__select--sol cell small-4 medium-3'>
          <label for='selectSol'>Martian Sol</label>
          <input
            name='selectSol'
            onChange={this._handleSolSelection}
            type='number'
            min='0'
            max={rover.max_sol}
            placeholder={`Min: 0, max: ${rover.max_sol}`}
            value={rover.selectedSol || 0}
          />
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default RoverSolSelector;