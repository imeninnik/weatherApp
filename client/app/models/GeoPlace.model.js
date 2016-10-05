
export default function GeoPlace($q, $http) {
  'ngInject';

  const APIKEY = 'a0931182e8e99e3c8afb7ae81fccaae6';
  const PATH =`http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APIKEY}`;

  let cache;

  class GeoPlaceModel {
    constructor(params) {
      this.country = null;
      this.city = null;
      this.lat = null;
      this.lng = null;

      this.forecastData = null;

      for (let key in params) {
        if (params.hasOwnProperty(key) ) this[key] = params[key];
      }
    }

      getWeather() {
        var deferred = $q.defer();

        if (this.lat && this.lng) {
         $http.get(`${PATH}&lat=${this.lat}&lon=${this.lng}`)
           .then(res => {
             console.log(res);
             cache = res.data;

             if (res.data.cod == '404' || !res.data) return deferred.reject(404);

             this.forecastData = res.data;
             deferred.resolve(res.data);
           })
           .catch(err => deferred.reject(err));
        }

       else if (this.city) {
         $http.get(`${PATH}&q=${this.city}`)
           .then(res => {
             console.log('search', res);
             //cache = res.data;

             if (res.data.cod == '404' || !res.data) return deferred.reject(404);
             this.forecastData = res.data;
             deferred.resolve(res.data);
           })
           .catch(err => deferred.reject(err));
       }

        return deferred.promise;


    }

    get countryName() {
      return this.forecastData.sys.country;
    }

    get name() {
      return this.forecastData.name;
    }

    get temperature() {
      return this.forecastData.main.temp;
    }
  }

  return GeoPlaceModel

}

