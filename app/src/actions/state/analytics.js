export const VIRTUAL_PAGE_VIEW = 'VIRTUAL_PAGE_VIEW';

export const trackVirtualPageview = (title, url) => {
	let data = { title, url };
	return { type: VIRTUAL_PAGE_VIEW, payload: data };
};
