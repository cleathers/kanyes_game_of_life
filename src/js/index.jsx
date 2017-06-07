import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Row } from 'react-materialize';

import Grid from './grid.jsx';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cols: 30,
			rows: 30,
			grid: []
		};

		this.updateRows = this.updateRows.bind(this);
		this.updateCols = this.updateCols.bind(this);
		this.togglePlayPause = this.togglePlayPause.bind(this);
	}

	updateCols(e) {
		let cols = e.target.value;
		this.setState({
			cols
		});
	}

	updateRows(e) {
		let rows = e.target.value;
		this.setState({
			rows
		});
	}

	togglePlayPause() {
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
					<Grid rows={this.state.rows} cols={this.state.cols}/>
				</Col>
			</Row>
		</div>;
	}
}

ReactDOM.render(
	<Game />,
	document.getElementById('container')
);
