'use strict';

var app = require('../..');
import request from 'supertest';

var newGlobal;

describe('Global API:', function() {

  describe('GET /api/globals', function() {
    var globals;

    beforeEach(function(done) {
      request(app)
        .get('/api/globals')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          globals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      globals.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/globals', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/globals')
        .send({
          name: 'New Global',
          info: 'This is the brand new global!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGlobal = res.body;
          done();
        });
    });

    it('should respond with the newly created global', function() {
      newGlobal.name.should.equal('New Global');
      newGlobal.info.should.equal('This is the brand new global!!!');
    });

  });

  describe('GET /api/globals/:id', function() {
    var global;

    beforeEach(function(done) {
      request(app)
        .get('/api/globals/' + newGlobal._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          global = res.body;
          done();
        });
    });

    afterEach(function() {
      global = {};
    });

    it('should respond with the requested global', function() {
      global.name.should.equal('New Global');
      global.info.should.equal('This is the brand new global!!!');
    });

  });

  describe('PUT /api/globals/:id', function() {
    var updatedGlobal;

    beforeEach(function(done) {
      request(app)
        .put('/api/globals/' + newGlobal._id)
        .send({
          name: 'Updated Global',
          info: 'This is the updated global!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGlobal = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGlobal = {};
    });

    it('should respond with the updated global', function() {
      updatedGlobal.name.should.equal('Updated Global');
      updatedGlobal.info.should.equal('This is the updated global!!!');
    });

  });

  describe('DELETE /api/globals/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/globals/' + newGlobal._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when global does not exist', function(done) {
      request(app)
        .delete('/api/globals/' + newGlobal._id)
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
