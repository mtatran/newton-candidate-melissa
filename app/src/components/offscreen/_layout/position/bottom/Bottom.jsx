import React from 'react';
import { _bottom, _float, _view } from './Bottom.styled';
import useKey from '../../../../../../global/hooks/helpers/useKey';

const Bottom = ({ children }) => (
	<_bottom>{React.Children.map(children, child => (
		<Float>
			{child}
		</Float>))}
	</_bottom>
);

const Float = ({ children }) => {
	const key = useKey();
	return <_float key={key}><_view>{children}</_view></_float>;
};

export default Bottom;
