import angular from 'angular';
import searchComponent from './search.component';
import searchServices from './search.services';

const searchModule = angular
    .module('searchModule', [])
    .component('search', searchComponent())
    .service('searchApi', searchServices);

export default searchModule.name;