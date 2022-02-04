import {
	ANIMATION_BOTTOM,
	ANIMATION_LEFT,
	ANIMATION_LEFT_FULL,
	ANIMATION_OVERLAY_BOTTOM,
	ANIMATION_OVERLAY_TOP,
	ANIMATION_RIGHT,
	ANIMATION_RIGHT_FULL,
	ANIMATION_STAY,
	ANIMATION_TOP
} from '../../../src/actions/state/state';

const transform_top_overlay_exit = 'translateY(-100%);';
const transform_bottom_overlay_exit = 'translateY(100%);';
const transform_right_exit = 'translateX(-100%)';
const transform_left_exit = 'translateX(100%)';

const animations = {
	[ANIMATION_TOP]: {
		exit: 'slide-up-exit',
		enter: 'slide-up'
	},
	[ANIMATION_RIGHT]: {
		exit: 'slide-right-exit',
		enter: 'slide-right'
	},
	[ANIMATION_RIGHT_FULL]: {
		exit: 'slide-right-exit-full',
		transform: transform_right_exit,
		enter: 'slide-right'
	},
	[ANIMATION_BOTTOM]: {
		exit: 'slide-down-exit',
		enter: 'slide-down'
	},
	[ANIMATION_LEFT]: {
		exit: 'slide-left-exit',
		enter: 'slide-left'
	},
	[ANIMATION_LEFT_FULL]: {
		exit: 'slide-left-exit-full',
		transform: transform_left_exit,
		enter: 'slide-left'
	},
	[ANIMATION_STAY]: {
		exit: '',
		enter: ''
	},
	[ANIMATION_OVERLAY_TOP]: {
		exit: 'slide-up-exit-full',
		transform: transform_top_overlay_exit,
		enter: 'slide-up'
	},
	[ANIMATION_OVERLAY_BOTTOM]: {
		exit: 'slide-down-exit-full',
		transform: transform_bottom_overlay_exit,
		enter: 'slide-down'
	}
};

export default animations;
