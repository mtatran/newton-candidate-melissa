import React, { PureComponent } from 'react';

class Tooltip extends PureComponent {
	render() {
		return (
			<div className={`tooltip ${this.props.hover ? 'hover' : ''}`}>
				<div className="tooltipContainer">{this.props.title}</div>
			</div>
		);
	}
}

export default Tooltip;
