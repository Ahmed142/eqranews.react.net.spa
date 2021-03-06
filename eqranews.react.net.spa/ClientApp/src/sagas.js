import { fork, all, call, put } from 'redux-saga/effects';
// import CrawlingSagas from './Modules/Crawling/sagas';
import crawlSagas from './Modules/Crawling/sagas';
import SettingsSagas from './Modules/Settings/Sagas';
import NewsSagas from './Modules/News/Sagas';
import UsersSagas from './Modules/Users/sagas';

export default function* rootSaga() {
	// console.log('sagas:', [...CrawlingSagas]);
	// yield all([crawlSourceFetchAllSaga]);
	// yield all([crawlSourceFetchAllSaga]);
	// yield fork(crawlSourceFetchAllSaga);
	// yield fork(crawlSagas);
	// yield fork(SettingsSagas);
	// code after all-effect
	// { ...CrawlingSagas }
	yield all([...crawlSagas, ...SettingsSagas, ...UsersSagas, ...NewsSagas]);
}
