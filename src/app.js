const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getLatLong = require('./utils/getLatLong');
const getWeatherForecast = require('./utils/getWeatherForecast');

const app = express();

// Port definition
const PORT = process.env.PORT || 3030;

// Define path for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectory));
app.set('x-powered-by', false);

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Weather app',
    isActive: true,
    title: 'Weather app',
    name: 'Waheed Afolabi',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  getLatLong(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    // const { latitude, longitude, location } = data;

    getWeatherForecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }

      const {
        current: { temp, weather },
      } = forecast;
      const forecastMsg = `${weather[0].description}. The temperature is ${temp} degrees outside.`;

      res.send({
        location,
        forecast: forecastMsg,
        address,
      });
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    title: 'About me',
    name: 'Waheed Afolabi',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help',
    title: 'Help',
    name: 'Waheed Afolabi',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    pageTitle: '404 - Page',
    title: '404 Not Found',
    name: 'Waheed Afolabi',
    errorMessage: 'Help article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    pageTitle: '404 - Page',
    title: '404 Not Found',
    name: 'Waheed Afolabi',
    errorMessage: 'Page not found!',
  });
});

app.listen(PORT, () => console.log('Listening on port:', PORT));
