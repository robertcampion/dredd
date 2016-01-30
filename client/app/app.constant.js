(function(angular, undefined) {
'use strict';

angular.module('dreddApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],actionPrototypes:[{name:'Push open swinging door',type:'points',value:5,count:1,id:0},{name:'Pull open swinging door',type:'points',value:5,count:5,id:1},{name:'Release cannon',type:'points',value:5,id:2},{name:'Lower drop wall',type:'points',value:5,id:3},{name:'Foam ball in center bin',type:'points',value:30,id:4},{name:'Golf ball in team bin',type:'points',value:10,id:5},{name:'Personal foul',type:'extra',value:-10,count:5,id:6},{name:'Technical foul',type:'extra',value:-50,id:7},{name:'Assist stuck robot',type:'extra',value:5,id:8},{name:'Airborne robot',type:'multiplier',value:2,count:1,id:9},{name:'Autonomous robot',type:'multiplier',value:4,count:1,id:10}],maxTeams:4})

;
})(angular);