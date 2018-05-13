
module.exports = function (environment) {
  let ENV = {
    apiKey: '6dWdXtuFW7tEPgiWYVFYf3kUxwgU77sARhf5aRtC',
    apiBaseUrl: 'https://api.nasa.gov/mars-photos/api/v1',
    roverNames: ['spirit', 'opportunity', 'curiosity'],
    roverCameras: {
      fhaz: 'Front Hazard Avoidance Camera',
      rhaz: 'Rear Hazard Avoidance Camera',
      mast: 'Mast Camera',
      chemcam: 'Chemistry and Camera Complex',
      mahli: 'Mars Hand Lens Imager',
      mardi: 'Mars Descent Imager',
      navcam: 'Navigation Camera',
      pancam: 'Panoramic Camera',
      minites: 'Miniature Thermal Emission Spectrometer (Mini-TES)'
    }
  }
  return ENV;
};
