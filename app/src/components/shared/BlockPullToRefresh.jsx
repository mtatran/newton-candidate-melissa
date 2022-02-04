import { PureComponent } from 'react';

class BlockPullToRefresh extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const body = document.body;

		body.className = 'blockRefresh';
	}

	componentWillUnmount() {
		const body = document.body;

		body.classList.remove('blockRefresh');
	}

	render() {
		return null;
	}
}

export default BlockPullToRefresh;
