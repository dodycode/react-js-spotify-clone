import {get} from "../xhr";

export function getNewReleases() {
    return get(`/browse/new-releases?country=ID`);
}