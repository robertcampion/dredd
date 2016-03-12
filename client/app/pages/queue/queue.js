'use strict';

angular.module('dreddApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('queue', {
        url: '/queue',
        templateUrl: 'app/pages/queue/queue.html',
        controller: 'QueueCtrl',
        controllerAs: 'queueCtrl'
      });
  });
