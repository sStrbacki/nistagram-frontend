import axios from 'axios';
import { api } from '../api/index';

async function createPost(post) {
	try {
		let res = await axios.post(api.content.postBase, post);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function createStory(story) {
	try {
		let res = await axios.post(api.content.mediaStory, story);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getPostById(postId) {
	try {
		let res = await axios.get(api.content.postBase + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getStoryById(storyId) {
	try {
		let res = await axios.get(api.content.storyBase + '/' + storyId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function postLike(postId) {
	try {
		let res = await axios.get(api.content.postLike + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function postDislike(postId) {
	try {
		let res = await axios.get(api.content.postDislike + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function comment(comment) {
	try {
		let res = await axios.post(api.content.comment, comment);
		return res;
	} catch (err) {
		return err.response;
	}
}

export {
	createPost,
	createStory,
	getPostById,
	getStoryById,
	postLike,
	postDislike,
	comment
};
