import {postAuth} from "../xhr";

export function getAuthToken() {
    return postAuth();
}