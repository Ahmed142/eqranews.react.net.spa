import { SETTINGS_COUNTRY_ACTIONS } from '../Actions/Country';
import { type } from 'jquery';
//import Countries from '../../_shared/components/Countries';

export const Countries = (state = [], { type: type, data: data }) => {
	switch (type) {
		case SETTINGS_COUNTRY_ACTIONS.RECEIVE_SETTINGS_COUNTRY_FETCH_ALL:
			return data;
		case SETTINGS_COUNTRY_ACTIONS.RECEIVE_SETTINGS_COUNTRY_FETCH_BY_ID:
			return [...state.filter(x => x.id == data)];
		case SETTINGS_COUNTRY_ACTIONS.RECEIVE_SETTINGS_COUNTRY_CREATE:
			return [...state, data.data];
		case SETTINGS_COUNTRY_ACTIONS.RECEIVE_SETTINGS_COUNTRY_UPDATE:
			return state.map(x =>
				x.id == data.id ? { ...data, crawlSources: null } : x
			);
		case SETTINGS_COUNTRY_ACTIONS.RECEIVE_SETTINGS_COUNTRY_DELETE:
			console.log('Deleted', data);
			return [...state.filter(x => x.id != data.id)];
		default:
			return state;
	}
};

export default Countries;
