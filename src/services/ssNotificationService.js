import { api } from '../api/index';
import axios from 'axios';

async function getAll() {
	try {
		let res = await axios.get(api.notification.base);
		return res.data;
	} catch (err) {
		console.log(err);
		return err.response.data;
	}
}
async function hide(notificationId) {
	try {
		let res = await axios.delete(api.notification.base + '/' + notificationId);
		return res.data;
	} catch (err) {
		console.log(err);
		return err.response.data;
	}
}

export { getAll, hide };
