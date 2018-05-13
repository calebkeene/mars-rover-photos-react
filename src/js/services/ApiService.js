import ENV from '../config/environment';

let ApiService = {
  fetchRover:  function(name) {
    console.log(`fetching rover ${name}`);
    var url = `${ENV.apiBaseUrl}/rovers/${name}?api_key=${ENV.apiKey}`;
    console.log(`request URL: ${url}`);
  },

  fetchRoverPhotos: function(name, sol, camera, limit) {
    console.log('fetching rover photos');
    var url = `
      ${ENV.apiBaseUrl}/rovers/${name}/photos?
      api_key=${ENV.apiKey}&sol=${sol}&camera=${camera}&
      page=1&per_page=${limit}`;

    console.log(`url: ${url}`);
  }
}

export default ApiService;