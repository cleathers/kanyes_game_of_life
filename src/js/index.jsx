import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Row } from 'react-materialize';

import Grid from './grid.jsx';

ReactDOM.render(
	<div>
		<Row>
			<h1><a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank">Kanye's Game of Life</a></h1>
		</Row>
		<Grid rows={30} cols={30}/>
	</div>,
	document.getElementById('container')
);
