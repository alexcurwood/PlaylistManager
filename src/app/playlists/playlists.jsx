import "./playlists.css";
import Playlist from "./playlist";
import { useState, useRef } from "react";

export default function Playlists({ playlists }) {
  const [displayPlaylists, setDisplayPlaylists] = useState(true);
  const [genreButtons, setGenreButtons] = useState();
  const [tracks, _setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [tracksInitialised, setTracksInitialised] = useState(false);

  const tracksRef = useRef(tracks);

  function setTracks(tracks) {
    tracksRef.current = tracks;
    _setTracks(tracks);
  }

  function handleClick(e) {
    setDisplayPlaylists(false);
    createTracks(e.target.id);
    createGenreButtons(e.target.id);
  }

  function handleBack() {
    setDisplayPlaylists(true);
  }

  function filterByGenre(e) {
    const access_token = localStorage.getItem("access_token");
    let genreFilteredTracks = [];
    tracksRef.current.map(async (track) => {
      console.log(track);
      let artistId = await getArtist(track.id, access_token);
      console.log(artistId);
      let trackGenres = await getGenres(artistId, access_token, "track");
      console.log(trackGenres);
      if (trackGenres.includes(e.target.id)) {
        genreFilteredTracks.push(track);
      }
    });
    setFilteredTracks(genreFilteredTracks);
  }

  async function createGenreButtons(playlistId) {
    const access_token = localStorage.getItem("access_token");
    const json = await getPlaylist(playlistId, access_token);
    let artistIds = [];
    json.tracks.items.map((track) => {
      if (!artistIds.includes(track.track.artists[0].id)) {
        artistIds.push(track.track.artists[0].id);
      }
    });
    const genres = await getGenres(artistIds, access_token, "playlist");
    const genreButtons = genres.map((genre) => (
      <div className="genreButton">
        <button id={genre} onClick={(e) => filterByGenre(e)}>
          {genre}
        </button>
      </div>
    ));
    setGenreButtons(genreButtons);
  }

  async function createTracks(playlistId) {
    const access_token = localStorage.getItem("access_token");
    const json = await getPlaylist(playlistId, access_token);
    let tracks = json.tracks.items.map((track) => ({
      id: track.track.id,
      name: track.track.name,
    }));
    setTracks(tracks);
    setFilteredTracks(tracks);
    setTracksInitialised(true);
  }

  async function getGenres(artistIds, access_token, playlistOrTrack) {
    if (playlistOrTrack === "playlist") {
      let artistsQuery = artistIds.join("%2C");
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
    } else {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistIds}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      );
      const json = await response.json();
      return json.genres;
    }
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

  async function getArtist(trackId, access_token) {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const json = await response.json();
    return json.artists[0].id;
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
          {tracksInitialised && (
            <div className="playlistEditor">
              <Playlist tracks={tracks} />
              <Playlist tracks={filteredTracks} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
