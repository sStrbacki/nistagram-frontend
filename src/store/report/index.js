import {
	deleteReportedPost,
	deleteReportedStory,
	getAllPostReports,
	getAllStoryReports,
	getReportedPost,
	getReportedStory,
	reportPost,
	reportStory
} from '../../services/reportService';
import { notifyError, notifySuccess } from '../../services/notificationService';

export default {
	state: {
		postReportDialog: false,
		reportedPost: null,
		postReportReason: '',
		storyReportDialog: false,
		reportedStory: null,
		storyReportReason: '',
		postReports: [],
		storyReports: []
	},
	mutations: {
		setPostReportDialog: (state, value) => {
			state.postReportDialog = value;
		},
		setReportedPost: (state, value) => {
			state.reportedPost = value;
		},
		setPostReportReason: (state, value) => {
			state.postReportReason = value;
		},
		setStoryReportDialog: (state, value) => {
			state.storyReportDialog = value;
		},
		setReportedStory: (state, value) => {
			state.reportedStory = value;
		},
		setStoryReportReason: (state, value) => {
			state.storyReportReason = value;
		},
		setPostReports: (state, value) => {
			state.postReports = value;
		},
		setStoryReports: (state, value) => {
			state.storyReports = value;
		},
		removePostReport: (state, postId) => {
			state.postReports = state.postReports.filter(postReport => {
				return postReport.postId !== postId;
			});
		},
		removeStoryReport: (state, storyId) => {
			state.storyReports = state.storyReports.filter(storyReport => {
				return storyReport.storyId !== storyId;
			});
		}
	},
	actions: {
		reportPost: async state => {
			let res = await reportPost(
				state.getters.reportedPost.id,
				state.getters.postReportReason
			);
			if (res.status >= 400) {
				notifyError(res.data);
			} else {
				notifySuccess('Post successfully reported');
			}
		},
		reportStory: async state => {
			let res = await reportStory(
				state.getters.reportedStory.id,
				state.getters.storyReportReason
			);
			if (res.status >= 400) notifyError(res.data);
			else notifySuccess('Story successfully reported');
		},
		getAllPostReports: async state => {
			let res = await getAllPostReports();
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setPostReports', res.data);
		},
		getAllStoryReports: async state => {
			let res = await getAllStoryReports();
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setStoryReports', res.data);
		},
		getReportedStory: async (state, storyId) => {
			let res = await getReportedStory(storyId);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setReportedStory', res.data);
		},
		getReportedPost: async (state, postId) => {
			let res = await getReportedPost(postId);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setReportedPost', res.data);
		},
		deleteReportedPost: async state => {
			let res = await deleteReportedPost(state.getters.reportedPost.id);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('removePostReport', state.getters.reportedPost.id);
				notifySuccess('Story succesfully removed');
			}
		},
		deleteReportedStory: async state => {
			let res = await deleteReportedStory(state.getters.reportedStory.id);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('removeStoryReport', state.getters.reportedStory.id);
				notifySuccess('Story succesfully removed');
			}
		}
	},
	getters: {
		postReportDialog: state => {
			return state.postReportDialog;
		},
		reportedPost: state => {
			return state.reportedPost;
		},
		postReportReason: state => {
			return state.postReportReason;
		},
		storyReportDialog: state => {
			return state.storyReportDialog;
		},
		reportedStory: state => {
			return state.reportedStory;
		},
		storyReportReason: state => {
			return state.storyReportReason;
		},
		postReports: state => {
			return state.postReports;
		},
		storyReports: state => {
			return state.storyReports;
		}
	}
};
