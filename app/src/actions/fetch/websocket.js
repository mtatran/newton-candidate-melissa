import { connect } from 'socket.io-client';
import config from '../../../global/utils/config';
import ThrottleSocket from '../../../global/utils/throttle';

export const connectLivePrice = (
	time,
	symbol = null,
	onInitial = () => {},
	onUpdate = () => {},
	onDisconnect = () => {}
) => {
	if (!config.WEBSOCKET_BE_URL) {
		onDisconnect();
		return;
	}

	let socket;
	if (symbol) {
		socket = connect(`${config.WEBSOCKET_BE_URL}/v1/live-pricing?symbol=${symbol}`, {
			reconnection: false,
			transports: ['websocket']
		});
	} else {
		socket = connect(`${config.WEBSOCKET_BE_URL}/v1/live-pricing`, {
			reconnection: false,
			transports: ['websocket']
		});
	}

	const throttle = new ThrottleSocket(time);

	socket.emit('subscribe');

	socket.on('initial', data => {
		onInitial(data, throttle);
	});

	socket.on('update', data => {
		onUpdate(data, throttle);
	});

	socket.on('disconnect', data => {
		onDisconnect(data);
	});

	socket.on('connect_failed', data => {
		onDisconnect(data);
	});

	socket.on('connect_error', data => {
		onDisconnect(data);
	});
};
