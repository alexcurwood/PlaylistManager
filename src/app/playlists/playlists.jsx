import './playlists.css'

export default function Playlists({playlistIds, playlistNames}){
    let tags = playlistNames.map(playlist =>
        <div className='playlistContainer'>
            <p>{playlist}</p>
        {/* <iframe className = 'playlist' style={{borderRadius:12+"px"}} src={`https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator`}  height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
        <button className='playlistButton'>Use Playlist</button>
        </div>)
   return (
    <div className="playlists">
        {tags}
    </div>
   ) 
}