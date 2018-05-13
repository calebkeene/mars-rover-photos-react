import React, { Component } from 'react';
import '../../css/App.css';
import Header from './Header';
import RoverPicker from './RoverPicker';
import CameraPicker from './CameraPicker';
import ApiService from '../services/ApiService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoverName: "",
      rovers: {},
      photos: {}
    };
    console.log("caling App component constructor");
    console.log(`this.state => ${JSON.stringify(this.state)}`);

    // make sure the setRover method has access to the component state
    this.setRover = this.setRover.bind(this);
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
      rovers[name] = this.fetchRover(name);
    }
    else {
      console.log('rovers[name] !== undefined')
      console.log(rovers[name]);
    }
    console.log(`name => ${name}`);
    this.setState({ currentRoverName: name, rovers: rovers });
  }

  fetchRover(name) {
    console.log(`calling fetchRover, name => ${name}`);
    return null;
    //let rover = ApiService.fetchRover(name);
    //return rover;
  }

  fetchRoverPhotos(sol, camera, limit) {
    if(this.state.currentRoverName === "") {
      console.log("no rover currently set, returning bupkis");
      return null;
    }
    return ApiService.fetchRoverPhotos(this.state.currentRoverName, sol, camera, limit);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <p>This will be the mars rover photos page</p>
        <RoverPicker setRover={this.setRover} />
        {/* <CameraPicker fetchRoverPhotos={this.fetchRoverPhotos} /> */}
      </div>
    );
  }
}

export default App;
