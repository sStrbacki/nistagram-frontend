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

export {
    getProfile,
    updateProfile,
    getNotificationPreferences,
    updateNotificationPreferences
}
