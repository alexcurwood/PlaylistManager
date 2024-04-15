export default function Playlists({playlists}){
    let tags = playlists.map(playlist =>
        <iframe style={{borderRadius:12+"px"}} src={`https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>)
   return (
    <div className="playlists">
        {tags}
    </div>
   ) 
}