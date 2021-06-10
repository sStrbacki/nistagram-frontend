import axios from 'axios';
import { api } from '../api/index';

async function createPost(post) {
	try {
		let res = await axios.post(api.content.postBase, post);
		return res;
	} catch (err) {
		console.log(err);
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

export { createPost, createStory };
