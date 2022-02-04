import { useLayoutEffect } from 'react';
import { useInteractive } from '../element/useInteractive';
import StaticLinks from '../../../global/utils/links';

export const useSift = () => {
	const interacted = useInteractive();

	useLayoutEffect(() => {
		if (interacted) {
			const sift_id = 'sift-script';
			const existingScript = document.getElementById(sift_id);

			if (!existingScript) {
				const script = document.createElement('script');
				script.src = StaticLinks.sift;
				script.async = true;
				script.defer = true;
				script.id = sift_id;
				document.body.appendChild(script);
			}
		}
	}, [interacted]);
};
