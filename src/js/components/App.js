import 'react-dates/initialize';
import '../../styles/css/App.css';

// components
import React, { Component } from 'react';
import Header from './Header';
import Rover from './Rover';
import RoverPhotoPanel from './RoverPhotoPanel';
import FetchPhotosButton from './FetchPhotosButton';
import ChangePhotoButtons from './ChangePhotoButtons';
import RoverPicker from './RoverPicker';
import NoPhotoResultsMsg from './NoPhotoResultsMsg';

// helpers/services
import ApiService from '../services/ApiService';
import ComponentsDisplayHelper from '../helpers/ComponentsDisplayHelper';
import RoverPhotosHelper from '../helpers/RoverPhotosHelper';

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
      showScrollPhotoButtons: false,
      showNoPhotoResultsMsg: false,
      fetchPhotosBy: 'earth_date'
    };
    // make sure the setRover method has access to the component state
    this.setRover = this.setRover.bind(this);
    this.setRoverCamera = this.setRoverCamera.bind(this);
    this.setRoverSol = this.setRoverSol.bind(this);
    this.setRoverPhotoDate = this.setRoverPhotoDate.bind(this);
    this.setFetchPhotosBy = this.setFetchPhotosBy.bind(this);
    this.fetchRoverPhotos = this.fetchRoverPhotos.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
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
    this._setScrollPhotoButtonsVisibility();
  }

  _setScrollPhotoButtonsVisibility() {
    let rover = this._getCurrentRover();
    let showElement = ComponentsDisplayHelper.showScrollPhotoButtons(rover);
    this.setState( {showScrollPhotoButtons: showElement });
  }

  _setRoverPhotoPanelVisibility() {
    let rover = this._getCurrentRover();
    let showElement = ComponentsDisplayHelper.showRoverPhotoPanel(rover);
    this.setState({ showRoverPhotoPanel: showElement });
  }

  _setFetchPhotosButtonVisibility(fetchBy) {
    let rover = this._getCurrentRover();
    let showElement = ComponentsDisplayHelper.showFetchPhotosButton(this.state, rover, fetchBy);
    this.setState({showFetchPhotosButton: showElement});
  }

  setFetchPhotosBy(fetchPhotosBy) {
    this.setState({ fetchPhotosBy });
    this._setFetchPhotosButtonVisibility(fetchPhotosBy);
  }

  setRover(name) {
    let rovers = this.state.rovers;

    if(rovers[name] === undefined) {
      this.setState({isFetchingRover: true});
      ApiService.fetchRover(name)
        .then(newRover => {
          let rover = newRover;
          rovers[name] = rover;
          this.setState(
            {
              currentRoverName: name,
              rovers: rovers,
              isFetchingRover: false,
              failedToFetchRover: false
            }
          );
          if (!rover['selectedCamera']) {
            // set the first camera as default when the rover is first loaded
            this.setRoverCamera(rover.cameras[0]['name']);
          }
        })
        .catch(error => {
          console.log(`rescuing error! error: ${error}`);
          this.setState({ isFetchingRover: false, failedToFetchRover: true });
        });
    }
    this.setState({ currentRoverName: name, rovers: rovers });
  }

  changePhoto(direction) {
    console.log('changing direction => ' + direction);
    let rover = this._getCurrentRover();
    rover.currentPhotoId = RoverPhotosHelper.shiftRoverPhotoId(rover, direction)
    this._updateRover(rover);
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

      if(photosResponse.length > 0) {
        console.log(`returning ${photosResponse.length} photos`);
        this.setState({ showNoPhotoResultsMsg: false });
        if(photosResponse.length > 1) {
          console.log("multiple photos detected, showing buttons");
          this.setState({ showScrollPhotoButtons: true });
        }
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
        if (!rover.currentPhotoId) {
          rover.currentPhotoId = rover.currentPhotoIds[0];
        }
        this._updateRover(rover);
      }
      else {
        this.setState(
          {
            showRoverPhotoPanel: false,
            showScrollPhotoButtons: false,
            showFetchPhotosButton: false,
            showNoPhotoResultsMsg: true
          }
        );
      }
    });
    this.setState({ isFetchingPhotos: false });
  }

  render() {
    let rover = this._getCurrentRover();
    return (
      <div class="App grid-container">
        <div class='grid-x grid-margin-x'>
          <Header />
        </div>
        <div class='grid-x grid-margin-x grid-margin-y'>
          <RoverPhotoPanel
            rover={rover}
            isShowing={this.state.showRoverPhotoPanel}
            fetchPhotosBy={this.state.fetchPhotosBy}
          />
          <RoverPicker setRover={this.setRover} />
          <FetchPhotosButton
            isShowing={this.state.showFetchPhotosButton}
            fetchRoverPhotos={this.fetchRoverPhotos}
          />
          <NoPhotoResultsMsg
            isShowing={this.state.showNoPhotoResultsMsg}
            fetchPhotosBy={this.state.fetchPhotosBy}
          />
          <Rover
            rover={this._getCurrentRover()}
            setRoverCamera={this.setRoverCamera}
            setRoverSol={this.setRoverSol}
            setRoverPhotoDate={this.setRoverPhotoDate}
            setFetchPhotosBy={this.setFetchPhotosBy}
            isFetchingRover={this.state.isFetchingRover}
            isFetchingPhotos={this.state.isFetchingPhotos}
            failedToFetchRover={this.state.failedToFetchRover}
          />
          <ChangePhotoButtons
            isShowing={this.state.showScrollPhotoButtons}
            changePhoto={this.changePhoto}
          />
        </div>
      </div>
    );
  }
}

export default App;
