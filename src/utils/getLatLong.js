const rp = require('request-promise');

const getLatLong = (address, callback) => {
  const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoid2FoZWVkYWZvbGFiaSIsImEiOiJjazZvb3RmbWIxOXA5M2xwNnl6d3hiM2dxIn0.0ucUVcsZ-lN_M3q9TuBNQg&limit=1`;

  const geoCodeOptions = {
    uri: geoCodeURL,
    json: true,
  };

  rp(geoCodeOptions)
    .then(({ features }) => {
      if (features.length === 0) {
        callback(
          'Unable to find location, try again with another search term.',
          undefined
        );
        return;
      }

      const { center, place_name } = features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    })
    .catch((err) => {
      callback('Something went wrong.', undefined);
    });
};

module.exports = getLatLong;
