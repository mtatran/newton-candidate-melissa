import React from 'react';
import { useSelector } from 'react-redux';

const Name = ({ ticker }) => {
	const name = useSelector(({ exchange }) => exchange.name);
	const activeCoin = useSelector(({ exchange }) => exchange.activeCoin);
	const coin_name = ticker ? name[ticker] : name[activeCoin];

	return <span>{coin_name}</span>;
};

export default Name;
