import { useEffect, useState } from 'react';

export default function Animated({ children, leave, leave_duration }) {
	const [hide, setHide] = useState(leave);

	useEffect(() => {
		let setHideTimeout;
		if (leave) {
			setHideTimeout = setTimeout(
				() => setHide(true),
				leave_duration ? leave_duration : leave_duration === 0 ? 0 : 250
			);
		} else setHide(false);

		return function cleanup() {
			if (setHideTimeout) clearTimeout(setHideTimeout);
		};
	}, [leave]);

	const Children = children;

	if (!hide) return children;
	else return null;
}
