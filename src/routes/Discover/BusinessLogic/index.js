import { useState, useEffect } from 'react';

import {get} from '../../../adapters/xhr';
import { useAuthContext } from '../../../contexts/AuthContext';

export default function BusinessLogic() {
    const [newReleases, setNewReleases] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [categories, setCategories] = useState([]);

    const authContext = useAuthContext();

    //call multiple API in parallel
    useEffect(() => {
        if(authContext?.token){
            const errorHandler = (err) => {
                console.error(err);
                if(err?.response?.status === 401){
                    sessionStorage.removeItem('spotify-oauth-token');
                    window.location.reload();
                }
            }
    
            const callNewReleasesEndpoint = async () => {
                await get({
                    url: "/browse/new-releases?country=ID",
                    token: authContext?.token
                }).then(res => {
                    // console.log(res);
                    if(res?.data?.albums?.items){
                        setNewReleases(res.data.albums.items);
                    }
                }).catch(err => {
                    errorHandler(err);
                });
            }

            const callFeaturedPlaylistsEndpoint = async () => {
                await get({
                    url: "/browse/featured-playlists?country=ID",
                    token: authContext?.token
                }).then(res => {
                    // console.log(res)
                    if(res?.data?.playlists?.items){
                        setPlaylists(res.data.playlists.items);
                    }
                }).catch(err => {
                    errorHandler(err);
                });
            }

            const callCategoriesEndpoint = async () => {
                await get({
                    url: "/browse/categories?country=ID",
                    token: authContext?.token
                }).then(res => {
                    // console.log(res)
                    if(res?.data?.categories?.items){
                        setCategories(res.data.categories.items);
                    }
                }).catch(err => {
                    errorHandler(err);
                });
            }

            callNewReleasesEndpoint();
            callFeaturedPlaylistsEndpoint();
            callCategoriesEndpoint();
        }
    }, [authContext?.token]);

    return {
        newReleases, 
        playlists, 
        categories
    };
}