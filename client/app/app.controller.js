
class AppController {

  constructor($scope, GeoPlace) {
    "ngInject";

    this.GeoPlace = GeoPlace;
    this.$scope = $scope;

    this.inputIsVisible = null;
    this.showForecast = null;
    this.place = null;
    this.denied = null;
    this.noSearchResult = null;

    this.$onInit = function () {

      (!navigator.geolocation)
        ? this.showInput()
        : this.askForLocationAndShowWeather();
    }


  }

  showInput() {
    this.inputIsVisible = true;
  }

  askForLocationAndShowWeather() {
    let vm = this;

    navigator.geolocation.getCurrentPosition((location) => {

        vm.place = new this.GeoPlace({lat:location.coords.latitude, lng:location.coords.longitude});

        vm.place.getWeather()
          .then(res => vm.handleWeather(res))
          .catch(err => {

            if (err == "404") vm.noSearchResult = true;

            console.log('err:',err)
          });
      },

      (err) => {
        this.denied = true;
        this.$scope.$apply();
        console.log('err:',err)
      });




  }

  handleWeather(weatherData) {
    let vm = this;

    vm.showForecast = true;
    vm.noSearchResult = false;

    //get positive integer from temp in Celsius or just 1 if is is zero or below
    let tempRound = tempRound <= 0 ? 1 : weatherData.main.temp | 0;

    // should not be here, but it is here)
    jQuery('.carousel-item:nth-child(1)' ).css({
      'background-image': `url("http://mdbootstrap.com/images/regular/nature/img%20(${tempRound}).jpg")`,
      'background-repeat': 'no-repeat',
      'background-size': 'cover'
    });

    vm.countryName = vm.place.countryName;
    vm.placeName = vm.place.name;
    vm.temperature = vm.place.temperature;
  }

  search() {
    if (!this.searchValue) return;

    let vm = this;

    vm.place = new this.GeoPlace({city: vm.searchValue});
    vm.place.getWeather()
      .then(res => vm.handleWeather(res))
      .catch(err => {
        vm.noSearchResult = true;
        vm.denied = null;
        vm.showForecast = false;
        console.log('err:',err);

      });

  }


}

export default AppController;
