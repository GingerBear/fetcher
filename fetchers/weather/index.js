require('../../lib/prepare');

var upload = require('.././lib/upload');
var fetchWeather = require('./weather');

fetchWeather()
  .then(data => {
    return upload(
      `/weather.json`,
      JSON.stringify({
        lastUpdate: Date.now(),
        data: data
      })
    );
  })
  .then(response => {
    console.log(response);
    process.exit(0);
  });
