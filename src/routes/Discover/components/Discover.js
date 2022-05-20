import React from 'react';
import BusinessLogic from '../BusinessLogic';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default function Discover() {
  
  const {newReleases, playlists, categories} = BusinessLogic();

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
    </div>
  );
}