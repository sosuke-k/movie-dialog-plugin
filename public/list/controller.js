export default function ($scope, $http) {
  $scope.movies = [{
    _source: {
      title: 'x-men'
    }
  }];

  $scope.index = 'cornell_movie_dialogs_corpus';
  $http.get('../api/movie_dialog_plugin/movies').then(function (response) {
    console.log("data", response);
    $scope.total = response.data.total;
    $scope.movies = response.data.hits;
  });
};
