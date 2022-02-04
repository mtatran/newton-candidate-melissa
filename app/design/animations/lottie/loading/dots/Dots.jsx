import Lottie from 'lottie-react-web';
import React from 'react';
import LoadDots from './LoadDots.json';

const Dots = () => {
	return (
		<div>
			<Lottie
				options={{
					animationData: LoadDots,
					rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
				}}
				speed={0.75}
				width={75}
				height={20}
			/>
		</div>
	);
};

export default Dots;
