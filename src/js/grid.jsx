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

		// this.applyNextState = this.applyNextState.bind(this);
		// this.getSiblingCount = this.getSiblingCount.bind(this);
		// this.generateColumns = this.generateColumns.bind(this);
		// this.generateGrid = this.generateGrid.bind(this);
		// this.getNewKanye = this.getNewKanye.bind(this);
		// this.getNewKanyeImg = this.getNewKanyeImg.bind(this);
		// this.toggleCell = this.toggleCell.bind(this);
		// this.togglePlayPause = this.togglePlayPause.bind(this);
		this.renderGrid = this.renderGrid.bind(this);
		// this.renderRow = this.renderRow.bind(this);
		// this.updateRows = this.updateRows.bind(this);
		// this.updateCols = this.updateCols.bind(this);
	}

	// applyNextState() {
	// 	let newGrid = R.clone(this.state.grid);
	// 	newGrid.forEach((row, rowNum) => {
	// 		row.forEach((cell, colNum) => {
	// 			let siblingCount = this.getSiblingCount(rowNum, colNum);
	// 			let isAlive = false;

	// 			if (cell.isAlive) {
	// 				if (siblingCount === 2 || siblingCount === 3) {
	// 					isAlive = true;
	// 				}
	// 			} else {
	// 				if (siblingCount === 3) {
	// 					isAlive = true;
	// 				}
	// 			}

	// 			if (isAlive && !cell.isAlive) {
	// 				cell.kanye = this.getNewKanyeImg();
	// 			}

	// 			cell.isAlive = isAlive;
	// 		});
	// 	});

	// 	this.setState({
	// 		grid: newGrid
	// 	});
	// }

	// componentDidMount() {
	// 	// setInterval(() => {
	// 	// 	if (this.state.isRunning) {
	// 	// 		this.applyNextState();
	// 	// 	}
	// 	// }, 2000);

	// 	var banner = document.getElementsByTagName('h1')[0];
	// 	var heightAboveRow = banner.getBoundingClientRect().top;
	// 	var bannerRowHeight = banner.parentElement.getBoundingClientRect().bottom;
	// 	var gridHeight = window.innerHeight - bannerRowHeight - heightAboveRow;

	// 	this.setState({
	// 		height: gridHeight
	// 	});
	// }

	componentDidUpdate(prevProps) {

	}

	// getSiblingCount(row, col) {
	// 	let liveSiblings = 0;
	// 	let grid = this.state.grid;
	// 	let row1 = grid[row-1] || [];
	// 	let row2 = grid[row];
	// 	let row3 = grid[row+1] || [];

	// 	var siblings = [
	// 		row1[col-1], row1[col], row1[col+1],
	// 		row2[col-1],					  row2[col+1],
	// 		row3[col-1], row3[col], row3[col+1],
	// 	];

	// 	siblings.forEach((sibling) => {
	// 		if (sibling) {
	// 			liveSiblings += sibling.isAlive ? 1 : 0;
	// 		}
	// 	});

	// 	return liveSiblings;
	// }

	// generateColumns() {
	// 	let cells = [];
	// 	let state = this.state || {};
	// 	let cols = state.cols || this.props.cols;

	// 	R.times(() => {
	// 		cells.push(this.getNewKanye());
	// 	}, cols);

	// 	return cells;
	// }

	// generateGrid() {
	// 	let grid = [];
	// 	let state = this.state || {};
	// 	let rows = state.rows || this.props.rows;

	// 	for (var i = 0; i < rows; i++) {
	// 		grid.push(this.generateColumns(i));
	// 	}

	// 	return grid;
	// }

	// getNewKanye() {
	// 	return {
	// 			isAlive: false,
	// 			kanye: ''
	// 	};
	// }

	// getNewKanyeImg() {
	// 	let num = Math.ceil(Math.random() * 5);
	// 	return `public/img/kw${num}.jpg`;
	// }

	// toggleCell(rowNum, col) {
	// 	let newGrid = R.clone(this.state.grid);

	// 	newGrid[rowNum][col].isAlive = !newGrid[rowNum][col].isAlive;

	// 	if (newGrid[rowNum][col].isAlive) {
	// 		newGrid[rowNum][col].kanye = this.getNewKanyeImg();
	// 	} else {
	// 		newGrid[rowNum][col].kanye = '';
	// 	}

	// 	this.setState({
	// 		grid: newGrid
	// 	});
	// }

	// togglePlayPause() {
	// 	this.setState({
	// 		isRunning: !this.state.isRunning,
	// 	});
	// }

	renderGrid() {
		let rows = this.props.rows;
		let grid = this.props.grid;
		let height = 100 / rows;

		let grid = grid.reduce((prev, curr, idx) => {
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
		let cols = this.props.cols;
		let width = 100 / cols;

		return row.reduce((prev, curr, idx) => {
			prev.push(<Cell
				width={width}
				rowNum={rowNum}
				{...curr}
				isAlive={curr.isAlive}
				kanye={curr.kanye}
				col={idx}
				key={`${rowNum}-${idx}`}
				onClick={this.toggleCell}
			/>);

			return prev;
		}, []);
	}

	// updateRows(event) {
	// 	let rows = event.target.value;
	// 	let newGrid = R.clone(this.state.grid);
	// 	// reverse sign to use in R.times and curr.slice properly
	// 	let lenDiff = (newGrid.length - rows) * -1;

	// 	if (lenDiff > 0) {
	// 		R.times(() => {
	// 			newGrid.push(this.generateColumns());
	// 		}, lenDiff);
	// 	} else if (lenDiff < 0) {
	// 		newGrid = newGrid.slice(0, lenDiff);
	// 	}

	// 	this.setState({
	// 		rows,
	// 		grid: newGrid
	// 	});
	// }

	// updateCols(event) {
	// 	let cols = event.target.value;
	// 	let newGrid = R.clone(this.state.grid);
	// 	// reverse sign to use in R.times and curr.slice properly
	// 	let lenDiff = (newGrid[0].length - cols) * -1;

	// 	if (lenDiff > 0) {
	// 		newGrid = newGrid.map((curr) => {
	// 			R.times(() => {
	// 				curr.push(this.getNewKanye());
	// 			}, lenDiff);

	// 			return curr;
	// 		});
	// 	} else if (lenDiff < 0) {
	// 		newGrid = newGrid.map((curr) => {
	// 			return curr.slice(0, lenDiff);
	// 		});
	// 	}

	// 	this.setState({
	// 		cols,
	// 		grid: newGrid
	// 	});
	// }

	render() {
		return <div id="grid" style={{height: `${this.state.height}px`}}>
			{this.renderGrid()}
		</div>;
	}
}
