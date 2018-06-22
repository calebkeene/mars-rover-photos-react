import 'react-dates/initialize';
import '../../css/App.css';

import React, { Component } from 'react';
import Header from './Header';
import Rover from './Rover';
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
      isFetching: false
    };
    console.log("calling App component constructor");
    console.log(`this.state => ${JSON.stringify(this.state)}`);

    // make sure the setRover method has access to the component state
    this.setRover = this.setRover.bind(this);
    this.setRoverCamera = this.setRoverCamera.bind(this);
    this.setRoverSol = this.setRoverSol.bind(this);
    this.setRoverPhotoDate = this.setRoverPhotoDate.bind(this);
  }

  componentDidMount() {
    console.log("Mounting App component!")
  }

  setRover(name) {
    console.log("calling setRover");
    console.log(`name => ${name}`);
    console.log(this);
    console.log(`before state => ${JSON.stringify(this.state)}`);
    let rovers = this.state.rovers;

    if(rovers[name] === undefined) {
      console.log('rovers[name] === undefined');
      this.setState({isFetching: true});
      this.fetchRover(name).then( newRover => {
        console.log("setRover fetch promise returning");
        let rover = newRover;
        // this will be used for the initial date in the datepicker
        rover['selectedPhotoDate'] = newRover.landing_date;
        rovers[name] = rover;
        this.setState({ currentRoverName: name, rovers: rovers, isFetching: false });
      });
    }
    else {
      console.log('rovers[name] !== undefined')
      console.log(rovers[name]);
    }
    console.log(`name => ${name}`);
    this.setState({ currentRoverName: name, rovers: rovers });
  }

  // TODO: refactor these two methods into one as they're pretty similar
  setRoverCamera(camera) {
    console.log(`running setRoverCamera in App class, camera: ${camera}`);
    let rovers = this.state.rovers;
    let currentRoverName = this.state.currentRoverName;
    let rover = rovers[currentRoverName];
    rover["selectedCamera"] = camera;
    rovers[currentRoverName] = rover;
    this.setState({rovers: rovers});
  }

  setRoverSol(sol) {
    let rovers = this.state.rovers;
    let currentRoverName = this.state.currentRoverName;
    let rover = rovers[currentRoverName];

    rover["selectedSol"] = parseInt(sol, 10);
    rovers[currentRoverName] = rover;
    this.setState(rovers);
  }

  setRoverPhotoDate(date) {
    let rovers = this.state.rovers;
    let currentRoverName = this.state.currentRoverName;
    let rover = rovers[currentRoverName];

    rover["selectedPhotoDate"] = date;
    rovers[currentRoverName] = rover;
    this.setState(rovers);
  }

  fetchRover(name) {
    console.log(`calling fetchRover, name => ${name}`);
    return ApiService.fetchRover(name).then(rover => rover);
  }

  fetchRoverPhotos(sol, camera, limit) {
    if(this.state.currentRoverName === "") {
      console.log("no rover currently set, returning bupkis");
      return null;
    }
    ApiService.fetchRoverPhotos(this.state.currentRoverName, sol, camera, limit);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <p>This will be the mars rover photos page</p>
        <RoverPicker setRover={this.setRover} />
        <Rover
          rover={this.state.rovers[this.state.currentRoverName]}
          setRoverCamera={this.setRoverCamera}
          setRoverSol={this.setRoverSol}
          setRoverPhotoDate={this.setRoverPhotoDate}
          isFetching={this.state.isFetching}
        />
      </div>
    );
  }
}

export default App;
