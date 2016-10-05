let WeatherService = function () {


  let service = {};

  service.getWeatherByLocation = getWeatherByLocation;

  return service;

  function getWeatherByLocation(lat, lng) {
    console.log('will search for weather in :', lat, lng);
  }

};


export default WeatherService;
