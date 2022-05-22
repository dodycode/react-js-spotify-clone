import React from 'react';
import '../styles/_discover-item.scss';

import { playSong } from '../../../BusinessLogic';

import { useAuthContext } from '../../../../../contexts/AuthContext';

export default function DiscoverItem({ images, name, songUri }) {
  const authContext = useAuthContext();

  return (
    <div onClick={() => songUri && authContext?.token ? playSong(songUri, authContext.token) : console.log('song not found')} className="discover-item animate__animated animate__fadeIn">
      <div
        className="discover-item__art"
        style={{ backgroundImage: `url(${images[0].url})` }}
      />
      <p className="discover-item__title">{name}</p>
    </div>
  );
}
