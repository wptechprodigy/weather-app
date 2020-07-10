const rp = require('request-promise');

const getWeatherForecast = (lat, long, callback) => {
  const openWebURI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=86862901d211a3c63e41de218c4ed777&units=metric`;

  const openWebOptions = {
    uri: openWebURI,
    json: true,
  };

  rp(openWebOptions)
    .then((response) => {
      callback(undefined, response);
    })
    .catch(({ error }) => {
      if (error.cod === '400') {
        callback('Unable to find location. Check and try again.', undefined);
        return;
      }

      callback('Unable to connect to weather service.', undefined);
    });
};

module.exports = getWeatherForecast;
