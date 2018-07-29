import React from 'react';
import '../../styles/css/Button.css';

class FetchPhotosButton extends React.Component {
  render() {
    if (this.props.isShowing) {
      return(
        <div class='cell small-6 medium-5'>
          <button class='button primary button--fetch-photos' onClick={this.props.fetchRoverPhotos}>Fetch Photos</button>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default FetchPhotosButton;