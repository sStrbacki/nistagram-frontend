import axios from 'axios';
import { api } from '../api';

async function getCampaignById(id) {
	try {
		return await axios.get(api.campaign.base + '/' + id);
	} catch (err) {
		return err.response;
	}
}

async function createLongTermCampaign(campaign) {
	try {
		return await axios.post(api.campaign.longTerm, campaign);
	} catch (err) {
		return err.response;
	}
}

async function createOneTimeCampaign(campaign) {
	try {
		return await axios.post(api.campaign.oneTime, campaign);
	} catch (err) {
		return err.response;
	}
}

export {
	getCampaignById,
	createLongTermCampaign,
	createOneTimeCampaign
}
