import "./playlist.css";

export default function Playlist(tracks) {
  let tracksArray = tracks.tracks;
  console.log(tracksArray);
  const tracksDisplay = tracksArray.map((track) => (
    <p className="track">{track}</p>
  ));
  return <div className="playlist">{tracksDisplay}</div>;
}
