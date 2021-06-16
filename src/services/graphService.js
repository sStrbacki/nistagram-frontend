import axios from "axios";
import {api} from "../api";

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

export {
    isFollowingProfile,
    isPendingProfile,
    followProfile,
    unfollowProfile
}
