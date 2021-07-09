import { notifyError, notifySuccess } from '../../services/notificationService';
import {
	createLongTermCampaign,
	createOneTimeCampaign, deleteCampaign, getAdvertisementClickStats,
	getCampaignById,
	getCampaigns, registerClick, updateLongTermCampaign, updateOneTimeCampaign
} from '../../services/campaignService';
import { getPostById } from '../../services/contentService';

export default {
	state: {
		newCampaign: {
			name: '',
			type: 'POST',
			targetedGroup: {
				minAge: null,
				maxAge: null,
				gender: null
			},
			advertisements: [],
			startsOn: null,
			endsOn: null,
			exposureMoments: [],
			exposureMoment: null,
			longTerm: false
		},
		personalCampaigns: [],
		campaignStats: {
			campaign: null,
			post: null
		},
		editCampaignId: null
	},
	mutations: {
		setNewCampaignName: (state, name) => {
			state.newCampaign.name = name;
		},
		setNewCampaignType: (state, type) => {
			state.newCampaign.type = type;
		},
		setNewCampaignMinAge: (state, minAge) => {
			state.newCampaign.targetedGroup.minAge = minAge;
		},
		setNewCampaignMaxAge: (state, maxAge) => {
			state.newCampaign.targetedGroup.maxAge = maxAge;
		},
		setNewCampaignGender: (state, gender) => {
			state.newCampaign.targetedGroup.gender = gender;
		},
		addNewCampaignAdvertisement: (state, advertisement) => {
			state.newCampaign.advertisements.push(advertisement);
		},
		removeNewCampaignAdvertisement: (state, index) => {
			state.newCampaign.advertisements.splice(index, 1);
		},
		setNewCampaignStartsOn: (state, startsOn) => {
			state.newCampaign.startsOn = startsOn;
		},
		setNewCampaignEndsOn: (state, endsOn) => {
			state.newCampaign.endsOn = endsOn;
		},
		addNewCampaignExposureMoment: (state, moment) => {
			if (!state.newCampaign.exposureMoments.includes(moment)) {
				state.newCampaign.exposureMoments.push(moment);
			}
		},
		removeNewCampaignExposureMoment: (state, moment) => {
			const index = state.newCampaign.exposureMoments
				.findIndex(m => m === moment);
			state.newCampaign.exposureMoments.splice(index, 1);
		},
		setNewCampaignExposureMoment: (state, moment) => {
			state.newCampaign.exposureMoment = moment;
		},
		setNewCampaignLongTerm: (state, longTerm) => {
			state.newCampaign.longTerm = longTerm;
		},
		setPersonalCampaigns: (state, campaigns) => {
			state.personalCampaigns = campaigns;
		},
		setCampaignStatsCampaign: (state, campaign) => {
			state.campaignStats.campaign = campaign;
		},
		setCampaignStatsPost: (state, post) => {
			state.campaignStats.post = post;
		},
		addAdvertisementClickStats: (state, clickStats) => {
			const ad = state.campaignStats.campaign.advertisements
				.find(ad => ad.id === clickStats.id);
			ad.clickStats = clickStats;
		},
		setEditCampaignId: (state, id) => {
			state.editCampaignId = id;
		},
		setNewCampaign: (state, campaign) => {
			state.newCampaign = campaign;
		},
		setNewCampaignTargetedGroup: (state, targetedGroup) => {
			state.newCampaign.targetedGroup = targetedGroup;
		},
		removePersonalCampaign: (state, campaignId) => {
			const index = state.personalCampaigns
				.findIndex(campaign => campaign.id === campaignId);
			state.personalCampaigns.splice(index, 1);
		}
	},
	getters: {
		newCampaignName: state => {
			return state.newCampaign.name;
		},
		newCampaignType: state => {
			return state.newCampaign.type;
		},
		newCampaignMinAge: state => {
			return state.newCampaign.targetedGroup.minAge;
		},
		newCampaignMaxAge: state => {
			return state.newCampaign.targetedGroup.maxAge;
		},
		newCampaignGender: state => {
			return state.newCampaign.targetedGroup.gender;
		},
		newCampaignAdvertisements: state => {
			return state.newCampaign.advertisements
		},
		newCampaignStartsOn: state => {
			return state.newCampaign.startsOn;
		},
		newCampaignEndsOn: state => {
			return state.newCampaign.endsOn;
		},
		newCampaignExposureMoments: state => {
			return state.newCampaign.exposureMoments;
		},
		newCampaignExposureMoment: state => {
			return state.newCampaign.exposureMoment;
		},
		newCampaignLongTerm: state => {
			return state.newCampaign.longTerm;
		},
		personalCampaigns: state => {
			return state.personalCampaigns;
		},
		campaignStats: state => {
			return state.campaignStats;
		},
		editCampaignId: state => {
			return state.editCampaignId
		},
		newCampaignTargetedGroup: state => {
			return state.newCampaign.targetedGroup;
		}
	},
	actions: {
		saveCampaign: async context => {
			if (context.getters.editCampaignId) {
				await context.dispatch("updateCampaign");
			} else {
				await context.dispatch("createCampaign");
			}
		},
		createCampaign: async context => {
			let response;
			if (context.state.newCampaign.longTerm) {
				response = await createLongTermCampaign(context.state.newCampaign);
			} else {
				response = await createOneTimeCampaign(context.state.newCampaign);
			}
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				notifySuccess("Campaign created successfully!");
			}
		},
		updateCampaign: async context => {
			let response;
			if (context.state.newCampaign.longTerm) {
				response = await updateLongTermCampaign(context.getters.editCampaignId, context.state.newCampaign);
			} else {
				response = await updateOneTimeCampaign(context.getters.editCampaignId, context.state.newCampaign);
			}
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				notifySuccess("Campaign updated successfully!");
			}
		},
		deletePersonalCampaign: async (context, campaignId) => {
			const response = await deleteCampaign(campaignId);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('removePersonalCampaign', campaignId);
				notifySuccess("Campaign deleted successfully!");
			}
		},
		fetchPersonalCampaigns: async context => {
			const response = await getCampaigns();
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setPersonalCampaigns', response.data);
			}
		},
		fetchCampaignStats: async (context, campaignId) => {
			await context.dispatch('fetchCampaignStatsCampaign', campaignId);
			await context.dispatch('fetchCampaignClickStats', campaignId);
			await context.dispatch('fetchCampaignStatsPost');
		},
		fetchCampaignStatsCampaign: async (context, campaignId) => {
			const response = await getCampaignById(campaignId);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setCampaignStatsCampaign', response.data);
			}
		},
		fetchCampaignClickStats: async (context) => {
			const advertisements = context.state.campaignStats.campaign.advertisements;
			let response;
			for await (let ad of advertisements) {
				response = await getAdvertisementClickStats(ad.id);
				if (response.status >= 400) {
					notifyError(response.data);
				} else {
					context.commit('addAdvertisementClickStats', response.data);
				}
			}
		},
		fetchCampaignStatsPost: async (context) => {
			const postId = context.getters.campaignStats.campaign.contentId;
			const response = await getPostById(postId);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setCampaignStatsPost', response.data);
			}
		},
		registerClick: async (context, advertisementId) => {
			const response = await registerClick(advertisementId);
			if (response.status >= 400) {
				notifyError(response.data);
			}
		},
		fetchCampaignForEdit: async (context) => {
			if (!context.getters.editCampaignId) return;
			const response = await getCampaignById(context.getters.editCampaignId);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setNewCampaign', response.data);
				if (!context.getters.newCampaignTargetedGroup) {
					context.commit('setNewCampaignTargetedGroup', {});
				}
				if (context.getters.newCampaignExposureMoment) {
					context.commit("setNewCampaignLongTerm", false);
				} else {
					context.commit("setNewCampaignLongTerm", true);
				}
			}
		}
	}
}
