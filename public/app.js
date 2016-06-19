import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import mappingController from './controllers/mappings'

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';
import list from './templates/list.html';
import mappings from './templates/mappings.html';

chrome
  .setNavBackground('#222222')
  .setTabs([
    {id: 'top', title: 'Top'},
    {id: 'list', title: 'List'},
    {id: 'mappings', title: 'Mapping'}
  ]);

uiRoutes.enable();
uiRoutes
.when('/top', {
  template: template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/movie_dialog_plugin/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
})
.when('/mappings', {
  template: mappings,
  controller: 'mappingController'
})
.when('/list', {
  template: list,
  controller: 'movieListController'
})
.otherwise({
  redirectTo: '/list'
});

uiModules
.get('app/movie_dialog_plugin', [])
.controller('movieDialogPlugin', function ($scope, $http) {
  $scope.title = 'Movie Dialog';
  $scope.description = 'An Kibana plugin for Cornell Movie-Dialog Corpus';
  $scope.indices = [];

  $http.get("../api/movie_dialog_plugin/indices").then(function (response) {
    $scope.indices = response.data;
  });
})
.controller('mappingController', mappingController)
.controller('movieListController', function ($scope, $http) {
  $scope.movies = [{
    title: "x-men"
  }];

  // client.search({
  //   index: 'myindex',
  //   body: {
  //     query: {
  //       match: {
  //         title: 'test'
  //       }
  //     },
  //     facets: {
  //       tags: {
  //         terms: {
  //           field: 'tags'
  //         }
  //       }
  //     }
  //   }
  // }, function (error, response) {
  //   // ...
  // });
});
