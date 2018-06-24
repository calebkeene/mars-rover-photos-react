import 'react-dates/initialize';
import '../../css/App.css';

import React, { Component } from 'react';
import Header from './Header';
import Rover from './Rover';
import FetchPhotosButton from './FetchPhotosButton';
import RoverPicker from './RoverPicker';
import ApiService from '../services/ApiService';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoverName: null,
      rovers: {},
      photos: {},
      isFetchingRover: false,
      isFetchingPhotos: false,
      showFetchPhotosButton: false,
      fetchPhotosBy: 'earth_date'
    };
    console.log("calling App component constructor");
    console.log(`this.state => ${JSON.stringify(this.state)}`);

    // make sure the setRover method has access to the component state
    this.setRover = this.setRover.bind(this);
    this.setRoverCamera = this.setRoverCamera.bind(this);
    this.setRoverSol = this.setRoverSol.bind(this);
    this.setRoverPhotoDate = this.setRoverPhotoDate.bind(this);
    this.setFetchPhotosBy = this.setFetchPhotosBy.bind(this);
  }

  _getCurrentRover() {
    let currentRoverName = this.state.currentRoverName;
    return currentRoverName === null ? null : this.state.rovers[currentRoverName];
  }

  _updateRover(rover) {
    let rovers = this.state.rovers;
    rovers[rover.name] = rover;
    this.setState({ rovers });
    this._setFetchPhotosButtonVisibility(this.state.fetchPhotosBy);
  }

  _showFetchPhotosButton(fetchBy) {
    let rover = this._getCurrentRover();
    // only show the button if an API call isn't currently underway
    if(!this.state.isFetchingRover && !this.state.isFetchingPhotos) {
      // make sure there is both a selected earth_date/sol, and the picker is the same type\
      if(fetchBy === 'earth_date' && rover.selectedPhotoDate) {
        return true;
      }
      if(fetchBy === 'sol' && rover.selectedSol) {
        return true;
      }
    }
    return false;
  }

  _setFetchPhotosButtonVisibility(fetchBy) {
    this.setState({ showFetchPhotosButton: this._showFetchPhotosButton(fetchBy) });
  }

  setFetchPhotosBy(fetchPhotosBy) {
    this.setState({ fetchPhotosBy });
    this._setFetchPhotosButtonVisibility(fetchPhotosBy);
  }

  setRover(name) {
    let rovers = this.state.rovers;

    if(rovers[name] === undefined) {
      this.setState({isFetchingRover: true});
      this.fetchRover(name).then( newRover => {
        let rover = newRover;
        rovers[name] = rover;
        this.setState({ currentRoverName: name, rovers: rovers, isFetchingRover: false });
      });
    }
    this.setState({ currentRoverName: name, rovers: rovers });
  }

  setRoverCamera(camera) {
    console.log(`running setRoverCamera in App class, camera: ${camera}`);
    let rover = this._getCurrentRover;
    rover["selectedCamera"] = camera;
    this._updateRover(rover);
  }

  setRoverSol(sol) {
    let rover = this._getCurrentRover();
    rover["selectedSol"] = parseInt(sol, 10);
    this.setState({ fetchPhotosBy: 'sol' });
    this._updateRover(rover);
  }

  setRoverPhotoDate(date) {
    let rover = this._getCurrentRover();
    rover["selectedPhotoDate"] = date;
    this.setState({ fetchPhotosBy: 'earth_date' });
    this._updateRover(rover);
  }

  fetchRover(name) {
    console.log(`calling fetchRover, name => ${name}`);
    return ApiService.fetchRover(name).then(rover => rover);
  }

  fetchRoverPhotos(fetchBySol) {
    if(this.state.currentRoverName === "") {
      console.log("no rover currently set, returning bupkis");
      return null;
    }
    this.setState({isFetchingPhotos: true});
    let rover = this._getCurrentRover();
    let limit = 1; // may modify this later for paginating large result sets

    // default to earth_date
    let chronFilter =  {
      key: 'earth_date',
      value: 'selectedPhotoDate'
    }
    if(fetchBySol) {
      chronFilter = {
        key: 'sol',
        value: 'selectedSol'
      }
    }
    console.log(`chronFilter => ${JSON.stringify(chronFilter)}`);

    ApiService.fetchRoverPhotos(rover, chronFilter, limit).then(photosResponse => {
      console.log("printing photos response!");
      console.log(JSON.stringify(photosResponse));
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <p>This will be the mars rover photos page</p>
        <RoverPicker setRover={this.setRover} />
        <Rover
          rover={this._getCurrentRover()}
          setRoverCamera={this.setRoverCamera}
          setRoverSol={this.setRoverSol}
          setRoverPhotoDate={this.setRoverPhotoDate}
          setFetchPhotosBy={this.setFetchPhotosBy}
          fetchRoverPhotos={this.fetchRoverPhotos}
          isFetchingRover={this.state.isFetchingRover}
          isFetchingPhotos={this.state.isFetchingPhotos}
        />
        <FetchPhotosButton isShowing={this.state.showFetchPhotosButton} />
      </div>
    );
  }
}

export default App;
