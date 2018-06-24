import React from 'react';
import PhotoDatePicker from './PhotoDatePicker';
import RoverSolSelector from './RoverSolSelector';
import 'react-dates/initialize';

class Rover extends React.Component {
  constructor(props) {
    super(props);
    this._handleCameraSelection = this._handleCameraSelection.bind(this);
    this._toggleChronSelector = this._toggleChronSelector.bind(this);

    this.setRoverSol = this.setRoverSol.bind(this);
    this.setRoverPhotoDate = this.setRoverPhotoDate.bind(this);

    this.state = { showingSolSelector: false };
  }

  _handleCameraSelection(event) {
    let camera = event.target.value.split(" ")[0];
    this.props.setRoverCamera(camera);
  }

  _toggleChronSelector(event) {
    let val = event.target.value;
    let showingSolSelector = event.target.value === 'Sol';
    console.log("showingSolSelector => " + showingSolSelector);
    this.setState({showingSolSelector});

    let fetchPhotosBy = showingSolSelector ? 'sol' : 'earth_date';
    this.props.setFetchPhotosBy(fetchPhotosBy);
  }

  _fetchRoverPhotos() {
    this.props.fetchRoverPhotos(this.state.showingSolSelector);
  }

  setRoverSol(sol) {
    this.props.setRoverSol(sol);
  }

  setRoverPhotoDate(date) {
    let stringDate = date.toISOString(true).split('T')[0];
    this.props.setRoverPhotoDate(stringDate);
  }

  render() {
    if(this.props.isFetchingRover) {
      return <p>Loading . . .</p>;
    }
    else {
      if (this.props.rover) {
        const rover = this.props.rover;
        return (
          <React.Fragment>
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
              <select onChange={this._handleCameraSelection}>
                {rover.cameras.map(camera => {
                  let displayName = `${camera.name} (${camera.full_name})`;
                  if (rover.selectedCamera && camera.name === rover.selectedCamera) {
                    return <option selected key={camera.name}>{displayName}</option>;
                  }
                  return <option key={camera.name}>{displayName}</option>;
                })}
              </select>

              <p>Date Filter for Camera</p>
              <select onChange={this._toggleChronSelector}>
                <option selected key='earth_date'>Earth Date</option>
                <option key='sol'>Sol</option>
              </select>

              <RoverSolSelector
                rover={rover}
                isShowing={this.state.showingSolSelector}
                setRoverSol={this.setRoverSol}
              />
              <PhotoDatePicker
                rover={rover}
                isShowing={!this.state.showingSolSelector}
                setRoverPhotoDate={this.setRoverPhotoDate}
              />
            </div>
          </React.Fragment>
        );
      }
      else {
        return <p>No rover currently selected</p>;
      }
    }
  }
}

export default Rover;