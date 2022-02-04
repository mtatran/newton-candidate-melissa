import React from 'react';
import { _scrollable } from './Scrollable.styled';

const Scrollable = ({children}) => <_scrollable id="offscreen-scrollable">{children}</_scrollable>;

export default Scrollable;
