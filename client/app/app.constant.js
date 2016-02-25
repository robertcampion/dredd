(function(angular, undefined) {
'use strict';

angular.module('dreddApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],actionPrototypes:[{name:'Push open swinging door',kind:'points',value:5,count:1,prototypeId:0},{name:'Pull open swinging door',kind:'points',value:5,count:5,prototypeId:1},{name:'Release cannon',kind:'points',value:5,prototypeId:2},{name:'Lower drop wall',kind:'points',value:5,prototypeId:3},{name:'Foam ball in center bin',kind:'points',value:30,prototypeId:4},{name:'Golf ball in team bin',kind:'points',value:10,prototypeId:5},{name:'Personal foul',kind:'extra',value:-10,count:5,prototypeId:6},{name:'Technical foul',kind:'extra',value:-50,prototypeId:7},{name:'Assist stuck robot',kind:'extra',value:5,prototypeId:8},{name:'Airborne robot',kind:'multiplier',value:2,count:1,prototypeId:9},{name:'Autonomous robot',kind:'multiplier',value:4,count:1,prototypeId:10}],defaultDuration:300000,numTeams:4,colors:['red','yellow','green','white']})

;
})(angular);