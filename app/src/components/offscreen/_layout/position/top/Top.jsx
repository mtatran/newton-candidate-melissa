import React from 'react';
import { _top, _float, _view } from './Top.styled';
import useKey from '../../../../../../global/hooks/helpers/useKey';

const Top = ({ children, error }) => (
	<_top>{React.Children.map(children, child => (
		<Float error={error}>
			{child}
		</Float>))}
	</_top>
);

const Float = ({ children, error }) => {
	const key = useKey();
	return <_float key={key} $error={error}><_view>{children}</_view></_float>;
};

export default Top;
