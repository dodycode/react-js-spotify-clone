import React, {useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepForward,
  faPlayCircle,
  faPauseCircle,
  faStepBackward,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons';
import './_player.scss';
import { useAuthContext } from '../../../contexts/AuthContext';
import { put } from '../../../adapters/xhr';

export default function Player() {
  let authContext = useAuthContext();
  let [playerLoaded, setPlayerLoaded] = useState(false);
  let [playerInstance, setPlayerInstance] = useState(undefined);
  let [playerPaused, setPlayerPaused] = useState(false);
  let [playerTrack, setPlayerTrack] = useState(false);
  let [playerShuffle, setPlayerShuffle] = useState(false);
  
  //states and ref for bar progress
  let [playerDuration, setPlayerDuration] = useState(0);
  let [playerPositionNumber, setPlayerPositionNumber] = useState(0);
  let [playerPositionPercentage, setPlayerPositionPercentage] = useState(0);
  const playerPosition = useRef(null);

  useEffect(() => {
    if(authContext?.token){
      const script = document.createElement('script');
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.defer = true;
      
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(authContext?.token); },
          volume: 0.5
        });

        setPlayerInstance(player);

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        //player state changed
        player.addListener('player_state_changed', (state => {
          if(!state) return;

          setPlayerTrack(state.track_window.current_track);
          setPlayerPaused(state.paused);
          setPlayerDuration(state.duration);
          setPlayerPositionNumber(state.position);

          player?.getCurrentState().then(state => {
            !state ? setPlayerLoaded(false) : setPlayerLoaded(true);
          });
        }));

        player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
          sessionStorage.removeItem('spotify-oauth-token');
          window.location.reload();
        });

        player.addListener('account_error', ({ message }) => {
            window.alert('Playback failed, make sure your account is Premium.');
            console.error(message);
        });

        player.connect();
      }
    }
  }, [authContext]);

  useEffect(() => {
    playerPosition.current = setInterval(() => {
      if(!playerPaused){
        let currPosition = playerPositionNumber;
        setPlayerPositionNumber(currPosition += 300);

        let currentPositionPercentage = playerPositionNumber ? (playerPositionNumber / playerDuration * 100) : 0;
        setPlayerPositionPercentage(currentPositionPercentage);
      }
    },300);

    //remove player interval when component unmount
    return () => {
      playerPosition.current && clearInterval(playerPosition.current);
    }
  },[playerPosition, playerPaused, playerDuration, playerPositionNumber, playerPositionPercentage]);

  const playerShuffleAction = async () => {
    if(authContext?.token){
      let apiHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authContext?.token}`
    };

      await put({
        url: `https://api.spotify.com/v1/me/player/shuffle?state=${!playerShuffle}`,
        headers: apiHeaders
      }).then((res) => {
        console.log(res);
        setPlayerShuffle(!playerShuffle);
      })
      .catch(err => {
          console.error(err);
          if(err?.response?.status === 401){
              sessionStorage.removeItem('spotify-oauth-token');
              window.location.reload();
          }
      });
    }
  }

  if(playerLoaded) {
    return (
      <div className="player">
        <div className="player__album">
          {playerTrack?.name ? (
            <>
              <img src={playerTrack?.album?.images[0].url} alt="artist album"/>
              <p>{playerTrack?.name} - {playerTrack?.artists[0].name}</p>
            </>
          ) : (
            <>
              <span />
              <p>Nothing's Playing</p>
            </>
          )}
          
        </div>
        <div className="player__controls">
          <button onClick={() => { playerInstance.previousTrack() }}><FontAwesomeIcon icon={faStepBackward} /></button>
          <button onClick={() => { playerInstance.togglePlay() }}><FontAwesomeIcon icon={playerPaused ? faPlayCircle : faPauseCircle} /></button>
          <button onClick={() => { playerInstance.nextTrack() }}><FontAwesomeIcon icon={faStepForward} /></button>
        </div>
        <div className="player__seekbar">
          <div ref={playerPosition} className="player__seekbar__progress" style={{width: playerPositionPercentage+'%'}}></div>
        </div>
        <div className="player__actions">
          <FontAwesomeIcon icon={faEllipsisH} />
          <FontAwesomeIcon icon={faHeart} />
          <button onClick={() => playerShuffleAction()} className={playerShuffle ? 'active' : ''}><FontAwesomeIcon icon={faRandom} /></button>
          <FontAwesomeIcon icon={faRetweet} />
          <FontAwesomeIcon icon={faVolumeDown} />
        </div>
      </div>
    );
  }else{
    return (
      <div className="player" style={{textAlign:'center'}}>
        <p style={{width: '100%'}}>Player not active. Please transfer your playback using your Premium Spotify app</p>
      </div>
    );
  }
}
