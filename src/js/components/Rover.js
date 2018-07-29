import React from 'react';
import RoverInfoTable from './RoverInfoTable';
import PhotoDatePicker from './PhotoDatePicker';
import RoverSolSelector from './RoverSolSelector';

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

  setRoverSol(sol) {
    this.props.setRoverSol(sol);
  }

  setRoverPhotoDate(date) {
    let stringDate = date.toISOString(true).split('T')[0];
    this.props.setRoverPhotoDate(stringDate);
  }

  render() {
    if(this.props.isFetchingRover) {
      return(
        <div class='cell small-6 medium-5'>
          <p class='rover__status-text'>Loading . . .</p>
        </div>
      )
    }
    else {
      if (this.props.rover) {
        const rover = this.props.rover;
        return (
          <React.Fragment>
            <RoverInfoTable rover={rover} />

            <div class='rover__select--cameras cell small-4 medium-4 medium-offset-1'>
              <label for='selectCamera'>Cameras</label>
              <select name='selectCamera' onChange={this._handleCameraSelection}>
                {rover.cameras.map(camera => {
                  let displayName = `${camera.name} (${camera.full_name})`;
                  if (rover.selectedCamera && camera.name === rover.selectedCamera) {
                    return <option selected key={camera.name}>{displayName}</option>;
                  }
                  return <option key={camera.name}>{displayName}</option>;
                })}
              </select>
            </div>

            <div class='rover__select--date-type cell small-4 medium-3'>
              <label for='selectDateType'>Photos Date Type</label>
              <select name='selectDate' onChange={this._toggleChronSelector}>
                <option selected key='earth_date'>Earth Date</option>
                <option key='sol'>Sol</option>
              </select>
            </div>

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
          </React.Fragment>
        );
      }
      else if(this.props.failedToFetchRover) {
        return (
          <div class='cell small-6 medium-5'>
            <p class='rover__status-text'>Connection Error: Failed to retrieve Rover metadata from API</p>
          </div>
        )
      }
      else {
        return(
          <div class='cell small-6 medium-5'>
            <p class='rover__status-text'>No rover currently selected</p>
          </div>
        )
      }
    }
  }
}

export default Rover;