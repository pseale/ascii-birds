describe("Generating columns", function() {
  var columnGenerator = {};

  beforeEach(function() {
    columnGenerator = new ColumnGenerator();
  });

  it("generates the first column between position 7 and 10", function() {
    var column = columnGenerator.next();
    expect(column >= 7 && column <= 10 ).toBeTruthy();
  });

  it("generates subsequent columns from 7 to 10 columns away", function() {
    var firstColumn = columnGenerator.next();
    var secondColumn = columnGenerator.next();
    var offset = secondColumn - firstColumn;
    expect(offset >= 7 && offset <= 10).toBeTruthy();
  });
});