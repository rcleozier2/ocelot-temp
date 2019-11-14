import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const ExcelView = (props) => {

  const rowGrid = [
    [{value:  1}, {value:  3}],
    [{value:  2}, {value:  4}]
  ];

  return (
    <ReactDataSheet
      data={this.state.grid}
      valueRenderer={(cell) => cell.value}
      onCellsChanged={changes => {
        const grid = rowGrid.map(row => [...row]);
        changes.forEach(({cell, row, col, value}) => {
          grid[row][col] = {...grid[row][col], value}
        });
      }}
    />
  )
};

export default ExcelView;