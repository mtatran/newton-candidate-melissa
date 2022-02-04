import Lottie from 'lottie-react-web';
import React from 'react';
import CircleAnimation from './Circle.json';

const Circle = ({ width = 75, height = 75 }) => {
	return (
		<div>
			<Lottie
				options={{
					animationData: CircleAnimation,
					rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
				}}
				speed={0.75}
				width={width}
				height={height}
			/>
		</div>
	);
};

export default Circle;
