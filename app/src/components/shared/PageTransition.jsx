import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import routes from '../dynamic';
import {
	animationEnterEnd,
	animationEnterStart,
	animationExitEnd,
	animationExitStart,
	enterWithoutAnimation
} from '../../actions/state/routes';
import { _desktop, _enter, _exit, _mobile } from '../../../design/styles/styled-components/shared/Transition';
import { ANIMATION_STAY, TRANSITION_ENTER, TRANSITION_EXIT } from '../../actions/state/state';
import { br, layers } from '../../../global';
import { routes as components } from '../../App';
import { forEach } from 'lodash';

class PageTransition extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prevId: null,
			prevPage: null,
			currId: null,
			currPage: null,
			nextId: null,
			nextPage: null,
			isAnimating: false,
			isMobile: false
		};

		this.resize = this.resize.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize, false);
		this.pageSwap(null, null, this.props.uniqKey, this.props.children);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize, false);
	}

	componentDidUpdate() {
		const prevId = this.state.currId;
		const prevPage = this.state.currPage;
		const currId = this.props.uniqKey;
		const currPage = this.props.children;

		if (prevId && prevId !== currId) {
			this.pageSwap(prevId, prevPage, currId, currPage);
		}
	}

	resize() {
		const width = window.innerWidth;
		const toMobile = !this.state.isMobile && width < br.desktop;
		const toDesktop = this.state.isMobile && width >= br.desktop;
		const scrollFix = document.getElementsByClassName('unfindable')[0];
		if (scrollFix) {
			scrollFix.style.overflowY = 'hidden';
			scrollFix.style.overflowY = 'scroll';
		}

		const mobile = page => {
			return <_mobile>{page}</_mobile>;
		};

		const desktop = page => {
			return <_desktop>{page}</_desktop>;
		};
		if (toDesktop) {
			this.setState({ currPage: desktop(this.props.children), isMobile: false });
		} else if (toMobile) {
			this.setState({ currPage: mobile(this.props.children), isMobile: true });
		}
	}

	pageSwap(prevId, prevPage, currId, currPage) {
		const exitRoute = prevId ? routes(prevId, TRANSITION_EXIT) : null;
		const enterRoute = routes(currId, TRANSITION_ENTER);
		const exitDuration = exitRoute ? exitRoute.transition_duration : 0;
		const enterDuration = enterRoute ? enterRoute.transition_duration : 0;

		// Preload tabGroups
		forEach(enterRoute.tabGroup, component => {
			if (components[component]) components[component].preload();
		});

		// Preload other components
		forEach(enterRoute.preload, component => {
			if (components[component]) components[component].preload();
		});
		// Route Options
		const tabGroup = enterRoute.tabGroup.includes(prevId);

		const noAnimation = () => {
			this.props.enterWithoutAnimation(currId);
			this.setState({
				prevId: null,
				prevPage: null,
				currId,
				currPage,
				nextId: null,
				nextPage: null,
				isAnimating: false
			});
		};

		// Preload tabGroups
		forEach(enterRoute.tabGroup, component => {
			if (components[component]) components[component].preload();
		});

		// No Animation because it is a tab on the same page
		if (tabGroup || (!exitDuration && !enterDuration)) {
			noAnimation();
		} else {
			// Set options for transitions
			let animation_exit = ANIMATION_STAY;
			let animation_enter = ANIMATION_STAY;

			if (exitRoute ? exitRoute.transition_animation.fallback : null)
				animation_exit = exitRoute.transition_animation.fallback;
			if (exitRoute ? exitRoute.transition_animation[currId] : null)
				animation_exit = exitRoute.transition_animation[currId];
			if (enterRoute.transition_animation.fallback) animation_enter = enterRoute.transition_animation.fallback;
			if (enterRoute.transition_animation[prevId]) animation_enter = enterRoute.transition_animation[prevId];

			if (animation_exit === ANIMATION_STAY && animation_enter === ANIMATION_STAY) {
				noAnimation();
				return false;
			}

			let exitLayer =
				animation_exit === ANIMATION_STAY && animation_exit !== animation_enter ? layers.exit : layers.enter;
			let enterLayer =
				animation_enter === ANIMATION_STAY && animation_exit !== animation_enter ? layers.exit : layers.enter;

			// Need to rerender the components
			const exitPage = (page, time) => {
				if (!time) return null;
				return (
					<_exit exit layer={exitLayer} duration={time ? time : null} animation={animation_exit}>
						{page}
					</_exit>
				);
			};

			const mobile = page => {
				return <_mobile>{page}</_mobile>;
			};

			const desktop = page => {
				return <_desktop>{page}</_desktop>;
			};

			const enterPage = (page, time, animating) => {
				return (
					<_enter
						layer={enterLayer}
						enter={animating ? 'true' : null}
						duration={time ? time : null}
						animation={animation_enter}>
						{page}
					</_enter>
				);
			};

			const isMobile = window.innerWidth < br.desktop;
			const prevExit = exitPage(prevPage, exitDuration);
			const currShow = isMobile ? mobile(currPage) : desktop(currPage);
			const nextEnter = enterPage(currPage, enterDuration);

			// Start Animations
			this.setState(
				{
					prevId,
					prevPage: prevExit,
					currId: null,
					currPage: null,
					nextId: currId,
					nextPage: nextEnter,
					isAnimating: true,
					isMobile
				},
				() => {
					if (exitRoute) this.props.animationExitStart(prevId, exitRoute, exitLayer);
					this.props.animationEnterStart(currId, enterRoute, enterLayer);
					setTimeout(
						() => {
							this.setState(
								{
									prevId: null,
									prevPage: null,
									currId,
									currPage: currShow,
									nextId: null,
									nextPage: null,
									isAnimating: false,
									isMobile
								},
								() => {
									if (exitRoute) this.props.animationExitEnd();
									this.props.animationEnterEnd();
								}
							);
						},
						enterDuration > exitDuration ? enterDuration : exitDuration
					);
				}
			);
		}
	}

	render() {
		if (this.props.refreshing) return null;

		return (
			<React.Fragment>
				{this.state.prevPage}
				{this.state.currPage}
				{this.state.nextPage}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ animation }) => ({
	refreshing: animation.refreshing
});

export default withRouter(
	connect(mapStateToProps, {
		enterWithoutAnimation,
		animationEnterStart,
		animationEnterEnd,
		animationExitStart,
		animationExitEnd
	})(PageTransition)
);
