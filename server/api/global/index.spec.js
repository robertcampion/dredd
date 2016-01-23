'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var globalCtrlStub = {
  index: 'globalCtrl.index',
  show: 'globalCtrl.show',
  create: 'globalCtrl.create',
  update: 'globalCtrl.update',
  destroy: 'globalCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var globalIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './global.controller': globalCtrlStub
});

describe('Global API Router:', function() {

  it('should return an express router instance', function() {
    globalIndex.should.equal(routerStub);
  });

  describe('GET /api/globals', function() {

    it('should route to global.controller.index', function() {
      routerStub.get
        .withArgs('/', 'globalCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/globals/:id', function() {

    it('should route to global.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'globalCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/globals', function() {

    it('should route to global.controller.create', function() {
      routerStub.post
        .withArgs('/', 'globalCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/globals/:id', function() {

    it('should route to global.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'globalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/globals/:id', function() {

    it('should route to global.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'globalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/globals/:id', function() {

    it('should route to global.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'globalCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
