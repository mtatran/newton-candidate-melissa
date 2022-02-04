class ThrottleSocket {
	throttleList;

	throttleTime;

	constructor(time) {
		this.throttleList = {};
		this.throttleTime = time;
	}

	async setThrottle(symbol) {
		if (this.throttleTime) {
			this.throttleList[symbol] = true;

			await new Promise(r => setTimeout(r, this.throttleTime));

			this.throttleList[symbol] = false;
		}
	}

	isThrottled(symbol) {
		return this.throttleList[symbol];
	}
}
export default ThrottleSocket;
