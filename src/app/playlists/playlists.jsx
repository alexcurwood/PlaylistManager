import './playlists.css'
import {useState} from 'react'

export default function Playlists({playlistIds, playlistNames}){

    const [displayPlaylists, setDisplayPlaylists] = useState(true)
    const [playlistId, setPlaylistId] = useState()
    
    const playlistObj = Object.assign(...playlistNames.map((k, i) => ({[k]:playlistIds[i]})))

    function handleClick(playlist){
        setDisplayPlaylists(false)
        setPlaylistId(playlistObj[playlist.target.className])
    }

    function handleBack(){
        setDisplayPlaylists(true)
    }

    let tags = playlistNames.map(playlist =>
        <div className='playlistContainer'>
            <p>{playlist}</p>
        <button className= {playlist} onClick={playlist => handleClick(playlist)}>Use Playlist</button>
        </div>)
   return (
    <div className="playlists">
        {displayPlaylists && <div>
            {tags}
            </div>}
        {!displayPlaylists && <div>
            <button onClick = {handleBack}>Back</button>
            <iframe className = 'playlist' style={{borderRadius:12+"px"}} src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}  height="700" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div> }
    </div>
   ) 
}