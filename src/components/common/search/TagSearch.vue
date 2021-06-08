<template>
	<v-col cols="12">
		<v-row>
			<v-text-field v-model="tag">
				<v-icon slot="prepend">
					mdi-tag
				</v-icon>
				<v-icon slot="append" @click="appendTag()">
					mdi-plus
				</v-icon>
			</v-text-field>
		</v-row>
		<v-row>
			<v-chip
				class="ma-2"
				close
				@click:close="removeTag(tag)"
				v-for="(tag, index) in tagQuery"
				:key="index"
			>
				{{ tag }}
			</v-chip>
		</v-row>
	</v-col>
</template>

<script>
export default {
	name: 'TagSearch',
	data() {
		return {
			tag: ''
		};
	},
	methods: {
		appendTag() {
			this.$store.dispatch('appendTag', this.tag);
			this.tag = '';
		},
		removeTag(tag) {
			this.$store.dispatch('removeTag', tag);
		}
	},
	computed: {
		tagQuery: {
			get() {
				return this.$store.getters.tagQuery;
			}
		}
	}
};
</script>

<style></style>
