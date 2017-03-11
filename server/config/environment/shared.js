'use strict';

  // allowed game actions
  //  - id: action id (used for tracking count)
  //  - name: string displayed to the user
  //  - type: type of action, currently allowed types are:
  //    * points: adds value to base score (affected by multiplier)
  //    * extra: adds value to final score (not affected by multiplier)
  //    * multiplier: multiplies value into multiplier
  //  - value: base numerical value of the action
  //  - count: number of times the action is allowed to occur (undef = unlimited)

var prototypes = [
  { name: 'Traversed tunnel', kind: 'points',     value:   5, count: 1 },
  { name: 'Traversed tunnel (before 45 sec)', kind: 'points',     value:   10, count: 1 },
  { name: 'Inserted key',          kind: 'points',     value:   10, count: 1 },
  { name: 'Team/neutral ball',         kind: 'points',     value:  20, count: 6 },
  { name: 'Bonus ball', kind: 'points',     value:  30, count: 2 },
  //{ name: 'Golf ball in team bin',   kind: 'points',     value:  10, count: 16 },
  { name: 'Personal foul',           kind: 'extra',      value: -10, count: 5 },
  { name: 'Technical foul',          kind: 'extra',      value: -50           },
  { name: 'Assist stuck robot',      kind: 'extra',      value:  +5           },
  { name: 'Airborne robot',          kind: 'multiplier', value:   2 },
  { name: 'Autonomous robot',        kind: 'multiplier', value:   4 },
  { name: 'Reset multiplier',        kind: 'multiplier', value:   1 }
];

// assign ID by index
prototypes.forEach(function(p, n) { p.prototypeId = n });



exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  actionPrototypes: prototypes,
  defaultDuration: (6 * 60 * 1000),
  numTeams: 4, // number of teams per game
  colors: ['red', 'yellow', 'green', 'white']
};
