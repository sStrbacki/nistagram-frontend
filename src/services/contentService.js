import axios from 'axios';
import { api } from '../api/index';

async function createPost(post) {
	try {
		let res = await axios.post(api.content.postBase, post);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function createInfluencerPost(post) {
	try {
		return await axios.post(api.content.agent.post, post)
	} catch (err) {
		return err.response;
	}
}
async function createStory(story) {
	try {
		let res = await axios.post(api.content.mediaStory, story);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function createReshareStory(story) {
	try {
		let res = await axios.post(api.content.reshare, story);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getPostById(postId) {
	try {
		let res = await axios.get(api.content.postBase + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getStoryById(storyId) {
	try {
		let res = await axios.get(api.content.storyBase + '/' + storyId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function fetchInteractedPosts() {
	return axios.get(api.content.interactedPosts);
}

async function postLike(postId) {
	try {
		let res = await axios.get(api.content.postLike + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function postDislike(postId) {
	try {
		let res = await axios.get(api.content.postDislike + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function deleteLike(postId) {
	try {
		let res = await axios.delete(api.content.postLike + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function deleteDislike(postId) {
	try {
		let res = await axios.delete(api.content.postDislike + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function comment(comment) {
	try {
		let res = await axios.post(api.content.comment, comment);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function createCollection(collectionName) {
	try {
		let res = await axios.post(
			api.collection.collectionBase + '/' + collectionName
		);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function fetchCollections() {
	try {
		let res = await axios.get(api.collection.collectionBase);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function saveToDefaultCollection(postId) {
	try {
		let res = await axios.get(api.collection.saveDefault + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function saveToCustomCollection(postId, collectionName) {
	try {
		let res = await axios.get(
			api.collection.collectionBase + '/' + collectionName + '/add/' + postId
		);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function deleteCollection(collectionName) {
	try {
		let res = await axios.delete(
			api.collection.collectionBase + '/' + collectionName
		);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function fetchPostsFromDefault() {
	try {
		let res = await axios.get(api.collection.defaultCollection);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function fetchPostsFromCollection(collectionName) {
	try {
		let res = await axios.get(
			api.collection.collectionBase + '/' + collectionName
		);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function deletePostFromDefaultCollection(postId) {
	try {
		let res = await axios.get(api.collection.unsave + '/' + postId);
		return res;
	} catch (err) {
		return err.response;
	}
}
async function deletePostFromCustomCollection(collectionName, postId) {
	try {
		let res = await axios.delete(
			api.collection.collectionBase + '/' + collectionName + '/remove/' + postId
		);
		return res;
	} catch (err) {
		return err.response;
	}
}

async function getProfilePosts(username) {
	try {
		return await axios.get(api.content.userPosts + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function getProfilePostsPublic(username) {
	try {
		return await axios.get(api.content.userPostsPublic + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function getProfileHighlights(username) {
	try {
		return await axios.get(api.content.userHighlights + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function getProfileHighlightsPublic(username) {
	try {
		return await axios.get(api.content.userHighlightsPublic + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function getPersonalStories() {
	try {
		return await axios.get(api.content.personalStories);
	} catch (err) {
		return err.response;
	}
}

async function createHighlight(name) {
	try {
		return await axios.post(api.content.highlights + '/' + name);
	} catch (err) {
		return err.response;
	}
}

async function addStoryToHighlight(storyId, highlightId) {
	try {
		return await axios.post(api.content.highlights + '/' + highlightId + '/story/' + storyId);
	} catch (err) {
		return err.response;
	}
}

async function fetchNonApprovedPosts() {
	try {
		return await axios.get(api.content.nonApproved);
	} catch (err) {
		return err.response;
	}
}

async function approvePost(postId) {
	try {
		return await axios.put(api.content.nonApproved + '/' + postId);
	} catch (err) {
		return err.response;
	}
}

export {
	createPost,
	createStory,
	createReshareStory,
	getPostById,
	getStoryById,
	postLike,
	postDislike,
	deleteLike,
	deleteDislike,
	createCollection,
	fetchCollections,
	saveToDefaultCollection,
	saveToCustomCollection,
	deleteCollection,
	fetchPostsFromCollection,
	fetchPostsFromDefault,
	deletePostFromCustomCollection,
	deletePostFromDefaultCollection,
	comment,
	getProfilePosts,
	getProfilePostsPublic,
	getProfileHighlights,
	getProfileHighlightsPublic,
	getPersonalStories,
	createHighlight,
	addStoryToHighlight,
	fetchInteractedPosts,
	createInfluencerPost,
	fetchNonApprovedPosts,
	approvePost
};
