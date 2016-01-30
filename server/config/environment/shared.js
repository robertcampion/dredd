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
  { name: 'Push open swinging door', type: 'points',     value:   5, count: 1 },
  { name: 'Pull open swinging door', type: 'points',     value:   5, count: 5 },
  { name: 'Release cannon',          type: 'points',     value:   5           },
  { name: 'Lower drop wall',         type: 'points',     value:   5           },
  { name: 'Foam ball in center bin', type: 'points',     value:  30           },
  { name: 'Golf ball in team bin',   type: 'points',     value:  10           },
  { name: 'Personal foul',           type: 'extra',      value: -10, count: 5 },
  { name: 'Technical foul',          type: 'extra',      value: -50           },
  { name: 'Assist stuck robot',      type: 'extra',      value:  +5           },
  { name: 'Airborne robot',          type: 'multiplier', value:   2, count: 1 },
  { name: 'Autonomous robot',        type: 'multiplier', value:   4, count: 1 }
];

// assign ID by index
prototypes.forEach(function(p, n) { p.id = n });



exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  actionPrototypes: prototypes,
  maxTeams: 4 // max teams per game
};
