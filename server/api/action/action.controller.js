/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/actions              ->  index
 * POST    /api/actions              ->  create
 * GET     /api/actions/:id          ->  show
 * PUT     /api/actions/:id          ->  update
 * DELETE  /api/actions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Action from './action.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
    console.log(err);
  };
}

// Gets a list of Actions
export function index(req, res) {
  Action.find()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Action from the DB
export function show(req, res) {
  Action.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Action in the DB
export function create(req, res) {
  Action.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Action in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Action.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Action from the DB
export function destroy(req, res) {
  Action.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
