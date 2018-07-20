import React from 'react';
import '../../styles/css/Rover.css';

class RoverPhotoPicker extends React.Component {
  render() {
    if(this.props.isShowing) {
      let rover = this.props.rover;
      let selectedCamera = rover.selectedCamera;
      let selectedPhotoDate = rover.selectedPhotoDate;
      // TODO: dyanmically set this, selecting from all photo ids
      let selectedPhotoId = rover.currentPhotoId;
      let currentPhotoUrl = rover.photos[selectedCamera][selectedPhotoDate][selectedPhotoId];
      return(
        <div class='rover__photo-panel'>
          <img class='rover__photo-panel--photo' src={currentPhotoUrl} />
        </div>
      );
    }
    else {
      if(this.props.showNoPhotoResults) {
        return (
          <React.Fragment>
            <div class='rover__photo-panel'>
              <img class='rover__photo-panel--photo' src={require('../../images/OSIRIS_Mars_true_color.jpg')} />
              <p class='rover__photo-panel--no-result-msg'>No Results!</p>
            </div>
          </React.Fragment>
        )
      }
      else {
        // TODO: refactor this to single class
        return (
          <div class='rover__photo-panel'>
            <img class='rover__panel-panel--photo' src={require('../../images/OSIRIS_Mars_true_color.jpg')} />
          </div>
        )
      }
    }
  }
}

export default RoverPhotoPicker;