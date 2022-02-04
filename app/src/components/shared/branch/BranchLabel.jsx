import React from 'react';
import { _branch } from './BranchLabel.styled';

const BranchLabel = () => {
	return <_branch>{process.env.REACT_APP_GIT_SHA}</_branch>;
};

export default BranchLabel;
