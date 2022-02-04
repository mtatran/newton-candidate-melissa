import React, { PureComponent } from 'react';

class Error extends PureComponent {
	render() {
		return (
			<div
				style={{
					color: '#DA4167',
					position: 'absolute',
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<span>Error!</span>
			</div>
		);
	}
}

export default Error;
