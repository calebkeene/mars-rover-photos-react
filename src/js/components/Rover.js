import React, { Component } from 'react';

class Rover extends React.Component {
  constructor(props) {
    super(props);
    this.handleCameraSelection = this.handleCameraSelection.bind(this);
  }

  handleCameraSelection(event) {
    let camera = event.target.value.split(" ")[0];
    console.log(`setting camera: ${camera}`);
    this.props.setRoverCamera(camera);
  }

  render() {
    console.log(`this.props.rover => ${JSON.stringify(this.props.rover)}`);
    if(this.props.rover !== undefined) {
      const rover = this.props.rover;
      return(
        <div>
          <div>
            <p><em>name: </em>{rover.name}</p>
            <p><em>launch_date: </em>{rover.launch_date}</p>
            <p><em>landing_date: </em>{rover.landing_date}</p>
            <p><em>status: </em>{rover.status}</p>
            <p><em>max_sol: </em>{rover.max_sol}</p>
            <p><em>max_date: </em>{rover.max_date}</p>
            <p><em>total_photos: </em>{rover.total_photos}</p>
          </div>
          <div>
            <p>Cameras</p>
            <select onChange={this.handleCameraSelection}>
              {rover.cameras.map(camera => {
                if(rover.selectedCamera && camera.name === rover.selectedCamera) {
                  return <option selected key={camera.name}>{camera.name} ({camera.full_name})</option>;
                }
                return <option key={camera.name}>{camera.name} ({camera.full_name})</option>;
              })}
            </select>
          </div>
        </div>
      );
    }
    else {
      return <p>No rover currently selected</p>;
    }
  }
}

export default Rover;