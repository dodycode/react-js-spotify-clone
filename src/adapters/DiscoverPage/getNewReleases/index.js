import {get} from "../../xhr";

export async function getNewReleases() {
    return await get(`/browse/new-releases?country=ID`);
}