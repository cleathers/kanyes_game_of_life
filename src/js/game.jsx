var React = require('react');
var ReactDOM = require('react-dom');
var R = require('ramda');

var Cell = require('./components/Cell.jsx');


var Grid = React.createClass({
	// applyNextState: function() {
	// 	this.state.grid.forEach((row) => {
	// 		row.forEach((cell) => {
	// 			cell.setNextState();
	// 		});
	// 	});

	// 	this.setState({
	// 		nextStateSet: true
	// 	});

	// },
	// componentDidMount: function () {
	// 	setInterval(() => {
	// 		if (this.state.isRunning) {
	// 			this.applyNextState();
	// 		}
	// 	}, 2500);
	// },
	// componentDidUpdate: function () {
	// 	if (this.state.isRunning && this.state.nextStateSet) {
	// 		this.state.grid.forEach((row) => {
	// 			row.forEach((cell) => {
	// 				cell.applyNextState();
	// 			});
	// 		});

	// 		this.setState({
	// 			nextStateSet: false
	// 		});
	// 	}
	// },
	//
	getInitialState: function() {
		return {
			cols: this.props.cols,
			rows: this.props.rows,
			grid: this.generateGrid(),
			isRunning: false
		};
	},

	getSiblingsCount: function (row, col, cell) {
		let liveSiblings = 0;
		let grid = this.state.grid;
		let row1 = grid[row-1] || [];
		let row2 = grid[row];
		let row3 = grid[row+1] || [];

		var siblings = [
			row1[col-1], row1[col], row1[col+1],
			row2[col-1],					  row2[col+1],
			row3[col-1], row3[col], row3[col+1],
		];

		siblings.forEach((sibling) => {
			if (sibling) {
				liveSiblings += sibling.state.isAlive ? 1 : 0;
			}
		});

		return liveSiblings;
	},

	generateColumns: function() {
		let cells = [];
		let state = this.state || {};
		let cols = state.cols || this.props.cols;

		R.times(function() {
			cells.push({
				isAlive: false,
				kanye: ''
			});
		}, cols);

		return cells;
	},

	generateGrid: function() {
		let grid = [];
		let state = this.state || {};
		let rows = state.rows || this.props.rows;

		for (var i = 0; i < rows; i++) {
			grid.push(this.generateColumns(i));
		}

		return grid;
	},

	getNewKanye: function() {
		let num = Math.ceil(Math.random() * 5);
		return `public/img/kw${num}.jpg`;
	},

	toggleCell: function(rowNum, col) {
		let newGrid = R.clone(this.state.grid);

		newGrid[rowNum][col].isAlive = !newGrid[rowNum][col].isAlive;

		if (newGrid[rowNum][col].isAlive) {
			newGrid[rowNum][col].kanye = this.getNewKanye();
		} else {
			newGrid[rowNum][col].kanye = '';
		}

		this.setState({
			grid: newGrid
		});
	},

	togglePlayPause: function() {
		this.setState({
			isRunning: !this.state.isRunning,
		});
	},

	renderGrid: function() {
		let state = this.state || {};
		let rows = this.state.grid.length;
		let height = 100 / rows;
		var tots = 0;

		let grid = this.state.grid.reduce((prev, curr, idx) => {

			tots += height;
			prev.push((
				<div
					style={{height: `${height}%`}}
					className="row"
					key={`row-${idx}`}>
					{this.renderRow(curr, idx)}
				</div>
			));

			return prev;
		}, []);

		return grid;
	},

	renderRow: function(row, rowNum) {
		let state = this.state || {};
		let cols = state.cols || this.props.cols;
		let width = 100 / cols;

		return row.reduce((prev, curr, idx) => {
			prev.push(<Cell
				width={width}
				rowNum={rowNum}
				isAlive={curr.isAlive}
				kanye={curr.kanye}
				col={idx}
				key={`${rowNum}-${idx}`}
				onClick={this.toggleCell}
			/>);

			return prev;
		}, []);
	},

	updateRows: function(event) {
		let rows = event.target.value;
		let newGrid = R.clone(this.state.grid);
		// reverse sign to use in R.times and curr.slice properly
		let lenDiff = (newGrid.length - rows) * -1;

		if (lenDiff > 0) {
			R.times(() => {
				newGrid.push(this.generateColumns());
			}, lenDiff);
		} else if (lenDiff < 0) {
			newGrid = newGrid.slice(0, lenDiff);
		}

		this.setState({
			rows,
			grid: newGrid
		});
	},

	updateCols: function(event) {
		let cols = event.target.value;
		let newGrid = R.clone(this.state.grid);
		// reverse sign to use in R.times and curr.slice properly
		let lenDiff = (newGrid[0].length - cols) * -1;

		if (lenDiff > 0) {
			newGrid = newGrid.map((curr) => {
				R.times(() => {
					curr.push({
						isAlive: false,
						kanye: ''
					});
				}, lenDiff);

				return curr;
			});
		} else if (lenDiff < 0) {
			newGrid = newGrid.map((curr) => {
				return curr.slice(0, lenDiff);
			});
		}

		this.setState({
			cols,
			grid: newGrid
		});
	},

	render: function() {
		return <div>
			<div id="grid" >
				{this.renderGrid()}
			</div>
			<div className="menu">
				<ul>
					<li><button onClick={this.togglePlayPause}>{this.state.isRunning ? 'Pause' : 'Play'}</button></li>
					<li>Cols: <input type="number" value={this.state.cols} onChange={this.updateCols} /></li>
					<li>Rows: <input type="number" value={this.state.rows} onChange={this.updateRows} /></li>
				</ul>
			</div>
		</div>
	}
});

ReactDOM.render(
	  <Grid rows={30} cols={30}/>,
		document.getElementById('container')
);
