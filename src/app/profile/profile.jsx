export default function Profile({profile}){
  return (
    <div className="profile">
    <p>Display name: {profile.display_name}</p>
    <p>Email: {profile.email}</p>
    <p>Country: {profile.country}</p>
    <p>ID: {profile.id}</p>
    </div>
  )
}