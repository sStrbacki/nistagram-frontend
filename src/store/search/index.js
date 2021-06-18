import {
	findUsers,
	findPosts,
	findTaggableUsers, promiseToFindTaggableUsersByUsername
} from '../../services/searchService';
import {notifyError} from "@/services/notificationService";
import {promiseToFindPostsWhereUserIsTagged} from "@/services/searchService";

export default {
	state: {
		queries: {
			userQuery: '',
			taggableUserQuery: '',
			locationQuery: null,
			tagQuery: []
		},
		results: {
			users: [],
			posts: []
		},
		location: {
			street: ''
		},
		tag: {
			usernameQuery: '',
			foundPosts: '',
			suggestedUsernames: []
		}
	},
	mutations: {
		setPostsWhereUserIsTagged: (state, posts) => {
			state.tag.foundPosts = posts;
		},
		setUsersWhoCanBeTaggedInPosts: (state, users) => {
			state.tag.suggestedUsernames = users;
		},
		setPostTaggedUser: (state, username) => {
			state.tag.usernameQuery = username;
		},
		setLocationStreet: (state, street) => {
			state.location.street = street;
		},
		setTaggableUserQuery: (state, userQuery) => {
			state.queries.taggableUserQuery = userQuery;
		},
		setUserQuery: (state, userQuery) => {
			state.queries.userQuery = userQuery;
		},
		setLocationQuery: (state, locationQuery) => {
			state.queries.locationQuery = locationQuery;
		},
		setTagQuery: (state, tagQuery) => {
			state.queries.locationQuery = tagQuery;
		},
		setUsers: (state, users) => {
			state.results.users = users;
		},
		setPosts: (state, posts) => {
			state.results.posts = posts;
		},
		appendTag: (state, tag) => {
			state.queries.tagQuery = [...state.queries.tagQuery, tag];
		},
		removeTag: (state, tag) => {
			state.queries.tagQuery = state.queries.tagQuery.filter(
				tagEntry => tagEntry !== tag
			);
		}
	},
	actions: {
		findUsersByUsername: async state => {
			const response = await findUsers(state.getters.userQuery);
			state.commit('setUsers', response);
		},
		findTaggableUsersByUsername: async state => {
			const response = await findTaggableUsers(state.getters.taggableUserQuery);
			state.commit('setUsers', response);
		},
		findPostsByLocation: async state => {
			console.log("Location", state.getters.locationStreet);
			findPosts(state.getters.locationStreet)
				.then(response => {
					console.log("Found some posts:", response.data);
					state.commit('setPosts', response.data);
				})
				.catch(e => {
					notifyError("Failed to load");
					console.error(e.response.data);
				})
		},
		appendTag: (state, tag) => {
			state.commit('appendTag', tag);
		},
		removeTag: (state, tag) => {
			state.commit('removeTag', tag);
		},
		findPostsByTaggedUser: async state => {
			promiseToFindPostsWhereUserIsTagged(state.getters.postTagQuery)
				.then(response => {
					state.commit('setPostsWhereUserIsTagged', response.data);
				})
		},
		findPostTaggableUsers: async state => {
			promiseToFindTaggableUsersByUsername(state.getters.postTagQuery)
				.then(response => {
					state.commit('setUsersWhoCanBeTaggedInPosts', response.data);
				});
		}
	},
	getters: {
		postTaggableUsers: state => {
			return state.tag.suggestedUsernames;
		},
		postsWhereUserIsTagged: state => {
			return state.tag.foundPosts;
		},
		postTagQuery: state => {
			return state.tag.usernameQuery
		},
		locationStreet: state => {
			return state.location.street;
		},
		taggableUserQuery: state => {
			return state.queries.taggableUserQuery;
		},
		userQuery: state => {
			return state.queries.userQuery;
		},
		locationQuery: state => {
			return state.queries.locationQuery;
		},
		tagQuery: state => {
			return state.queries.tagQuery;
		},
		foundUsers: state => {
			return state.results.users;
		},
		foundPosts: state => {
			return state.results.posts;
		}
	}
};
