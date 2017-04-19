import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import { Button, Col, Row } from 'react-materialize';

import Cell from './components/Cell.jsx';


export default class Grid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 0,
			cols: this.props.cols,
			rows: this.props.rows,
			grid: this.generateGrid(),
			isRunning: false
		};
	}

	applyNextState() {
		let newGrid = R.clone(this.state.grid);
		newGrid.forEach((row, rowNum) => {
			row.forEach((cell, colNum) => {
				let siblingCount = this.getSiblingCount(rowNum, colNum);
				let isAlive = false;

				if (cell.isAlive) {
					if (siblingCount === 2 || siblingCount === 3) {
						isAlive = true;
					}
				} else {
					if (siblingCount === 3) {
						isAlive = true;
					}
				}

				if (isAlive && !cell.isAlive) {
					cell.kanye = this.getNewKanyeImg();
				}

				cell.isAlive = isAlive;
			});
		});

		this.setState({
			grid: newGrid
		});
	}

	componentDidMount () {
		setInterval(() => {
			if (this.state.isRunning) {
				this.applyNextState();
			}
		}, 2000);

		var banner = document.getElementsByTagName('h1')[0];
		var heightAboveRow = banner.getBoundingClientRect().top;
		var bannerRowHeight = banner.parentElement.getBoundingClientRect().bottom;
		var gridHeight = window.innerHeight - bannerRowHeight - heightAboveRow;

		this.setState({
			height: gridHeight
		});
	}

	getSiblingCount(row, col) {
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
				liveSiblings += sibling.isAlive ? 1 : 0;
			}
		});

		return liveSiblings;
	}

	generateColumns() {
		let cells = [];
		let state = this.state || {};
		let cols = state.cols || this.props.cols;

		R.times(() => {
			cells.push(this.getNewKanye());
		}, cols);

		return cells;
	}

	generateGrid() {
		let grid = [];
		let state = this.state || {};
		let rows = state.rows || this.props.rows;

		for (var i = 0; i < rows; i++) {
			grid.push(this.generateColumns(i));
		}

		return grid;
	}

	getNewKanye() {
		return {
				isAlive: false,
				kanye: ''
		};
	}

	getNewKanyeImg() {
		let num = Math.ceil(Math.random() * 5);
		return `public/img/kw${num}.jpg`;
	}

	toggleCell(rowNum, col) {
		let newGrid = R.clone(this.state.grid);

		newGrid[rowNum][col].isAlive = !newGrid[rowNum][col].isAlive;

		if (newGrid[rowNum][col].isAlive) {
			newGrid[rowNum][col].kanye = this.getNewKanyeImg();
		} else {
			newGrid[rowNum][col].kanye = '';
		}

		this.setState({
			grid: newGrid
		});
	}

	togglePlayPause() {
		this.setState({
			isRunning: !this.state.isRunning,
		});
	}

	renderGrid() {
		let state = this.state || {};
		let rows = this.state.grid.length;
		let height = 100 / rows;
		var tots = 0;

		let grid = this.state.grid.reduce((prev, curr, idx) => {

			prev.push((
				<div
					style={{height: `${height}%`}}
					className="gridRow"
					key={`row-${idx}`}>
					{this.renderRow(curr, idx)}
				</div>
			));

			return prev;
		}, []);

		return grid;
	}

	renderRow(row, rowNum) {
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
	}

	updateRows(event) {
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
	}

	updateCols(event) {
		let cols = event.target.value;
		let newGrid = R.clone(this.state.grid);
		// reverse sign to use in R.times and curr.slice properly
		let lenDiff = (newGrid[0].length - cols) * -1;

		if (lenDiff > 0) {
			newGrid = newGrid.map((curr) => {
				R.times(() => {
					curr.push(this.getNewKanye());
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
	}

	render() {
		return <div>
			<Row>
				<h1><a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank">Kanye's Game of Life</a></h1>
			</Row>
			<Row>
				<Col s={2}>
					<Row className="menu">
						<Col s={12}>
							<Row>
								<Col s={6}>
									<label htmlFor="speed">Speed:</label>
									<div className="card">
										<input type="number"
											id="speed"
											value={30} />
									</div>
								</Col>
								<Col s={6}>
									<label>{this.state.isRunning ? 'Pause' : 'Play'}</label>
										<Button
											className="playBtn"
											large
											icon={this.state.isRunning ? 'pause' : 'play_arrow'}
											onClick={this.togglePlayPause} >
										</Button>
								</Col>
							</Row>
							<Row>
								<Col s={6}>
									<label htmlFor="numberCols">Cols:</label>
									<div className="card">
										<input type="number"
											id="numberCols"
											value={this.state.cols}
											onChange={this.updateCols} />
									</div>
								</Col>
								<Col s={6}>
									<label htmlFor="numberRows">Rows:</label>
									<div className="card">
										<input type="number"
											id="numberRows"
											value={this.state.rows}
											className="card"
											onChange={this.updateRows} />
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col s={12}>
							<h4>Rules</h4>
							<ol>
								<li>Any Kanye with fewer than two neighbours dies.</li>
								<li>Any Kanye with two or three neighbours lives on.</li>
								<li>Any Kanye with more than three live neighbours dies, as if he looked and looked around and there were too many Kanyes.</li>
								<li>A Kanye will move into an empty mansion with exactly three neighbour Kanyes.</li>
							</ol>
						</Col>
					</Row>
				</Col>
				<Col s={10}>
					<div id="grid" style={{height: `${this.state.height}px`}}>
						{this.renderGrid()}
					</div>
				</Col>
			</Row>
		</div>
	}
}
