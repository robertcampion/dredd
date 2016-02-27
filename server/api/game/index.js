'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/:id/actions', controller.addAction);
router.delete('/:id/actions/:actionId', controller.removeAction);

// handle state transitions as 'psuedo-actions'

router.post('/:id/actions/start',    controller.start);
router.post('/:id/actions/stop',     controller.stop);
router.post('/:id/actions/complete', controller.complete);

module.exports = router;
