import angular from 'angular';

import AppComponent from './app.component';

// import AppModels from './models/models';

// import WeatherService from './services/weatherService';

import GeoPlace from './models/GeoPlace.model';

import 'normalize.css';

angular.module('app', [

    // AppModels
  ])
  .service('GeoPlace', GeoPlace)
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
