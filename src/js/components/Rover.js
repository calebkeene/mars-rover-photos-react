import React from 'react';
import PhotoDatePicker from './PhotoDatePicker';
import 'react-dates/initialize';
import {  SingleDatePicker } from 'react-dates';
import moment from 'moment';

class Rover extends React.Component {
  constructor(props) {
    super(props);
    this.handleCameraSelection = this.handleCameraSelection.bind(this);
    this.handleSolSelection = this.handleSolSelection.bind(this);
    //this.componentWillMount = this.componentWillMount.bind(this);
    this.setRoverPhotoDate = this.setRoverPhotoDate.bind(this);
  }

  handleCameraSelection(event) {
    let camera = event.target.value.split(" ")[0];
    this.props.setRoverCamera(camera);
  }

  handleSolSelection(event) {
    this.props.setRoverSol(event.target.value);
  }

  setRoverPhotoDate(date) {
    this.props.setRoverPhotoDate(date);
  }

  render() {
    if(this.props.isFetching) {
      return <p>Loading . . .</p>;
    }
    else {
      if (this.props.rover) {
        const rover = this.props.rover;
        return (
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
              {/* TODO: strip these into separate components */}
              <p>Cameras</p>
              <select onChange={this.handleCameraSelection}>
                {rover.cameras.map(camera => {
                  let displayName = `${camera.name} (${camera.full_name})`;
                  if (rover.selectedCamera && camera.name === rover.selectedCamera) {
                    return <option selected key={camera.name}>{displayName}</option>;
                  }
                  return <option key={camera.name}>{displayName}</option>;
                })}
              </select>
              <p>Sol</p>
              <input
                onChange={this.handleSolSelection}
                type='number'
                min='0'
                max={rover.max_sol}
                placeholder={`Min: 0, max: ${rover.max_sol}`}
              />

              <p>Earth Date</p>
              <PhotoDatePicker rover={rover} setRoverPhotoDate={this.setRoverPhotoDate} />
            </div>
          </div>
        );
      }
      else {
        return <p>No rover currently selected</p>;
      }
    }
  }
}

export default Rover;