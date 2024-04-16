import "./playlists.css";
import { useState } from "react";

export default function Playlists({ playlists }) {
  const [displayPlaylists, setDisplayPlaylists] = useState(true);
  const [playlistId, setPlaylistId] = useState();

  function handleClick(e) {
    setDisplayPlaylists(false);
    setPlaylistId(e.target.className);
  }

  function handleBack() {
    setDisplayPlaylists(true);
  }

  let tags = playlists.map((playlist) => (
    <div className="playlistContainer">
      <p>{playlist.name}</p>
      <button className={playlist.id} onClick={(e) => handleClick(e)}>
        Use Playlist
      </button>
    </div>
  ));

  return (
    <div className="playlists">
      {displayPlaylists ? (
        <div>{tags}</div>
      ) : (
        !displayPlaylists && (
          <div>
            <button onClick={handleBack}>Back</button>
            <iframe
              className="playlist"
              style={{ borderRadius: 12 + "px" }}
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
              height="700"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )
      )}
    </div>
  );
}
