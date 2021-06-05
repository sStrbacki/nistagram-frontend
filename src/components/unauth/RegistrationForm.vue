<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-row align="center" justify="center">
			<v-col cols="6">
        <v-row>
          <v-col>
            <v-text-field
                v-model="fullName"
                label="Full name"
                :rules="fullNameRules"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-menu
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
          </v-col>
          <v-col cols="4">
            <v-select
                v-model="gender"
                :rules="genderRules"
                required
                :items="[
                    {id: 0, gender: 'Male'},
                    {id: 1, gender: 'Female'},
                    {id: 2, gender: 'Other'}
                ]"
                item-text="gender"
                item-value="id"
                label="Select gender"
            ></v-select>
          </v-col>
        </v-row>
        <v-text-field
            v-model="phoneNumber"
            label="Phone number"
            :rules="phoneNumberRules"
            required
        ></v-text-field>
				<v-text-field
					v-model="username"
					label="Username"
					:rules="usernameRules"
					required
				></v-text-field>
				<v-text-field
					v-model="email"
					label="Email"
					:rules="emailRules"
					required
				></v-text-field>
				<v-text-field
					:append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
					:type="passwordVisible ? 'text' : 'password'"
					label="Password"
					hint="At least 8 characters"
					v-model="password"
					:rules="passwordRules"
					class="input-group--focused"
					@click:append="passwordVisible = !passwordVisible"
				></v-text-field>
				<v-text-field
					:append-icon="passwordConfirmationVisible ? 'mdi-eye' : 'mdi-eye-off'"
					:type="passwordConfirmationVisible ? 'text' : 'password'"
					label="Confirm your password"
					hint="At least 8 characters"
					v-model="passwordConfirmation"
					class="input-group--focused"
					:rules="passwordConfirmationRules"
					@click:append="
						passwordConfirmationVisible = !passwordConfirmationVisible
					"
				></v-text-field>
				<v-btn
					elevation="1"
					class="mt-1"
					:disabled="!isFormValid"
					@click="register"
				>
					Register
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
export default {
	name: 'RegistrationForm',
	data: function () {
		return {
			valid: true,
      menu: false,
      activePicker: null,
			emailRules: [
				(v) => !!v || 'Email is required',
				(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
      fullNameRules: [
        (v) => !!v || 'Full name is required'
      ],
      dateOfBirthRules: [
        (v) => !!v || 'Date of birth is required'
      ],
      phoneNumberRules: [
        (v) => !!v || 'Phone number is required'
      ],
      genderRules: [
        (v) => ([0, 1, 2].includes(v)) || 'Gender is required'
      ],
			usernameRules: [
				(v) => !!v || 'Username is required',
				(v) =>
					(v && v.length >= 5) || 'Username must be at least 5 characters long',
			],
			passwordRules: [
				(v) => !!v || 'Password is required',
				(v) =>
					(v && v.length >= 8) || 'Password must be at least 8 characters long',
				(v) =>
					/(?=.*[a-z])/.test(v) ||
					'Password must contain at least one lowercase letter',
				(v) =>
					/(?=.*[A-Z])/.test(v) ||
					'Password must contain at least one uppercase letter',
				(v) => /(?=.*\d)/.test(v) || 'Password must contain at least one digit',
				(v) =>
					/(?=.*[-+_!@#$%^&*.,?])/.test(v) ||
					'Password must contain at least one special character',
			],
			passwordConfirmation: '',
			passwordConfirmationRules: [
				(v) => !!v || 'Password confirmation is required',
				(v) => (v && v === this.password) || 'Password must match',
			],
			passwordVisible: false,
			passwordConfirmationVisible: false,
		};
	},
	computed: {
		isFormValid: function () {
			return (
				this.valid &&
				this.username !== '' &&
				this.password !== '' &&
				this.passwordConfirmation !== '' &&
				this.email !== ''
			);
		},
    fullName: {
      get() {
        return this.$store.getters.registrationFullName;
      },
      set(value) {
        this.$store.commit('setRegistrationFullName', value);
      }
    },
    dateOfBirth: {
      get() {
        return this.$store.getters.registrationDateOfBirth;
      },
      set(value) {
        this.$store.commit('setRegistrationDateOfBirth', value);
      }
    },
    phoneNumber: {
      get() {
        return this.$store.getters.registrationPhoneNumber;
      },
      set(value) {
        this.$store.commit('setRegistrationPhoneNumber', value);
      }
    },
    gender: {
      get() {
        return this.$store.getters.registrationGender;
      },
      set(value) {
        this.$store.commit('setRegistrationGender', value);
      }
    },
		username: {
			get() {
				return this.$store.getters.registrationUsername;
			},
			set(value) {
				this.$store.commit('setRegistrationUsername', value);
			},
		},
		password: {
			get() {
				return this.$store.getters.registrationPassword;
			},
			set(value) {
				this.$store.commit('setRegistrationPassword', value);
			},
		},
		email: {
			get() {
				return this.$store.getters.registrationEmail;
			},
			set(value) {
				this.$store.commit('setRegistrationEmail', value);
			},
		},
	},
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'));
    }
  },
	methods: {
		register: async function () {
			await this.$store.dispatch('register');
		},
	},
};
</script>

<style></style>
