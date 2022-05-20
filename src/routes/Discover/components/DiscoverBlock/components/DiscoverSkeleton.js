import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/_discover-item.scss';

export default function DiscoverItem() {
  return (
    <div className="discover-item animate__animated animate__fadeIn">
      <div
        className="discover-item__art"
      >
        <Skeleton width={150} height={150}/>
      </div>
    </div>
  );
}
