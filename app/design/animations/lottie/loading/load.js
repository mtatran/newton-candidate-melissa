import React from 'react';
import Lottie from 'lottie-react-web';
import LoadDotsDark from './dots_dark/DotsDark.json';
import LoadDots from './dots/LoadDots.json';

export const LoadSwitch = () => {
	return (
		<React.Fragment>
			<div className="desktop">
				<Lottie
					options={{
						animationData: LoadDotsDark,
						rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
					}}
					speed={0.75}
					width={180}
					height={50}
				/>
			</div>
			<div className="mobile">
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
		</React.Fragment>
	);
};
