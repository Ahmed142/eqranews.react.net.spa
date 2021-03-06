import { SETTINGS_CRAWLSTEPTYPE_ACTIONS } from '../Actions/CrawlStepType';

export const CrawlStepTypes = (state = [], { type: type, data: data }) => {
	switch (type) {
		case SETTINGS_CRAWLSTEPTYPE_ACTIONS.RECEIVE_SETTINGS_CRAWLSTEPTYPE_FETCH_ALL:
			return data;
		case SETTINGS_CRAWLSTEPTYPE_ACTIONS.RECEIVE_SETTINGS_CRAWLSTEPTYPE_FETCH_BY_ID:
			return [...state.filter(x => x.id == data)];
		case SETTINGS_CRAWLSTEPTYPE_ACTIONS.RECEIVE_SETTINGS_CRAWLSTEPTYPE_CREATE:
			return [...state, data];
		case SETTINGS_CRAWLSTEPTYPE_ACTIONS.RECEIVE_SETTINGS_CRAWLSTEPTYPE_UPDATE:
			return state.map(x => (x.id == data.id ? { ...data } : x));
		case SETTINGS_CRAWLSTEPTYPE_ACTIONS.RECEIVE_SETTINGS_CRAWLSTEPTYPE_DELETE:
			console.log('Deleted', data);
			return [...state.filter(x => x.id != data.id)];
		default:
			return state;
	}
};

export default CrawlStepTypes;
