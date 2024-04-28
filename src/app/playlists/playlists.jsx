import "./playlists.css";
import Playlist from "./playlist";
import { useState, useRef } from "react";

export default function Playlists({ playlists, profile }) {
  const [displayPlaylists, setDisplayPlaylists] = useState(true);
  const [genreButtons, setGenreButtons] = useState();
  const [tracks, _setTracks] = useState([]);
  const [filteredTracks, _setFilteredTracks] = useState([]);
  const [tracksInitialised, setTracksInitialised] = useState(false);

  const tracksRef = useRef(tracks);
  const filteredTracksRef = useRef(filteredTracks);

  function setTracks(tracks) {
    tracksRef.current = tracks;
    _setTracks(tracks);
  }

  function setFilteredTracks(tracks) {
    filteredTracksRef.current = tracks;
    _setFilteredTracks(tracks);
  }

  function handleClick(e) {
    setDisplayPlaylists(false);
    createTracks(e.target.id);
    createGenreButtons(e.target.id);
  }

  function handleBack() {
    setDisplayPlaylists(true);
    setGenreButtons();
    setTracks([]);
    setFilteredTracks([]);
  }

  async function filterByGenre(genre) {
    const access_token = localStorage.getItem("access_token");
    let genreFilteredTracks = [...filteredTracksRef.current];
    const tracksCopy = [...tracksRef.current];
    await Promise.all(
      tracksCopy.map(async (track) => {
        const artistId = await getArtist(track.id, access_token);
        const trackGenres = await getGenres(artistId, access_token, "track");
        if (
          trackGenres.includes(genre) &&
          !genreFilteredTracks.includes(track)
        ) {
          genreFilteredTracks.push(track);
        }
      })
    );
    console.log(genreFilteredTracks);
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
        <button
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          id={genre}
          onClick={(e) => filterByGenre(e.target.id)}
        >
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
      uri: track.track.uri,
    }));
    setTracks(tracks);
    setTracksInitialised(true);
  }

  async function createPlaylist() {
    const access_token = localStorage.getItem("access_token");
    const newPlaylist = await postPlaylist(access_token);
    await postPlaylistTracks(newPlaylist.id, access_token);
  }

  async function postPlaylistTracks(playlistId, access_token) {
    const trackUris = [...filteredTracksRef.current].map((track) => track.uri);
    const data = { uris: trackUris, position: 0 };
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    return json;
  }

  async function postPlaylist(access_token) {
    const data = { name: "Generated playlist" };
    const response = await fetch(
      `https://api.spotify.com/v1/users/${profile.id}/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify(data),
      }
    );
    const json = response.json();
    return json;
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
      <p className="text-black text-xl font-bold tracking-tight">
        {playlist.name}
      </p>
      <button
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        id={playlist.id}
        onClick={(e) => handleClick(e)}
      >
        Use Playlist
      </button>
    </div>
  ));

  return (
    <>
      <div className="playlists">
        {displayPlaylists ? (
          <>
            <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
              Your Playlists:
            </h5>
            <div>{playlistContainers}</div>
          </>
        ) : (
          <div>
            <button
              className="focus:outline-none text-black bg-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={handleBack}
            >
              Back to your playlists
            </button>
            <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
              Filter your playlist by genres:
            </h5>
            <div class="flex flex-wrap gap-x-2">{genreButtons}</div>
            {tracksInitialised && (
              <div className="flex gap-x-2">
                <div className="">
                  <h5 className="text-xl font-bold tracking-tight text-white dark:text-white">
                    Original Playlist
                  </h5>
                  <Playlist tracks={tracks} />
                </div>
                <div>
                  <h5 className="text-xl font-bold tracking-tight text-white dark:text-white">
                    Filtered Playlist
                  </h5>
                  <Playlist tracks={filteredTracks} />
                </div>
              </div>
            )}
            <div className="py-10">
              <button
                className=" focus:outline-none text-black bg-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={createPlaylist}
              >
                Create Playlist
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
