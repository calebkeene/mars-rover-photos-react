import React, { Component } from 'react';
import '../../css/App.css';
import Header from './Header';
import Buttons from './Buttons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>This will be the mars rover photos page</p>
        <Buttons />
      </div>
    );
  }
}

export default App;
