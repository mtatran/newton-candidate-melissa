import React, { useEffect } from 'react';
import importedComponent from 'react-imported-component';

const Login = importedComponent(() => import('../login/Login'));
const DefaultMobile = importedComponent(() => import('./mobile/DefaultMobile'));

const DefaultHome = () => {
	useEffect(prevProps => {
		if (!prevProps) {
			localStorage.removeItem('refId');
		}
	});

	if (window.innerWidth < 900) {
		return <DefaultMobile />;
	} else {
		return <Login />;
	}
};

export default DefaultHome;
