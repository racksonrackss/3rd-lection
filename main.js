document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.location-container');
  const input = document.querySelector('.searchbar');
  const api = {
    base: 'https://api.openweathermap.org/data/2.5/',
    key: 'd69e5e34f6ea0481f3618f9dab15c94c',
  };

  const dateBuildor = (d) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  const fetchData = async () => {
    getLoader();
    const response = await fetch(
      `${api.base}weather?q=${city}&appid=${api.key}`
    ).then((res) => res.json());
    const {
      name,
      sys: { country },
      main: { temp },
      weather: [{ main }],
    } = response;

    store = {
      name,
      country,
      temp,
      main,
    };

    responseRenderCompnent();
  };

  const getLoader = () => {
    container.innerHTML = `<span class="loader"></span>`;
  };

  const responseRenderCompnent = () => {
    container.innerHTML = getContent();
  };

  const getContent = () => {
    return `<div class="location-box">
            <div class="location">${store.name}, ${store.country}</div>
            <div class="date">${dateBuildor(new Date())}</div>
          </div>
          <div class="weather-box">
          <div class="temp">${Math.round(store.temp - 273.15)}°с</div>
          <div class="weather">${store.main}</div>
          </div>`;
  };

  input.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value) {
      city = value;
      localStorage.setItem('city', city);
      fetchData();
      e.target.value = '';
    }
  });

  let store = {};
  let city = localStorage.getItem('city') || 'Екатеринбург';
  fetchData();
});
