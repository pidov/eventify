module.exports = function() {
  return {
    on: function(event, callback, context) {
      this.hasOwnProperty('events') || (this.events = {});
      this.events.hasOwnProperty(event) || (this.events[event] = []);
      this.events[event].push([callback, context]);

    },
    off: function() {
    
    },
    emit: function(event) {
      var i = 0,
          callbacks = this.events[event],
          tail = Array.prototype.slice.call(arguments, 1);

      for(i, len = callbacks.length; i < len; i++) {
        var callback = callbacks[i][0],
	    context = callbacks[i][1] === undefined ? this : callbacks[i][1];
	
	callback.apply(context, tail);
      }
    }
  }
}
