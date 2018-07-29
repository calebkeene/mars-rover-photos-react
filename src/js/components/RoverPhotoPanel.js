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
      return <img class='rover__photo-panel--photo cell small-12 medium-10 medium-offset-1 large-8 large-offset-2' src={currentPhotoUrl} />;
    }
    else {
      return (
        <React.Fragment>
          <div class='cell small-12 medium-10 medium-offset-1 rover__photo-panel'>
            <img class='rover__photo-panel--photo' src={require('../../images/OSIRIS_Mars_true_color.jpg')} />
          </div>
        </React.Fragment>
      )
    }
  }
}

export default RoverPhotoPicker;