export default function ($scope, $http) {
  $scope.mappings = {};
  $scope.index = "cornell_movie_dialogs_corpus";
  $http.get(`../api/movie_dialog_plugin/index/${$scope.index}/mappings`).then(function (response) {
    $scope.mappings = response.data;
  });
};
