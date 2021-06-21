import { reportPost, reportStory } from '../../services/reportService';
import { notifyError, notifySuccess } from '../../services/notificationService';

export default {
	state: {
		postReportDialog: false,
		reportedPost: null,
		postReportReason: '',
		storyReportDialog: false,
		reportedStory: null,
		storyReportReason: ''
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
		}
	},
	actions: {
		reportPost: state => {
			let res = reportPost(
				state.getters.reportedPost.id,
				state.getters.postReportReason
			);
			if (res.status >= 400) {
				notifyError(res.data);
			} else {
				notifySuccess('Post successfully reported');
			}
		},
		reportStory: state => {
			let res = reportStory(
				state.getters.reportedStory.id,
				state.getters.storyReportReason
			);
			if (res.status >= 400) {
				notifyError(res.data);
			} else {
				notifySuccess('Story successfully reported');
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
		}
	}
};
