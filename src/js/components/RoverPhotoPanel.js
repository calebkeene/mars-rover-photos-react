import React from 'react';

class RoverPhotoPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.isShowing) {
      let rover = this.props.rover;
      let selectedCamera = rover.selectedCamera;
      let selectedPhotoDate = rover.selectedPhotoDate;
      let selectedPhotoId = rover.currentPhotoId;
      // TODO: dyanmically set these as a range
      let currentPhotoUrl = rover.photos[selectedCamera][selectedPhotoDate][selectedPhotoId];
      return(
        <img src={currentPhotoUrl}></img>
      );
    }
    else {
      return null;
    }
  }
}

export default RoverPhotoPicker;