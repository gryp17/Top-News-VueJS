
import API from './API';

export default {
	/**
	 * Returns the server uploads config
	 */
	getConfig() {
		return API.get('/api/config');
	}
};
