"use strict";

var ColumnGenerator = Class.extend({
  init: function() {
    this.offset = 0;
  },

  next: function() {
    this.offset += _.random(7, 10);

    return this.offset;
  },
});