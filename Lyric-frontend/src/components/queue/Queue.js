import React from 'react';
import './queue.css'; 

export default function Queue({ tracks, setCurrentIndex }) {
  return (
    <div className="queue-container">
      <h3>Queue</h3>
      <ul className="queue-list">
        {tracks && tracks.length > 0 ? (
          tracks.map((track, index) => (
            <li
              key={index}
              className="queue-item"
              onClick={() => setCurrentIndex(index)}
            >
             
              <div className="queue-item-details">
                <span className="queue-item-name">
                  {track?.name || track?.track?.name}
                </span>
                <span className="queue-item-artist">
                  {track?.artist || track?.track?.artists[0]?.name}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>No tracks available</p>
        )}
      </ul>
    </div>
  );
}
