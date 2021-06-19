import axios from 'axios';
import { api } from '../api/index';

async function findUsers(userQuery) {
	try {
		let res = await axios.get(api.user.base + '/' + userQuery);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
}

async function findTaggableUsers(userQuery) {
	try {
		let res = await axios.get(api.user.taggable + '/' + userQuery);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
}

async function promiseToFindTaggableUsersByUsername(username) {
	return axios.get(api.user.taggable + '/' + username);
}

async function promiseToFindPostsWhereUserIsTagged(username) {
	return axios.get(api.content.tagged + '/' + username);
}

function findPosts(locationQuery) {
	return axios.post(api.content.postSearchLocation, { street: locationQuery });
}

export {
	findUsers,
	findPosts,
	findTaggableUsers,
	promiseToFindTaggableUsersByUsername,
	promiseToFindPostsWhereUserIsTagged
};
