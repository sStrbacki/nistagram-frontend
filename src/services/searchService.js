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
	return axios.post(api.content.postSearchLocation,{ street: locationQuery });
	// console.log(locationQuery);
	// return [
	// 	{
	// 		id: 0,
	// 		author: 'johndoe',
	// 		caption: 'Capshnz',
	// 		mediaUrls: [
	// 			{
	// 				id: 0,
	// 				url: 'https://i.imgur.com/6oLYk8E.jpeg'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 1,
	// 		author: 'janedoe',
	// 		caption: 'Caption',
	// 		mediaUrls: [
	// 			{
	// 				id: 0,
	// 				url: 'https://i.imgur.com/Leiecq4.jpeg'
	// 			}
	// 		]
	// 	}
	// ];
}

export { findUsers, findPosts, findTaggableUsers, promiseToFindTaggableUsersByUsername, promiseToFindPostsWhereUserIsTagged };
