import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { batch } from 'react-redux';
import { Timings } from '../../utils/timings';
import { useClickOutside } from './useClickOutside';
import usePrevious from '../helpers/usePrevious';

const VISIBLE = 'visible';
const CONTINUE_CLOSE = 'continueClose';
const CONTINUE_OPEN = 'continueOpen';
const HIDE = 'hide';
const HIDDEN = 'hidden';

const usePrompt = (active, callback, close) => {
	const [animating, setAnimating] = useState(false);
	const [visibility, setVisibility] = useState(false);
	const [open, setOpen] = useState(active);
	const [animation, setAnimation] = useState(HIDDEN);

	const prevAnimation = usePrevious(animation);
	const promptRef = useRef(null);
	const animator = useAnimation();

	const promptDefaults = useMemo(() => {
		const height = window.innerHeight;
		return {
			drag: 'y',
			dragDirectionLock: true,
			dragConstraints: { top: 0, bottom: promptRef.current?.clientHeight ?? height },
			dragTransition: { bounceStiffness: 600, bounceDamping: 20 },
			dragElastic: 0,
			dragMomentum: false,
			initial: HIDDEN,
			animate: animator,
			variants: {
				visible: {
					y: [height, -20, -20, 0],
					transition: {
						duration: Timings.closeWaitPrompt / 1000,
						times: [0, 0.6, 0.65, 1],
						ease: [0.215, 0.215, 0.215, 1]
					}
				},
				hidden: {
					y: height
				},
				hide: {
					y: [10, -20, -20, height],
					transition: {
						duration: Timings.closeWaitPrompt / 1000,
						times: [0, 0.4, 0.45, 1]
					}
				},
				continueClose: {
					y: height,
					transition: {
						duration: Timings.closePrompt / 1000
					}
				},
				continueOpen: {
					y: 0,
					transition: {
						duration: Timings.closePrompt / 1000
					}
				}
			}
		};
	}, [window.innerHeight, promptRef.current?.clientHeight]);

	const animate = useCallback(
		animation => {
			animator.start(animation).then(() => {
				batch(() => {
					switch (animation) {
						case CONTINUE_CLOSE:
						case HIDDEN:
						case HIDE:
							setVisibility(false);
							setOpen(false);
							wrappedCallback();
							break;
						case CONTINUE_OPEN:
						case VISIBLE:
							setVisibility(true);
							break;
					}
					setAnimating(false);
				});
			});
		},
		[callback]
	);

	useEffect(() => setOpen(active), [active]);

	useEffect(() => {
		if (animating) {
			animate(animation);
		} else if (prevAnimation !== animation && promptRef.current) {
			setAnimating(true);
		}
	}, [animation, animating]);

	useEffect(() => {
		if (open) {
			if (visibility) {
				setAnimation(VISIBLE);
			} else {
				setVisibility(true);
			}
		} else if (!open && prevAnimation === VISIBLE) {
			setAnimation(HIDE);
		}
	}, [open, visibility]);

	const wrappedCallback = useCallback(postClose => callback?.(postClose), [callback]);

	const wrappedClose = useCallback(
		postClose => {
			setAnimation(HIDE);
			close?.(postClose);
		},
		[close]
	);

	const onDragEnd = useCallback((event, info) => {
		const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
		if (shouldClose) {
			setAnimation(CONTINUE_CLOSE);
			return;
		}
		animate(CONTINUE_OPEN);
	}, []);

	useClickOutside(promptRef, event => {
		if (event.type === 'touchend' && visibility) {
			event.preventDefault();
			event.passive = false;
		} else if (visibility && !animating && open) {
			setAnimation(HIDE);
		}
	});

	return {
		active: open,
		callback: wrappedCallback,
		close: wrappedClose,
		open: visibility,
		props: {
			ref: promptRef,
			leave: !open,
			onDragEnd,
			...promptDefaults
		}
	};
};
export default usePrompt;
