let widgetsOpened = [];

export const openNewWindow = url => {
	if (!widgetsOpened.includes(url)) {
		widgetsOpened.push(url);
	}
	let newWindow = new fin.desktop.Window({
		name: url,
		url: url,
		defaultWidth: 800,
		defaultHeight: 900,
		minWidth: 500,
		minHeight: 500,
		autoShow: true
	});
	newWindow.show();

	newWindow.addEventListener('closed', event => {
		for (let i = 0; i < widgetsOpened.length; i++) {
			if (event.name === widgetsOpened[i]) {
				widgetsOpened.splice(i, 1);
			}
		}
	});
};

export const saveLayout = () => {
	if (typeof Storage !== 'undefined') {
		let widgetsOpenedString = widgetsOpened.join(',');
		localStorage.setItem('widgetsOpened', widgetsOpenedString);
	}
};

export const restoreLayout = () => {
	if (typeof Storage !== 'undefined') {
		let widgetsOpened = localStorage.getItem('widgetsOpened').split(',');
		widgetsOpened.forEach(url => {
			openNewWindow(url);
		});
	}
};
