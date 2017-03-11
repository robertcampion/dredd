(function(angular, undefined) {
'use strict';

angular.module('dreddApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],actionPrototypes:[{name:'Traversed tunnel',kind:'points',value:5,count:1,prototypeId:0},{name:'Tunnel before 45s',kind:'points',value:10,count:1,prototypeId:1},{name:'Inserted key',kind:'points',value:10,count:1,prototypeId:2},{name:'Regular ball',kind:'points',value:20,count:6,prototypeId:3},{name:'Bonus ball',kind:'points',value:30,count:2,prototypeId:4},{name:'Late ball',kind:'points',value:10,prototypeId:5},{name:'Personal foul',kind:'extra',value:-10,count:5,prototypeId:6},{name:'Technical foul',kind:'extra',value:-50,prototypeId:7},{name:'Assist stuck robot',kind:'extra',value:5,prototypeId:8},{name:'Airborne robot',kind:'multiplier',value:2,prototypeId:9},{name:'Autonomous robot',kind:'multiplier',value:4,prototypeId:10},{name:'Reset multiplier',kind:'multiplier',value:1,prototypeId:11},{name:'Disabled',kind:'points',value:0,prototypeId:12}],defaultDuration:360000,numTeams:4,colors:['red','yellow','green','white']})

;
})(angular);