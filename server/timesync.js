'use strict';

var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({now: Date.now()});
});

module.exports = router;
