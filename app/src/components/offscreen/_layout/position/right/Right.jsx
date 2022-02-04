import React from 'react';
import { _right, _float, _view } from './Right.styled';
import useKey from '../../../../../../global/hooks/helpers/useKey';

const Right = ({ children }) => (
	<_right>{React.Children.map(children, child => (
		<Float>
			{child}
		</Float>))}
	</_right>
);

const Float = ({ children }) => {
	const key = useKey();
	return <_float key={key}><_view>{children}</_view></_float>;
};

export default Right;
