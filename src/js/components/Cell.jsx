var React = require('react');

var Cell = React.createClass({
	onClick: function() {
		var siblingsCount = this.props.getSiblingsCount(this.props.row, this.props.col);
		debugger;
	},
	render: function() {
		return <div className="cell" onClick={this.onClick}></div>
	}
});

module.exports = Cell;
