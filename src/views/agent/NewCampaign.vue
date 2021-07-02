<template>
	<div>
		<v-row align="center" justify="center">
			<v-col cols="6">
				<h1>Create a new campaign.</h1>
				<v-text-field
					v-model="campaignName"
					label="Campaign name"
					required
					class="mb-5"
				></v-text-field>
				<h3>Publish campaign as:</h3>
				<v-radio-group row v-model="campaignType" class="mb-5">
					<v-radio
						label="Post"
						value="POST"
					></v-radio>
					<v-radio
						label="Story"
						value="STORY"
					></v-radio>
				</v-radio-group>
				<h3>Target audience:</h3>
				<v-row class="mb-5">
					<v-col>
						<v-text-field type="number" label="Minimum age" v-model="minAge"></v-text-field>
					</v-col>
					<v-col>
						<v-text-field type="number" label="Maximum age" v-model="maxAge"></v-text-field>
					</v-col>
					<v-col>
						<v-select label="Gender" :items="['MALE', 'FEMALE', 'OTHER']" v-model="gender"></v-select>
					</v-col>
				</v-row>
				<h3>Add advertisements:</h3>
				<v-chip
					v-for="(ad, index) in advertisements"
					:key="index"
					class="ma-2"
					close
					color="primary"
					text-color="white"
					@click:close="removeAdvertisement(index)"
				>
					{{ ad.caption }}
				</v-chip>
				<v-text-field
					v-model="caption"
					label="Advertisement caption"
					required
				></v-text-field>
				<v-text-field
					v-model="websiteUrl"
					label="Website URL"
					required
					class="mb-5"
				></v-text-field>
				<v-file-input
					v-model="file"
					color="deep-purple accent-4"
					counter
					label="Select a photo/video"
					accept="image/*,video/*"
					prepend-icon="mdi-paperclip"
					:show-size="1000"
				>
					<template v-slot:selection="{ index, text }">
						<v-chip
							v-if="index < 2"
							color="deep-purple accent-4"
							dark
							label
							small
						>
							{{ text }}
						</v-chip>
					</template>
				</v-file-input>
				<div v-if="mediaUrl">
					<v-img
						:src="mediaUrl"
						contain
						aspect-ratio="1"
						class="grey lighten-2"
						height="320px"
						v-if="!isVideo(mediaUrl)"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular
									indeterminate
									color="grey lighten-5"
								></v-progress-circular>
							</v-row>
						</template>
					</v-img>
					<video-player v-else>
						<source :src="mediaUrl" />
					</video-player>
				</div>
				<v-btn
					v-if="advertisementValid"
					color="primary"
					small
					@click="addAdvertisement()"
					class="mb-5"
				>Add</v-btn>
				<v-switch v-model="longTerm" :label="longTerm ? 'Long term campaign' : 'One time campaign'"></v-switch>
				<div v-if="longTerm">
					<v-menu
						ref="startsOnMenu"
						v-model="startsOnMenu"
						:close-on-content-click="false"
						:return-value.sync="startsOn"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="startsOn"
								label="Campaign start date"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="startsOn"
							no-title
							scrollable
						>
							<v-spacer></v-spacer>
							<v-btn
								text
								color="primary"
								@click="startsOnMenu = false"
							>
								Cancel
							</v-btn>
							<v-btn
								text
								color="primary"
								@click="$refs.startsOnMenu.save(startsOn)"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>
					<v-menu
						ref="endsOnMenu"
						v-model="endsOnMenu"
						:close-on-content-click="false"
						:return-value.sync="endsOn"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="endsOn"
								label="Campaign end date"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="endsOn"
							no-title
							scrollable
						>
							<v-spacer></v-spacer>
							<v-btn
								text
								color="primary"
								@click="endsOnMenu = false"
							>
								Cancel
							</v-btn>
							<v-btn
								text
								color="primary"
								@click="$refs.endsOnMenu.save(endsOn)"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>
					<h3>Daily exposure moments:</h3>
					<span>
						<v-chip
							v-for="(moment, index) in exposureMoments"
							:key="index"
							class="ma-2"
							close
							color="primary"
							text-color="white"
							@click:close="removeExposureMoment(moment)"
						>{{moment}}</v-chip>
						<v-col
							cols="11"
							sm="5"
						>
							<v-dialog
								ref="dialog"
								v-model="modal"
								:return-value.sync="time"
								persistent
								width="290px"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										small
										v-bind="attrs"
										v-on="on"
									>Add</v-btn>
								</template>
								<v-time-picker
									v-if="modal"
									v-model="time"
									full-width
								>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="modal = false"
									>
										Cancel
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="addExposureMoment(time); modal = false;"
									>
										OK
									</v-btn>
								</v-time-picker>
							</v-dialog>
						</v-col>
					</span>
				</div>
				<div v-else>
					<v-menu
						ref="oneTimeCampaignDateMenu"
						v-model="oneTimeCampaignDateMenu"
						:close-on-content-click="false"
						:return-value.sync="oneTimeCampaignDate"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="oneTimeCampaignDate"
								label="Campaign date"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="oneTimeCampaignDate"
							no-title
							scrollable
						>
							<v-spacer></v-spacer>
							<v-btn
								text
								color="primary"
								@click="oneTimeCampaignDateMenu = false"
							>
								Cancel
							</v-btn>
							<v-btn
								text
								color="primary"
								@click="$refs.oneTimeCampaignDateMenu.save(oneTimeCampaignDate)"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>
					<v-menu
						ref="oneTimeCampaignTimeMenu"
						v-model="oneTimeCampaignTimeMenu"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="oneTimeCampaignTime"
						transition="scale-transition"
						offset-y
						max-width="290px"
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="oneTimeCampaignTime"
								label="Campaign time"
								prepend-icon="mdi-clock-time-four-outline"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-time-picker
							v-if="oneTimeCampaignTimeMenu"
							v-model="oneTimeCampaignTime"
							full-width
							@click:minute="$refs.oneTimeCampaignTimeMenu.save(oneTimeCampaignTime)"
						></v-time-picker>
					</v-menu>
				</div>
				<v-btn @click="submit()" color="primary">Submit campaign</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { videoPlayer } from 'vue-md-player';
	import {
		format,
		set,
		parse,
		getYear,
		getMonth,
		getDate,
		getHours,
		getMinutes,
		getSeconds
	} from 'date-fns';
	export default {
		name: 'NewCampaign',
		components: { videoPlayer },
		data: () => {
			return {
				time: null,
				modal: false,
				startsOnMenu: false,
				endsOnMenu: false,
				oneTimeCampaignTimeMenu: false,
				oneTimeCampaignDateMenu: false,
				caption: '',
				websiteUrl: '',
				mediaUrl: ''
			}
		},
		methods: {
			isVideo(url) {
				return url.includes('videos');
			},
			resetAdvertisementForm() {
				this.caption = '';
				this.websiteUrl = '';
				this.mediaUrl = '';
				this.$store.commit('clearFile');
			},
			addAdvertisement() {
				const ad = {
					caption: this.caption,
					websiteUrl: this.websiteUrl,
					mediaUrl: this.mediaUrl
				}
				this.$store.commit('addNewCampaignAdvertisement', ad);
				this.resetAdvertisementForm();
			},
			removeAdvertisement(index) {
				this.$store.commit('removeNewCampaignAdvertisement', index);
			},
			addExposureMoment(moment) {
				this.$store.commit('addNewCampaignExposureMoment', moment);
			},
			removeExposureMoment(moment) {
				this.$store.commit('removeNewCampaignExposureMoment', moment);
			},
			submit() {
				this.$store.dispatch('createCampaign');
			}
		},
		watch: {
			async file(val) {
				if (val) {
					if (val.length === 0) await this.$store.dispatch('clearUrl');
					else {
						await this.$store.dispatch('postFile');
						this.mediaUrl = this.$store.getters.fileUrl;
					}
				}
			}
		},
		computed: {
			advertisementValid() {
				return this.mediaUrl && this.caption && this.websiteUrl;
			},
			longTerm: {
				get() {
					return this.$store.getters.newCampaignLongTerm;
				},
				set(value) {
					return this.$store.commit('setNewCampaignLongTerm', value);
				}
			},
			file: {
				get() {
					return this.$store.getters.file;
				},
				async set(value) {
					this.$store.commit('setFile', value);
				}
			},
			campaignName: {
				get() {
					return this.$store.getters.newCampaignName;
				},
				set(value) {
					this.$store.commit('setNewCampaignName', value);
				}
			},
			campaignType: {
				get() {
					return this.$store.getters.newCampaignType;
				},
				set(value) {
					this.$store.commit('setNewCampaignType', value);
				}
			},
			minAge: {
				get() {
					return this.$store.getters.newCampaignMinAge;
				},
				set(value) {
					this.$store.commit('setNewCampaignMinAge', value);
				}
			},
			maxAge: {
				get() {
					return this.$store.getters.newCampaignMaxAge;
				},
				set(value) {
					this.$store.commit('setNewCampaignMaxAge', value);
				}
			},
			gender: {
				get() {
					return this.$store.getters.newCampaignGender;
				},
				set(value) {
					this.$store.commit('setNewCampaignGender', value);
				}
			},
			advertisements: {
				get() {
					return this.$store.getters.newCampaignAdvertisements
				}
			},
			startsOn: {
				get() {
					return this.$store.getters.newCampaignStartsOn;
				},
				set(value) {
					this.$store.commit('setNewCampaignStartsOn', value);
				}
			},
			endsOn: {
				get() {
					return this.$store.getters.newCampaignEndsOn;
				},
				set(value) {
					this.$store.commit('setNewCampaignEndsOn', value);
				}
			},
			exposureMoments: {
				get() {
					return this.$store.getters.newCampaignExposureMoments;
				}
			},
			exposureMoment: {
				get() {
					return this.$store.getters.newCampaignExposureMoment;
				},
				set(value) {
					this.$store.commit('setNewCampaignExposureMoment', value);
				}
			},
			oneTimeCampaignTime: {
				get() {
					return this.exposureMoment ?
						format(new Date(this.exposureMoment), 'HH:mm') : null;
				},
				set(value) {
					let date = this.exposureMoment ?
						new Date(this.exposureMoment) : new Date();

					const newDate = parse(value, 'HH:mm', new Date());
					date = set(date,
						{
							hours: getHours(newDate),
							minutes: getMinutes(newDate),
							seconds: getSeconds(newDate)
						});
					this.exposureMoment = date;
				}
			},
			oneTimeCampaignDate: {
				get() {
					return this.exposureMoment ?
						format(new Date(this.exposureMoment), 'yyyy-MM-dd') : null;
				},
				set(value) {
					let date = this.exposureMoment ?
						new Date(this.exposureMoment) : new Date();
					const newDate = value ? new Date(value) : new Date();
					date = set(date,
						{
							year: getYear(newDate),
							month: getMonth(newDate),
							date: getDate(newDate)
						});
					this.exposureMoment = date;
				}
			}
		}
	};
</script>

<style scoped>

</style>
