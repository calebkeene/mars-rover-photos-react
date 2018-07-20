let ComponentsDisplayHelper = {

  showFetchPhotosButton: (appState, rover, fetchBy) => {
    // only show the button if an API call isn't currently underway
    if (!appState.isFetchingRover && !appState.isFetchingPhotos) {
      // make sure there is both a selected earth_date/sol, and the picker is the same type\
      if (fetchBy === 'earth_date' && rover.selectedPhotoDate) {
        return true;
      }
      if (fetchBy === 'sol' && rover.selectedSol) {
        return true;
      }
    }
    return false;
  },

  showRoverPhotoPanel: (rover) => {
    if(!rover) { return false; } // May not need this

    let selectedCamera = rover.selectedCamera;
    let selectedPhotoDate = rover.selectedPhotoDate;

    if(!selectedCamera || !selectedPhotoDate) { return false; }

    if (rover.photos && rover.photos[selectedCamera]) {
      let photosByDate = rover.photos[selectedCamera][selectedPhotoDate];

      if(photosByDate && Object.keys(photosByDate).length > 0) {
        return true;
      }
    }
    return false;
  },

  showScrollPhotoButtons: (rover) => {
    if (
      rover && rover.photos &&
      (Object.keys(rover.photos).length > 0) &&
      rover.selectedCamera &&
      rover.selectedPhotoDate &&
      (rover.currentPhotoIds.length > 0) &&
      rover.currentPhotoId
    ) { return true; }
    return false;
  }
}

export default ComponentsDisplayHelper;
