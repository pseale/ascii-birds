"use strict";

function pointRowCol(row, col) {
  return {
    row: row,
    col: col,
    isLegal: function() {
      return this.row >= 0 && this.row < 10 && this.col >= 0 && this.col < 20;
    },
  };
}
