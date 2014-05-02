var HardcodedColumnGenerator = Class.extend({
  init: function(array) {
    this.array = array;
  },

  next: function() {
    return this.array.shift();
  }
});

describe("Finding columns in range", function() {
  var column = {};

  beforeEach(function() {
    column = new Column();
    column.columnGenerator = new HardcodedColumnGenerator([10-2, 10-1, 10, 10+18, 10+19 ]);
  });

  it("excludes any column 2 spaces behind the player", function() {
    var columnsInRange = column.findAllNearby(10); 
    expect(column.findAllNearby(10)).not.toContain(10-2);
  });

  it("includes any column 1 space behind the player", function() {
    var columnsInRange = column.findAllNearby(10); 
    expect(column.findAllNearby(10)).toContain(10-1);
  });

  it("includes any column in the same space as the player", function() {
    var columnsInRange = column.findAllNearby(10); 
    expect(column.findAllNearby(10)).toContain(10);
  });

  it("includes any column in front of the player within range", function() {
    var columnsInRange = column.findAllNearby(10+18); 
    expect(column.findAllNearby(10)).toContain(10+18);
  });

  it("excludes any column in front of the player beyond visible range", function() {
    var columnsInRange = column.findAllNearby(10+19); 
    expect(column.findAllNearby(10)).not.toContain(10+19);
  });
});