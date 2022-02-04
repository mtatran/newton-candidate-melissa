import React, { PureComponent } from 'react';

class Loading extends PureComponent {
	render() {
		return (
			<div
				style={{
					color: '#fff',
					position: 'fixed',
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					transform: 'translateY(-200px)'
				}}></div>
		);
	}
}

export default Loading;
