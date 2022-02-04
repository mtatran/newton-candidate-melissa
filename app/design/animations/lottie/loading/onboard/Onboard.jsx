import Lottie from 'lottie-react-web';
import React from 'react';
import OnboardAnimation from './OnboardLoad.json';

const Onboard = (width = 420, height = 250) => {
	return (
		<div>
			<Lottie
				options={{
					animationData: OnboardAnimation,
					rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
				}}
				speed={0.75}
				width={width}
				height={height}
			/>
		</div>
	);
};

export default Onboard;
