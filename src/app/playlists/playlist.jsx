import "./playlist.css";

export default function Playlist(tracks) {
  let trackNames = tracks.tracks.map((track, index) => (
    <p className="bg-purple-700 w-full">{track.name}</p>
  ));
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {trackNames}
    </div>
  );
}
