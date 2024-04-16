import "./playlists.css";
import { useState } from "react";

export default function Playlists({ playlists }) {
  const [displayPlaylists, setDisplayPlaylists] = useState(true);
  const [genreButtons, setGenreButtons] = useState();
  const [playlistId, setPlaylistId] = useState();

  function handleClick(e) {
    setDisplayPlaylists(false);
    setPlaylistId(e.target.className);
    createGenreButtons(e.target.className);
  }

  async function createGenreButtons(playlistId) {
    const access_token = localStorage.getItem("access_token");
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const json = await response.json();
    let genresArray = [];
    json.tracks.items.map((track) => {
      console.log(track.track.artists[0].genres);
      for (genre of track.track.artists[0].genres) {
        if (!genre in genresArray) {
          genresArray.append(genre);
        }
      }
    });
    let genreButtons = genresArray.map((genre) => {
      <button>{genre}</button>;
    });
    setGenreButtons(genreButtons);
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
            <div className="genre-buttons">{genreButtons}</div>
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
