import { api } from '../api/index';
import axios from 'axios';

async function reportPost(postId, reportReason) {
	try {
		let res = await axios.post(api.content.report.post + `/${postId}`, {
			reason: reportReason
		});
		return res;
	} catch (err) {
		return err.response;
	}
}

async function reportStory(storyId, reportReason) {
	try {
		let res = await axios.post(api.content.report.story + `/${storyId}`, {
			reason: reportReason
		});
		return res;
	} catch (err) {
		return err.response;
	}
}

export { reportPost, reportStory };
