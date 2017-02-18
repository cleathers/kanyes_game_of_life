var React = require('react');

var Cell = React.createClass({
	getInitialState: function() {
		let isAlive = false;
		let nextState = false;
		return {
			isAlive,
			nextState
		};
	},
	onClick: function() {
		this.setState({
			isAlive: !this.state.isAlive
		});
	},
	applyNextState: function() {
		this.setState({
			isAlive: this.state.nextState
		});
	},
	setNextState: function() {
		let isAlive;
		var siblingsCount = this.props.getSiblingsCount(this.props.rowNum, this.props.col, this);

		if (this.state.isAlive) { // Any Live Cell
			if (siblingsCount < 2) {
				isAlive = false;
			} else if (siblingsCount === 2 || siblingsCount === 3) {
				isAlive = true;
			} else if (siblingsCount > 3) {
				isAlive = false;
			}
		} else { // Any Dead Cell
			if (siblingsCount === 3) { // generate new cell
				isAlive = true;
			} else {
				isAlive = false;
			}
		}

		this.setState({
			nextState: isAlive
		});
	},
	render: function() {
		return <div className={`cell ${this.state.isAlive ? 'alive' : ''}`} onClick={this.onClick}></div>
	}
});

module.exports = Cell;
