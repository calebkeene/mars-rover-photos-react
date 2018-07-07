import 'react-dates/initialize';
import '../../css/App.css';

import React, { Component } from 'react';
import Header from './Header';
import Rover from './Rover';
import RoverPhotoPanel from './RoverPhotoPanel';
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
      isFetchingRover: false,
      isFetchingPhotos: false,
      showFetchPhotosButton: false,
      showRoverPhotoPanel: false,
      fetchPhotosBy: 'earth_date'
    };
    // make sure the setRover method has access to the component state
    this.setRover = this.setRover.bind(this);
    this.setRoverCamera = this.setRoverCamera.bind(this);
    this.setRoverSol = this.setRoverSol.bind(this);
    this.setRoverPhotoDate = this.setRoverPhotoDate.bind(this);
    this.setFetchPhotosBy = this.setFetchPhotosBy.bind(this);
    this.fetchRoverPhotos = this.fetchRoverPhotos.bind(this);
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
    this._setRoverPhotoPanelVisibility();
  }

  _roverCurrentPhotoId(rover) {
    let photoIds = rover.currentPhotoIds;
    return photoIds[0];
    // TODO: implement this when scrolling through multiple photos
    // console.log("photoIds => " + JSON.stringify(photoIds));
    // let currentPhotoId = rover.currentPhotoId;
    // console.log("currentPhotoId => " + currentPhotoId);
    // let currentArrayPosition = photoIds.indexOf(currentPhotoId);

    // let lastPhotoInSet = () => {
    //   return (currentArrayPosition + 1) > (photoIds.length -1);
    // }
    // console.log('lastPhotoInSet => ' + lastPhotoInSet);
    // if (!currentPhotoId || currentArrayPosition === -1 || lastPhotoInSet ) {
    //   return photoIds[0];
    // }

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

  _showRoverPhotoPanel() {
    let rover = this._getCurrentRover();
    if(!rover) { return false; } // May not need this

    let selectedCamera = rover.selectedCamera;
    let selectedPhotoDate = rover.selectedPhotoDate;

    if(!selectedCamera && !selectedPhotoDate) {
      return false;
    }
    if (rover.photos && rover.photos[selectedCamera]) {
      let photosByDate = rover.photos[selectedCamera][selectedPhotoDate];

      if(photosByDate && Object.keys(photosByDate).length > 0) {
        return true;
      }
    }
    return false;
  }

  _setRoverPhotoPanelVisibility() {
    this.setState({ showRoverPhotoPanel: this._showRoverPhotoPanel() });
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
        if(!rover['selectedCamera']) {
          // set the first camera as default when the rover is first loaded
          this.setRoverCamera(rover.cameras[0]['name']);
        }
      });
    }
    this.setState({ currentRoverName: name, rovers: rovers });
  }

  setRoverCamera(camera) {
    console.log(`running setRoverCamera in App class, camera: ${camera}`);
    let rover = this._getCurrentRover();
    rover['selectedCamera'] = camera;
    this._updateRover(rover);
  }

  setRoverSol(sol) {
    let rover = this._getCurrentRover();
    rover['selectedSol'] = parseInt(sol, 10);
    this.setState({ fetchPhotosBy: 'sol' });
    this._updateRover(rover);
  }

  setRoverPhotoDate(date) {
    let rover = this._getCurrentRover();
    rover['selectedPhotoDate'] = date;
    this.setState({ fetchPhotosBy: 'earth_date' });
    this._updateRover(rover);
  }

  fetchRover(name) {
    console.log(`calling fetchRover, name => ${name}`);
    return ApiService.fetchRover(name).then(rover => rover);
  }

  fetchRoverPhotos() {
    console.log("this.state => " + JSON.stringify(this.state));
    let fetchBySol = this.state.fetchPhotosBy !== 'earth_date';

    if(this.state.currentRoverName === "") {
      console.log("no rover currently set, returning bupkis");
      return null;
    }
    var rover = this._getCurrentRover();
    let limit = 10;
    // default to earth_date
    let chronFilter =  {
      key: 'earth_date',
      value: rover.selectedPhotoDate
    }
    if(fetchBySol) {
      chronFilter = {
        key: 'sol',
        value: rover.selectedSol
      }
    }
    console.log(`chronFilter => ${JSON.stringify(chronFilter)}`);
    this.setState({ isFetchingPhotos: true });

    ApiService.fetchRoverPhotos(rover, chronFilter, limit).then(photosResponse => {
      let selectedCamera = rover.selectedCamera;
      let selectedPhotoDate = rover.selectedPhotoDate;

      console.log("printing photos response!");
      console.log(JSON.stringify(photosResponse));
      if (!rover.photos) {
        rover.photos = {};
      }
      if (!rover.photos[selectedCamera]) {
        rover.photos[selectedCamera] = {};
      }
      if (!rover.photos[selectedCamera][selectedPhotoDate]) {
        rover.photos[selectedCamera][selectedPhotoDate] = {};
      }
      let photos = rover.photos[selectedCamera][selectedPhotoDate];

      photosResponse.forEach(photoJson => {
        let id = photoJson['id'].toString();
        photos[id] = photoJson['img_src'];
      });

      rover.photos[selectedCamera][selectedPhotoDate] = photos;
      // set the current range of photo ids, and the currently selected photo
      rover.currentPhotoIds = Object.keys(rover.photos[selectedCamera][selectedPhotoDate]);
      rover.currentPhotoId = this._roverCurrentPhotoId(rover);

      this._updateRover(rover);
    });
    this.setState({ isFetchingPhotos: false });
  }

  render() {
    let rover = this._getCurrentRover();
    return (
      <div className="App">
        <Header />
        <p>This will be the mars rover photos page</p>
        <RoverPhotoPanel
          rover={rover}
          isShowing={this.state.showRoverPhotoPanel}
        />
        <RoverPicker setRover={this.setRover} />
        <Rover
          rover={this._getCurrentRover()}
          setRoverCamera={this.setRoverCamera}
          setRoverSol={this.setRoverSol}
          setRoverPhotoDate={this.setRoverPhotoDate}
          setFetchPhotosBy={this.setFetchPhotosBy}
          isFetchingRover={this.state.isFetchingRover}
          isFetchingPhotos={this.state.isFetchingPhotos}
        />
        <FetchPhotosButton
          isShowing={this.state.showFetchPhotosButton}
          fetchRoverPhotos={this.fetchRoverPhotos}
        />
      </div>
    );
  }
}

export default App;
