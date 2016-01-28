'use strict';

var app = require('../..');
import request from 'supertest';

var newAction;

describe('Action API:', function() {

  describe('GET /api/actions', function() {
    var actions;

    beforeEach(function(done) {
      request(app)
        .get('/api/actions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          actions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      actions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/actions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/actions')
        .send({
          name: 'New Action',
          info: 'This is the brand new action!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAction = res.body;
          done();
        });
    });

    it('should respond with the newly created action', function() {
      newAction.name.should.equal('New Action');
      newAction.info.should.equal('This is the brand new action!!!');
    });

  });

  describe('GET /api/actions/:id', function() {
    var action;

    beforeEach(function(done) {
      request(app)
        .get('/api/actions/' + newAction._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          action = res.body;
          done();
        });
    });

    afterEach(function() {
      action = {};
    });

    it('should respond with the requested action', function() {
      action.name.should.equal('New Action');
      action.info.should.equal('This is the brand new action!!!');
    });

  });

  describe('PUT /api/actions/:id', function() {
    var updatedAction;

    beforeEach(function(done) {
      request(app)
        .put('/api/actions/' + newAction._id)
        .send({
          name: 'Updated Action',
          info: 'This is the updated action!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAction = {};
    });

    it('should respond with the updated action', function() {
      updatedAction.name.should.equal('Updated Action');
      updatedAction.info.should.equal('This is the updated action!!!');
    });

  });

  describe('DELETE /api/actions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/actions/' + newAction._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when action does not exist', function(done) {
      request(app)
        .delete('/api/actions/' + newAction._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
