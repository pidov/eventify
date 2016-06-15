var Events = require('../index.js');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('ip.events', function() {
  describe('event', function() {
    var customEvent = new Events();
    
    it('has on method', function() {
      expect(customEvent.on).to.be.a('function'); 
    })

    it('has off method', function() {
      expect(customEvent.off).to.be.a('function');
    })

    it('has emit method', function() {
      expect(customEvent.emit).to.be.a('function'); 
    })
    
    it('executes callback when event is emitted', function() {
      var callback = sinon.spy();
      customEvent.on('testEvent', callback);
      customEvent.emit('testEvent')
      expect(callback.called).to.be.true
    })
    
    it('executes callback with correct arguments when event is emitted', function() {
      var callback = sinon.spy();
      customEvent.on('testEvent', callback);
      customEvent.emit('testEvent', "first", {obj: 'second'});
      expect(callback.calledWith("first", {obj: 'second'})).to.be.true
    })

    it('executes callback in context of another object', function() {
      var obj = {};
      customEvent.on('testEvent', function() {
        expect(this).to.equal(obj);
      }, obj);

      customEvent.emit('testEvent');
    })

    it('executes callback in context of containing object', function() {
      customEvent.on('estEvent', function() {
        expect(this).to.equal(customEvent);
      })
      customEvent.emit('estEvent');
    })
  }) 
})
