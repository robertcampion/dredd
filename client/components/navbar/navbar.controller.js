'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },
  {
    'title': 'Scoreboard',
    'state': 'scoreboard'
  },
  {
    'title': 'Teams',
    'state': 'teams'
  },
  {
    'title': 'Games',
    'state': 'games'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('dreddApp')
  .controller('NavbarController', NavbarController);
