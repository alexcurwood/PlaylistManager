"use client";
import { useEffect, useRef, useState } from "react";
import getToken from "../get-token";
import Profile from "../profile/profile";
import Playlists from "../playlists/playlists";
import { Button, Card } from "flowbite-react";

export default function Main() {
  if (typeof window !== "undefined") {
    // get code from redirected URL
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    const tokenInitialized = useRef(false);
    const profileInitialised = useRef(false);

    // on first load only, send a post request using the code verifier in local storage, and set the access code given by the response to local storage
    useEffect(() => {
      async function initialiseToken() {
        if (!tokenInitialized.current) {
          tokenInitialized.current = true;
          await getToken(code);
        }
      }
      initialiseToken();
    }, []);

    useEffect(() => {
      async function initialiseProfile() {
        if (!profileInitialised.current) {
          profileInitialised.current = true;
          await getProfile();
        }
      }
      initialiseProfile();
    }, []);
  }

  // initialise states
  const [profile, setProfile] = useState({});

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
      {!playlistsInitialised ? (
        <Card className="max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Playlist Manager Tool
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            A tool for filtering playlists by genre, to create sub-playlists
          </p>
          <Button onClick={getPlaylists} color={"purple"}>
            Try It Out
          </Button>
        </Card>
      ) : (
        <Playlists playlists={playlists} profile={profile} />
      )}
    </>
  );
}
