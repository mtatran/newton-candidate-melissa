import importedComponent from 'react-imported-component';

const Loading = {
	Checkmark: importedComponent(() => import('./checkmark/Checkmark')),
	Circle: importedComponent(() => import('./circle/Circle')),
	Dots: importedComponent(() => import('./dots/Dots')),
	DotsDark: importedComponent(() => import('./dots_dark/DarkDots')),
	Onboard: importedComponent(() => import('./onboard/Onboard')),
	Switch: '' // Need to find a better way of doing mobile/desktop switch (maybe a hook)
};

export default Loading;
