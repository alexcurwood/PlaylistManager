import "./playlist.css";

export default function Playlist(tracks) {
  let trackNames = tracks.tracks.map((track) => (
    <p className="track">{track.name}</p>
  ));
  return <div className="playlist">{trackNames}</div>;
}
