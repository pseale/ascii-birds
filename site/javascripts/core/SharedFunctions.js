function pointRowCol(row, col) {
  return {
    row: row,
    col: col,
    isLegal: function() {
      return this.row >= 0 && this.row < 10 && this.col >= 0 && this.col < 20;
    },    
    // x: col,
    // y: row,
  };
}

// function pointXy(x, y) {
//   return pointRowCol(y, x);
// }