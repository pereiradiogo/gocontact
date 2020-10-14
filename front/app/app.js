import angular from 'angular';

import 'bootstrap';
import chartJs from 'angular-chart.js';

import './scss/app.scss';

import searchModule from './modules/search';

var appModule = angular.module('weatherApp', 
  [
    searchModule,
    chartJs
  ]
);

appModule.controller('appController', []
)