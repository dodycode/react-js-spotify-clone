import {get} from "../../xhr";

export async function getFeaturedPlaylists() {
    return await get('/browse/featured-playlists?country=ID');
}