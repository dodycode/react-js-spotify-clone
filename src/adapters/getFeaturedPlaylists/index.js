import {get} from "../xhr";

export function getFeaturedPlaylists() {
    return get('/browse/featured-playlists?country=ID');
}