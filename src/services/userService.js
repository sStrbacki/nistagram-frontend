import axios from 'axios';
import { api } from '../api/index';

async function getProfile() {
    try {
        return await axios.get(api.user.profile);
    } catch (err) {
        return err.response;
    }
}

async function updateProfile(personalData) {
    try {
        return await axios.put(api.user.profile, personalData);
    } catch (err) {
        return err.response;
    }
}

async function getNotificationPreferences() {
    try {
        return await axios.get(api.user.preferences);
    } catch (err) {
        return err.response;
    }
}

async function updateNotificationPreferences(notificationPreferences) {
    try {
        return await axios.put(api.user.preferences, notificationPreferences);
    } catch (err) {
        return err.response;
    }
}

async function getPrivacyData() {
    try {
        return await axios.get(api.user.privacyData);
    } catch (err) {
        return err.response;
    }
}

async function updatePrivacyData(privacyData) {
    try {
        return await axios.put(api.user.privacyData, privacyData);
    } catch (err) {
        return err.response;
    }
}

async function getPublicData(username) {
    try {
        return await axios.get(api.user.publicData + '/' + username);
    } catch (err) {
        return err.response;
    }
}

async function isPrivate(username) {
    try {
        return await axios.get(api.user.visibility + '/' + username);
    } catch (err) {
        return err.response;
    }
}

async function getProfileStats(username) {
    try {
        return await axios.get(api.user.stats + '/' + username);
    } catch (err) {
        return err.response;
    }
}

export {
    getProfile,
    updateProfile,
    getNotificationPreferences,
    updateNotificationPreferences,
    getPrivacyData,
    updatePrivacyData,
    getPublicData,
    isPrivate,
    getProfileStats
}
