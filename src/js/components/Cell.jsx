var React = require('react');

var Cell = React.createClass({
	getNewKanye: function() {
		let num = Math.ceil(Math.random() * 5);
		return `public/img/kw${num}.jpg`;
	},
	handleClick: function() {
		this.props.onClick(this.props.rowNum, this.props.col);
	},
	render: function() {
		if (this.props.isAlive) {
			return <img
				src={this.props.kanye}
				style={{width: `${this.props.width}%`}}
				className="cell alive"
				onClick={this.handleClick}
			/>
		}

		return <div
			className="cell"
			style={{width: `${this.props.width}%`}}
			onClick={this.handleClick}
		></div>
	}
});

Cell.propTypes = {
	isAlive: React.PropTypes.bool,
	kanye: React.PropTypes.string,
	rowNum: React.PropTypes.number,
	col: React.PropTypes.number
};

module.exports = Cell;
