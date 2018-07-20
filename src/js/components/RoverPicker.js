import React from 'react';

class RoverPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleRoverSelection = this.handleRoverSelection.bind(this);
  }

  handleRoverSelection(event) {
    this.props.setRover(event.target.value);
  }

  render() {
    return (
      <div>
        <select onChange={this.handleRoverSelection}>
          <option disabled selected>Rover</option>
          <option>Spirit</option>
          <option>Opportunity</option>
          <option>Curiosity</option>
        </select>
      </div>
    );
  };
};

export default RoverPicker;