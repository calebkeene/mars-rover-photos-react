import React from 'react';

class FetchPhotosButton extends React.Component {
  constructor(props) {
    super(props);
    //this._fetchRoverPhotos = this._fetchRoverPhotos.bind(this);
  }

  // _fetchRoverPhotos() {
  //   this.props.fetchRoverPhotos(this.state.showingSolSelector);
  // }

  render() {
    if (this.props.isShowing) {
      return <button onClick={this.props.fetchRoverPhotos}>Fetch Photos</button>
    }
    else {
      return null;
    }
  }
}

export default FetchPhotosButton;