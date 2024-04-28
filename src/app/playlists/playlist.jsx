import "./playlist.css";

export default function Playlist(tracks) {
  let trackNames = tracks.tracks.map((track) => (
    <div className="p-3">
      <p className="w-full">{track.name}</p>
    </div>
  ));
  return (
    <div className="w-full min-h-full p-0 bg-purple-700 border border-gray-200 shadow rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {trackNames}
    </div>
  );
}
