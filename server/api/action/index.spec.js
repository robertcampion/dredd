'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var actionCtrlStub = {
  index: 'actionCtrl.index',
  show: 'actionCtrl.show',
  create: 'actionCtrl.create',
  update: 'actionCtrl.update',
  destroy: 'actionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var actionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './action.controller': actionCtrlStub
});

describe('Action API Router:', function() {

  it('should return an express router instance', function() {
    actionIndex.should.equal(routerStub);
  });

  describe('GET /api/actions', function() {

    it('should route to action.controller.index', function() {
      routerStub.get
        .withArgs('/', 'actionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/actions/:id', function() {

    it('should route to action.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'actionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/actions', function() {

    it('should route to action.controller.create', function() {
      routerStub.post
        .withArgs('/', 'actionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/actions/:id', function() {

    it('should route to action.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'actionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/actions/:id', function() {

    it('should route to action.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'actionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/actions/:id', function() {

    it('should route to action.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'actionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
