var React = require('react');

var Cell = React.createClass({
	getInitialState: function() {
		let isAlive = false;
		let nextState = false;
		let kanye = '';

		return {
			isAlive,
			nextState
		};
	},
	getNewKanye: function() {
		let num = Math.ceil(Math.random() * 5);
		return `public/img/kw${num}.jpg`;
	},
	onClick: function() {
		let isAlive = !this.state.isAlive;
		let kanye = isAlive ? this.getNewKanye() : '';

		this.setState({
			isAlive,
			kanye
		});
	},
	applyNextState: function() {
		let kanye = '';
		if (this.state.isAlive && this.state.nextState) {
			kanye = this.state.kanye;
		} else if (!this.state.isAlive && this.state.nextState) {
			kanye = this.getNewKanye();
		}

		this.setState({
			isAlive: this.state.nextState,
			kanye
		});
	},
	setNextState: function() {
		let isAlive = false;
		var siblingsCount = this.props.getSiblingsCount(this.props.rowNum, this.props.col, this);

		if (this.state.isAlive) { // Any Live Cell
			if (siblingsCount === 2 || siblingsCount === 3) {
				isAlive = true;
			}
		} else { // Any Dead Cell
			if (siblingsCount === 3) { // generate new cell
				isAlive = true;
			}
		}

		this.setState({
			nextState: isAlive
		});
	},
	render: function() {
		if (this.state.isAlive) {
			return <img
				src={this.state.kanye}
				style={{width: `${this.props.width}%`}}
				className="cell alive"
				onClick={this.onClick}
			/>
		}

		return <div
			className="cell"
			onClick={this.onClick}
			style={{width: `${this.props.width}%`}}
		></div>
	}
});

Cell.propTypes = {
	rowNum: React.PropTypes.number,
	col: React.PropTypes.number,
	siblingsCount: React.PropTypes.number,
	lastState: React.PropTypes.shape({
		isActive: React.PropTypes.bool,
		kanye: React.PropTypes.string
	}),
	shouldRender: React.PropTypes.bool
};

module.exports = Cell;
