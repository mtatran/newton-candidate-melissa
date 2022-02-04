import React from 'react';
import { _left, _float, _view } from './Left.styled';
import useKey from '../../../../../../global/hooks/helpers/useKey';

const Left = ({ children }) => (
	<_left>{React.Children.map(children, child => (
		<Float>
			{child}
		</Float>))}
	</_left>
);

const Float = ({ children }) => {
	const key = useKey();
	return <_float key={key}><_view>{children}</_view></_float>;
};

export default Left;
