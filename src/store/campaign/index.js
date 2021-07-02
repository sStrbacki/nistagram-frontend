import { notifyError, notifySuccess } from '../../services/notificationService';
import { createLongTermCampaign, createOneTimeCampaign } from '../../services/campaignService';

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
		}
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
		}
	},
	actions: {
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
		}
	}
}
