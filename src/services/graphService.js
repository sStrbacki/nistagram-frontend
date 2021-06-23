import axios from 'axios';
import { api } from '../api';

async function block(username) {
	try {
		return await axios.post(api.graph.block + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function unblock(username) {
	try {
		return await axios.delete(api.graph.block + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function hasBlocked(username) {
	try {
		return await axios.get(api.graph.blocked + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function blockedBy(username) {
	try {
		return await axios.get(api.graph.blockedBy + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function hasMuted(username) {
	try {
		return await axios.get(api.graph.muted + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function mute(username) {
	try {
		return await axios.post(api.graph.mute + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function unmute(username) {
	try {
		return await axios.delete(api.graph.mute + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function getFollowed() {
	try {
		return await axios.get(api.graph.followed);
	} catch (err) {
		return err.response;
	}
}

async function isFollowingProfile(username) {
	try {
		return await axios.get(api.graph.following + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function isPendingProfile(username) {
	try {
		return await axios.get(api.graph.pending + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function followProfile(username) {
	try {
		return await axios.get(api.graph.follow + '/' + username);
	} catch (err) {
		return err.response;
	}
}

async function unfollowProfile(username) {
	try {
		return await axios.delete(api.graph.follow + '/' + username);
	} catch (err) {
		return err.response;
	}
}

// eslint-disable-next-line no-unused-vars
async function getFollowerRequests(username) {
	try {
		return await axios.get(api.graph.pendingFollowers);
	} catch (err) {
		return err.response;
	}
}

async function acceptFollowerRequest(username) {
	try {
		return await axios.post(api.graph.follow + '/accept/' + username);
	} catch (err) {
		return err.response;
	}
}

async function declineFollowerRequest(username) {
	try {
		return await axios.delete(api.graph.follow + '/decline/' + username);
	} catch (err) {
		return err.response;
	}
}

async function getCloseFriends() {
	try {
		return await axios.get(api.graph.closeFriends);
	} catch (err) {
		return err.response;
	}
}

async function addCloseFriend(username) {
	try {
		return await axios.post(api.graph.closeFriends + `/${username}`);
	} catch (err) {
		return err.response;
	}
}

async function removeCloseFriend(username) {
	try {
		return await axios.delete(api.graph.closeFriends + `/${username}`);
	} catch (err) {
		return err.response;
	}
}

export {
	block,
	unblock,
	hasBlocked,
	blockedBy,
	hasMuted,
	mute,
	unmute,
	getCloseFriends,
	addCloseFriend,
	removeCloseFriend,
	getFollowed,
	isFollowingProfile,
	isPendingProfile,
	followProfile,
	unfollowProfile,
	getFollowerRequests,
	acceptFollowerRequest,
	declineFollowerRequest
};
