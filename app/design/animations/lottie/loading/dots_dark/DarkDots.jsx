import Lottie from 'lottie-react-web';
import React from 'react';
import DotsDarkAnimation from './DotsDark.json';

const DotsDark = ({ type, height }) => {
	const set_height = type && type === 'DARK_SIZE' ? height : 50;
	const set_width = type && type === 'DARK_SIZE' ? undefined : 180;
	return (
		<div>
			<Lottie
				options={{
					animationData: DotsDarkAnimation,
					rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
				}}
				speed={0.75}
				width={set_width}
				height={set_height}
			/>
		</div>
	);
};

export default DotsDark;
