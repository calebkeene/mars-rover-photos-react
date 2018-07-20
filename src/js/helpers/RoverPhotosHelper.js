let RoverPhotosHelper = {
  shiftRoverPhotoId(rover, direction) {
    console.log('calling _shiftRoverPhotoId, direction => ' + direction);
    let photoIds = rover.currentPhotoIds;
    console.log("photoIds => " + JSON.stringify(photoIds));
    let currentPhotoId = rover.currentPhotoId;
    console.log("currentPhotoId => " + currentPhotoId);
    let currentArrayPosition = photoIds.indexOf(currentPhotoId);
    console.log("currentArrayPosition => " + currentArrayPosition);

    let firstPhotoInSet = (currentArrayPosition - 1) < 0;
    let lastPhotoInSet = (currentArrayPosition + 1) > (photoIds.length - 1);

    console.log('firstPhotoInSet => ' + firstPhotoInSet);
    console.log('lastPhotoInSet => ' + lastPhotoInSet);

    if (!currentPhotoId) {
      console.log("missing current photo id, returning first element");
      return photoIds[0];
    }
    if (direction === 'next') {
      console.log('direction is next')
      if (lastPhotoInSet) {
        console.log('last photo in set! returning first element');
        return photoIds[0];
      }
      return photoIds[currentArrayPosition + 1];
    }
    if (direction === 'previous') {
      console.log('direction is previous');
      if (firstPhotoInSet) {
        console.log('first photo in set! returning last element');
        return photoIds[photoIds.length - 1];
      }
      return photoIds[currentArrayPosition - 1];
    }
  }
}

export default RoverPhotosHelper;