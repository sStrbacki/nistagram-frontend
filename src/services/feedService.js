import axios from 'axios';
import { api } from '../api/index';

async function fetchPostFeed() {
	try {
		let res = axios.get(api.feed.postFeed);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function fetchStoryFeed() {
	try {
		let res = axios.get(api.feed.storyFeed);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function fetchStoryCampaignFeed() {
	try {
		return axios.get(api.feed.storyCampaignFeed);
	} catch (err) {
		return err.response;
	}
}

async function fetchCloseFriendStoryFeed() {
	try {
		let res = axios.get(api.feed.closeFriendStoryFeed);
		return res;
	} catch (err) {
		return err.response;
	}
}

export {
	fetchPostFeed,
	fetchStoryFeed,
	fetchCloseFriendStoryFeed,
	fetchStoryCampaignFeed
};
