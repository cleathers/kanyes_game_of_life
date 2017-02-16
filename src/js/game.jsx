var React = require('react');
var ReactDOM = require('react-dom');

var Cell = require('./components/Cell.jsx');


var Grid = React.createClass({
	getSiblingsCount: function (row, col) {
		debugger;


	},
	generateColumns: function(rowNum) {
		let cols = [];
		for (var i = 0; i < this.props.cols; i++) {
			let id = `row-${rowNum}--col-${i}`;
			cols.push(<Cell
				row={rowNum}
				col={i}
				ref={id}
				key={id}
				checkSiblings={this.checkSiblings}
			/>);
		}

		return cols;
	},
	generateGrid: function() {
		let grid = [];

		for (var i = 0; i < this.props.rows; i++) {
			let id = `row-${i}`;
			grid.push((
				 <div className="row" key={id} ref={id} row={i}>
					 {this.generateColumns(i)}
				 </div>
			));
		}

		return grid;
	},
	render: function() {
		return <div id="grid">
			{this.generateGrid()}
		</div>
	}
});

ReactDOM.render(
	  <Grid rows={10} cols={10}/>,
		document.getElementById('container')
);
