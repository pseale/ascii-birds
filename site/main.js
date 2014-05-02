
//----------------------------------------------------------------------------

var ColumnGenerator = Class.extend({
  init: function() {
    this.offset = 0;
  },

  next: function() {
    this.offset += _.random(7, 10);

    return this.offset;
  },
});

var Game = Class.extend({
  init: function() {
    this.topColumnGenerator = new ColumnGenerator();
    this.bottomColumnGenerator = new ColumnGenerator();
    this.topColumns = [this.topColumnGenerator.next(), this.topColumnGenerator.next(), this.topColumnGenerator.next()]
    this.bottomColumns = [this.bottomColumnGenerator.next(), this.bottomColumnGenerator.next(), this.bottomColumnGenerator.next()]
  },
  createViewPort: function() {
    viewPort = {
      playerHeight: 6,
      topColumns: this.topColumns,
      bottomColumns: this.bottomColumns,
    };

    return viewPort;
  },
});