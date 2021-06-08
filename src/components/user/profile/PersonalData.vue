<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-row align="center" justify="center">
			<v-col cols="6">
				<v-text-field
					v-if="editMode"
					v-model="fullName"
					label="Full Name"
					:rules="fullNameRules"
					required
				></v-text-field>
				<div class="my-5" v-else>
					<div class="mb-1">
						Full Name: <span class="float-right">{{ fullName }}</span>
					</div>
					<v-divider class="grey lighten-1"></v-divider>
				</div>
				<v-text-field
					v-if="editMode"
					v-model="email"
					label="E-mail"
					:rules="emailRules"
					required
				></v-text-field>
				<div class="mt-10" v-else>
					<div class="mb-1">
						E-mail: <span class="float-right">{{ email }}</span>
					</div>
					<v-divider class="grey lighten-1 mb-3"></v-divider>
				</div>
				<v-text-field
					v-if="editMode"
					v-model="phoneNumber"
					label="Phone number"
					:rules="phoneNumberRules"
					required
				></v-text-field>
				<div class="mt-10" v-else>
					<div class="mb-1">
						Phone Number: <span class="float-right">{{ phoneNumber }}</span>
					</div>
					<v-divider class="grey lighten-1 mb-3"></v-divider>
				</div>
				<v-menu
					v-if="editMode"
					ref="menu"
					v-model="menu"
					:close-on-content-click="false"
					transition="scale-transition"
					offset-y
					min-width="auto"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="dateOfBirth"
							label="Date of birth"
							prepend-icon="mdi-calendar"
							v-on="on"
							v-bind="attrs"
							readonly
							:rules="dateOfBirthRules"
							required
						></v-text-field>
					</template>
					<v-date-picker
						v-model="dateOfBirth"
						:active-picker.sync="activePicker"
						:max="new Date().toISOString().substr(0, 10)"
						min="1950-01-01"
					></v-date-picker>
				</v-menu>
				<div class="mt-10" v-else>
					<div class="mb-1">
						Date of Birth: <span class="float-right">{{ dateOfBirth }}</span>
					</div>
					<v-divider class="grey lighten-1 mb-3"></v-divider>
				</div>
				<v-select
					v-if="editMode"
					v-model="gender"
					:rules="genderRules"
					required
					:items="[
						{ value: 'MALE', gender: 'Male' },
						{ value: 'FEMALE', gender: 'Female' },
						{ value: 'OTHER', gender: 'Other' }
					]"
					item-text="gender"
					item-value="value"
					label="Select gender"
				></v-select>
				<div class="mt-10" v-else>
					<div class="mb-1">
						Gender: <span class="float-right">{{ capitalize(gender) }}</span>
					</div>
					<v-divider class="grey lighten-1 mb-3"></v-divider>
				</div>
				<v-text-field
					v-if="editMode"
					v-model="website"
					label="Website URL"
				></v-text-field>
				<div class="mt-10" v-else>
					<div class="mb-1">
						Website URL: <span class="float-right">{{ website }}</span>
					</div>
					<v-divider class="grey lighten-1 mb-3"></v-divider>
				</div>
				<v-textarea
					v-bind:disabled="!editMode"
					v-model="bio"
					label="Bio"
				></v-textarea>
				<v-row>
					<v-col>
						<v-btn
							v-if="!editMode"
							elevation="1"
							class="mt-1"
							@click="editMode = true"
						>
							Edit
						</v-btn>
						<v-btn v-else elevation="1" class="mt-1" @click="cancelEdit()">
							Cancel
						</v-btn>
						<v-btn
							elevation="1"
							class="mt-1 ml-5"
							:disabled="!valid"
							@click="update()"
						>
							Save
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
export default {
	name: 'PersonalData',
	data: () => {
		return {
			valid: true,
			menu: false,
			activePicker: null,
			emailRules: [
				v => !!v || 'Email is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
			],
			fullNameRules: [v => !!v || 'Full name is required'],
			dateOfBirthRules: [v => !!v || 'Date of birth is required'],
			phoneNumberRules: [v => !!v || 'Phone number is required'],
			genderRules: [
				v => ['MALE', 'FEMALE', 'OTHER'].includes(v) || 'Gender is required'
			],
			editMode: false
		};
	},
	mounted() {
		this.getProfile();
	},
	computed: {
		username: {
			get() {
				return this.$store.getters.username;
			}
		},
		fullName: {
			get() {
				return this.$store.getters.fullName;
			},
			set(value) {
				this.$store.commit('setFullName', value);
			}
		},
		dateOfBirth: {
			get() {
				return this.$store.getters.dateOfBirth;
			},
			set(value) {
				this.$store.commit('setDateOfBirth', value);
			}
		},
		gender: {
			get() {
				return this.$store.getters.gender;
			},
			set(value) {
				this.$store.commit('setGender', value);
			}
		},
		phoneNumber: {
			get() {
				return this.$store.getters.phoneNumber;
			},
			set(value) {
				this.$store.commit('setPhoneNumber', value);
			}
		},
		email: {
			get() {
				return this.$store.getters.email;
			},
			set(value) {
				this.$store.commit('setEmail', value);
			}
		},
		website: {
			get() {
				return this.$store.getters.website;
			},
			set(value) {
				this.$store.commit('setWebsite', value);
			}
		},
		bio: {
			get() {
				return this.$store.getters.bio;
			},
			set(value) {
				this.$store.commit('setBio', value);
			}
		}
	},
	methods: {
		getProfile: async function() {
			await this.$store.dispatch('getProfile');
		},
		capitalize: function(string) {
			string = string.toLowerCase();
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		update: async function() {
			await this.$store.dispatch('updateProfile');
			this.editMode = false;
		},
		cancelEdit: async function() {
			await this.getProfile();
			this.editMode = false;
		}
	}
};
</script>

<style scoped></style>
