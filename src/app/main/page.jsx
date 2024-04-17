"use client";
import { useEffect, useRef, useState } from "react";
import getToken from "../get-token";
import Profile from "../profile/profile";
import Playlists from "../playlists/playlists";

export default function Main() {
  if (typeof window !== "undefined") {
    // get code from redirected URL
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    const initialized = useRef(false);

    // on first load only, send a post request using the code verifier in local storage, and set the access code given by the response to local storage
    useEffect(() => {
      async function initialiseToken() {
        if (!initialized.current) {
          initialized.current = true;
          await getToken(code);
        }
      }
      initialiseToken();
    }, []);
  }

  // initialise states
  const [profile, setProfile] = useState({});
  const [profileInitialised, setProfileInitialised] = useState(false);

  // get access token from local storage, send fetch profile request, store response in profile state, set initialised state for conditional rendering to true
  async function getProfile() {
    const access_token = localStorage.getItem("access_token");
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    const json = await response.json();
    setProfile(json);
    setProfileInitialised(true);
  }

  const [playlists, setPlaylists] = useState({});
  const [playlistsInitialised, setPlaylistsInitialised] = useState(false);

  async function getPlaylists() {
    const access_token = localStorage.getItem("access_token");
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    const json = await response.json();
    let fetchedPlaylists = json.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
    }));

    setPlaylists(fetchedPlaylists);
    setPlaylistsInitialised(true);
  }

  return (
    <>
      <h1>Profile</h1>
      <button onClick={getProfile}>Show Profile</button>
      {profileInitialised && <Profile profile={profile} />}
      <button onClick={getPlaylists}>Show Playlists</button>
      {playlistsInitialised && <Playlists playlists={playlists} />}
    </>
  );
}
