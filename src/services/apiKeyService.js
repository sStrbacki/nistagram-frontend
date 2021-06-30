import axios from "axios";
import {api} from "@/api";

export async function getApiKey() {
    return axios.get(api.apiKey.root)
}

export async function generateApiKey(packageName) {
    return axios.get(api.apiKey.generate + '/' + packageName);
}

export async function getAgentApplication() {
    return axios.get(api.user.agents.website);
}
