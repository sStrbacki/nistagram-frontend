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

async function getAllPostReports() {
	try {
		let res = await axios.get(api.content.report.post);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getAllStoryReports() {
	try {
		let res = await axios.get(api.content.report.story);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function deletePostReport(postReportId) {
	try {
		let res = await axios.delete(api.content.report.post + `/${postReportId}`);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function deleteStoryReport(storyReportId) {
	try {
		let res = await axios.delete(api.content.report.post + `/${storyReportId}`);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getReportedPost(postId) {
	try {
		let res = await axios.get(api.content.admin.post + `/${postId}`);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getReportedStory(storyId) {
	try {
		let res = await axios.get(api.content.admin.story + `/${storyId}`);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function deleteReportedPost(postId) {
	try {
		let res = await axios.delete(api.content.admin.post + `/${postId}`);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function deleteReportedStory(storyId) {
	try {
		let res = await axios.delete(api.content.admin.story + `/${storyId}`);
		return res;
	} catch (err) {
		return err.response;
	}
}

export {
	reportPost,
	reportStory,
	getAllPostReports,
	getAllStoryReports,
	deletePostReport,
	deleteStoryReport,
	deleteReportedPost,
	deleteReportedStory,
	getReportedPost,
	getReportedStory
};
