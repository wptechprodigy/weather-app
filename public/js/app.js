const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msgOne = document.querySelector('#msg-one');
const msgTwo = document.querySelector('#msg-two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const address = input.value;

  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
        msgTwo.textContent = '';
        input.value = '';
        return;
      }

      const { location, forecast } = data;
      const formattedForecast = `${forecast[0].toUpperCase()}${forecast.slice(
        1
      )}`;

      msgOne.textContent = location;
      msgTwo.textContent = formattedForecast;
      input.value = '';
    });
  });
});
