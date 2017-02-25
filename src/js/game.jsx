var React = require('react');
var ReactDOM = require('react-dom');

var Cell = require('./components/Cell.jsx');


var Grid = React.createClass({
	applyNextState: function() {
		Object.keys(this.refs).forEach((cellId) => {
			this.refs[cellId].setNextState();
		});

		this.setState({
			nextStateSet: true
		});

	},
	componentDidMount: function () {
		setInterval(() => {
			if (this.state.isRunning) {
				this.applyNextState();
			}
		}, 2000);
	},
	componentDidUpdate: function () {
		if (this.state.isRunning && this.state.nextStateSet) {
			Object.keys(this.refs).forEach((cellId) => {
				this.refs[cellId].applyNextState();
			});

			this.setState({
				nextStateSet: false
			});
		}
	},
	getInitialState: function() {
		return {
			grid: this.generateGrid(),
			isRunning: false
		};
	},
	getSiblingsCount: function (row, col, cell) {
		let liveSiblings = 0;
		var siblings = [
			`row-${row-1}--col-${col-1}`, `row-${row-1}--col-${col}`, `row-${row-1}--col-${col+1}`,
			`row-${row}--col-${col-1}`,  														`row-${row}--col-${col+1}`,
			`row-${row+1}--col-${col-1}`, `row-${row+1}--col-${col}`, `row-${row+1}--col-${col+1}`
		];

		siblings.forEach((sibling) => {
			if (this.refs[sibling]) {
				liveSiblings += this.refs[sibling].state.isAlive ? 1 : 0;
			}
		});

		return liveSiblings;
	},
	generateColumns: function(rowNum) {
		let cols = [];
		let width = 100 / this.props.cols;

		for (var i = 0; i < this.props.cols; i++) {
			let id = `row-${rowNum}--col-${i}`;
			cols.push(<Cell
				rowNum={rowNum}
				col={i}
				key={id}
				ref={id}
				width={width}
				getSiblingsCount={this.getSiblingsCount}
			/>);
		}

		return cols;
	},
	generateGrid: function() {
		let grid = [];
		let height = 100 / this.props.rows;

		for (var i = 0; i < this.props.rows; i++) {
			let id = `row-${i}`;
			grid.push((
				<div
					style={{height: `${height}%`}}
					className="row"
					key={id}>
					 {this.generateColumns(i)}
				 </div>
			));
		}

		return grid;
	},
	togglePlayPause: function() {
		this.setState({
			isRunning: !this.state.isRunning,
		});
	},
	render: function() {
		return <div>
			<div id="grid">
				{this.state.grid}
			</div>
			<div className="menu">
				<ul>
					<li><button onClick={this.togglePlayPause}>{this.state.isRunning ? 'Pause' : 'Play'}</button></li>
				</ul>
			</div>
		</div>
	}
});

ReactDOM.render(
	  <Grid rows={10} cols={10}/>,
		document.getElementById('container')
);
