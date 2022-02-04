import { useMemo } from 'react';
import shortid from 'shortid';

const useKey = () => {
	return useMemo(() => shortid.generate(), []);
};

export default useKey;
