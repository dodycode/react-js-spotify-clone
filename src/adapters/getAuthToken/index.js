import {postAuth} from "../xhr";

export async function getAuthToken() {
    return await postAuth();
}