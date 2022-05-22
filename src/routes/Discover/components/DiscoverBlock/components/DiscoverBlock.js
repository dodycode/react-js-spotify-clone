import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import DiscoverSkeleton from './DiscoverSkeleton';
import '../styles/_discover-block.scss';

function scrollContainer(id, { isNegative } = {}) {
  return () => {
    const scrollableContainer = document.getElementById(id);
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

export default function DiscoverBlock({ text, id, data, imagesKey = 'images' }) {
  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      <div className="discover-block__row" id={id}>
      {/* { console.log(data[0]?.type) } */}
        {
          data.length ? (
            data[0]?.type === "album" ? (
              data.map(({ [imagesKey]: images, name, artists }) => (
                <DiscoverItem key={name} images={images} name={name} songUri={artists ? artists[0].uri : null} />
              ))
            ) : data[0]?.type === "playlist" ? (
              data.map(({ [imagesKey]: images, name, uri }) => (
                <DiscoverItem key={name} images={images} name={name} songUri={uri} />
              ))
            ) : (
              data.map(({ [imagesKey]: images, name }) => (
                <DiscoverItem key={name} images={images} name={name} songUri={null} />
              ))
            )
          ) : (
            [...Array(5)].map((x,i) => (
              <DiscoverSkeleton key={i}/>
            ))
          )
        }
      </div>
    </div>
  );
}
