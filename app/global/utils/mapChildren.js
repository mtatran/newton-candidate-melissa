import React from 'react';

export const childrenWithProps = (children, props) =>
	React.Children.map(children, child => (React.isValidElement(child) ? React.cloneElement(child, props) : child));
