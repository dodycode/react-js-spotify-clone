import { useState, useEffect } from 'react';

import { getNewReleases } from "../../../adapters/getNewReleases";
import { getFeaturedPlaylists } from "../../../adapters/getFeaturedPlaylists";
import { browseCategories } from '../../../adapters/browseCategories';

export default function BusinessLogic() {
    const [newReleases, setNewReleases] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [categories, setCategories] = useState([]);

    const token = sessionStorage.getItem('spotify-oauth-token');

    //call multiple API in parallel

    const callNewReleasesEndpoint = async () => {
        await getNewReleases().then(res => {
            // console.log(res);
            if(res?.data?.albums?.items){
                setNewReleases(res.data.albums.items);
            }
        }).catch(err => {
            throw err;
        });
    }

    const callFeaturedPlaylistsEndpoint = async () => {
        await getFeaturedPlaylists().then(res => {
            // console.log(res)
            if(res?.data?.playlists?.items){
                setPlaylists(res.data.playlists.items);
            }
        }).catch(err => {
            throw err;
        });
    }

    const callCategoriesEndpoint = async () => {
        await browseCategories().then(res => {
            // console.log(res)
            if(res?.data?.categories?.items){
                setCategories(res.data.categories.items);
            }
        }).catch(err => {
            throw err;
        });
    }

    useEffect(() => {
        let isMounted = true;

        if(token && isMounted){
            const errorHandler = (err) => {
                console.error(err);
                if(err?.response?.status === 401){
                    sessionStorage.removeItem('spotify-oauth-token');
                    window.location.reload();
                }
            }
    
            callNewReleasesEndpoint().catch(err => {
                errorHandler(err);
            });
            callFeaturedPlaylistsEndpoint().catch(err => {
                errorHandler(err);
            });
            callCategoriesEndpoint().catch(err => {
                errorHandler(err);
            });
        }
    }, [token]);

    return {
        newReleases, 
        playlists, 
        categories
    };
}