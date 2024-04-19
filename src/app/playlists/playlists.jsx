import "./playlists.css";
import { useState } from "react";

export default function Playlists({ playlists }) {
  const [displayPlaylists, setDisplayPlaylists] = useState(true);
  const [genreButtons, setGenreButtons] = useState();
  const [playlistId, setPlaylistId] = useState();

  function handleClick(e) {
    setDisplayPlaylists(false);
    setPlaylistId(e.target.id);
    createGenreButtons(e.target.id);
  }

  async function createGenreButtons(playlistId) {
    const access_token = localStorage.getItem("access_token");
    const json = await getPlaylist(playlistId, access_token);
    let artistIDs = [];
    json.tracks.items.map((track) => {
      if (!artistIDs.includes(track.track.artists[0].id)) {
        artistIDs.push(track.track.artists[0].id);
      }
    });
    const genres = await getGenres(artistIDs, access_token);
    const genreButtons = genres.map((genre) => {
      <button>{genre}</button>;
    });
    console.log(genres);
    setGenreButtons(genreButtons);
  }

  async function getGenres(artistIDs, access_token) {
    let artistsQuery = artistIDs.join("%2C");
    const response = await fetch(
      `https://api.spotify.com/v1/artists?ids=${artistsQuery}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const json = await response.json();
    let genres = [];
    json.artists.map((artist) => {
      artist.genres.map((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });
    return genres;
  }

  async function getPlaylist(playlistId, access_token) {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const json = await response.json();
    return json;
  }

  function handleBack() {
    setDisplayPlaylists(true);
  }

  let playlistContainers = playlists.map((playlist) => (
    <div className="playlistContainer">
      <p>{playlist.name}</p>
      <button id={playlist.id} onClick={(e) => handleClick(e)}>
        Use Playlist
      </button>
    </div>
  ));

  return (
    <div className="playlists">
      {displayPlaylists ? (
        <div>{playlistContainers}</div>
      ) : (
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
      )}
    </div>
  );
}
