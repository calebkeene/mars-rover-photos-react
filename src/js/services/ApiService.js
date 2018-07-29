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
      .then(response => {
        if(!response.ok) {
          console.log("response !ok => throwing error")
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => responseJson['rover']) //{
      //     return responseJson['rover'];
      //   }
      // });
  },
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=6dWdXtuFW7tEPgiWYVFYf3kUxwgU77sARhf5aRtC
  fetchRoverPhotos: function(rover, chronFilter, limit) {
    console.log('fetching rover photos');
    let camera = rover.selectedCamera ? rover.selectedCamera : rover.cameras[0]['name'];
    let apiBaseUrl = 'https://api.nasa.gov/mars-photos/api/v1';
    let apiKey = '6dWdXtuFW7tEPgiWYVFYf3kUxwgU77sARhf5aRtC';

    var url = `
      ${apiBaseUrl}/rovers/${rover.name}/photos?
      &camera=${camera}&page=1&per_page=${limit}
      &${chronFilter['key']}=${chronFilter['value']}
      &api_key=${apiKey}`;

    console.log(`url: ${url}`);
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson['photos'];
      });
  }

}

export default ApiService;