import ENV from '../config/environment';

let ApiService = {
  fetchRover:  function(name) {
    // TODO: load these from ENV
    let apiBaseUrl = 'https://api.nasa.gov/mars-photos/api/v1';
    //let apiBaseUrl = 'http://localhost:4000/api/v1'
    let apiKey = '6dWdXtuFW7tEPgiWYVFYf3kUxwgU77sARhf5aRtC';

    console.log(`fetching rover ${name}`);
    var url = `${apiBaseUrl}/rovers/${name}?api_key=${apiKey}`;
    console.log(`request URL: ${url}`);

    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error('Error fetching rover:', error))
      .then(responseJson => {
        console.log(`response JSON => ${JSON.stringify(responseJson)}`);
        return responseJson['rover'];
      });
  },
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=6dWdXtuFW7tEPgiWYVFYf3kUxwgU77sARhf5aRtC
  fetchRoverPhotos: function(rover, chronFilter, limit) {
    console.log('fetching rover photos');
    let camera = rover.selectedCamera ? rover.selectedCamera : rover.cameras[0];
    var url = `
      ${ENV.apiBaseUrl}/rovers/${rover.name}/photos?
      api_key=${ENV.apiKey}&camera=${camera}&
      page=1&per_page=${limit}&${chronFilter['key']}=${chronFilter['value']}`;

    console.log(`url: ${url}`);
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log(`response JSON => ${JSON.stringify(responseJson)}`);
        return responseJson['photos'];
      });
  }

}

export default ApiService;