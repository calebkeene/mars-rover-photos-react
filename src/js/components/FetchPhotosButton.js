import React from 'react';

class FetchPhotosButton extends React.Component {
  render() {
    if (this.props.isShowing) {
      return <button onChange={this.props.fetchRoverPhotos}>Fetch Photos</button>
    }
    else {
      return null;
    }
  }
}

export default FetchPhotosButton;