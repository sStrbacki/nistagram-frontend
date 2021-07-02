import axios from 'axios';
import { api } from '../api';

async function getCampaignById(id) {
	try {
		return await axios.get(api.campaign.base + '/' + id);
	} catch (err) {
		return err.response;
	}
}

export {
	getCampaignById
}
