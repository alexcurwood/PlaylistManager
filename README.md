# Playlist Manager

## I am creating a NextJS application which allows the user to select one of their Spotify playlists, filter it by genre and create a sub-playlist.

### Motivations

As a Spotify user, I find my playlists become too large to manage easily. I wanted a tool which let me filter my playlists by a given set of genres, and create sub-playlists using these filters.

I sent a Google Forms survey to my peers, family, and friends, which indicated that other people experience the same issue and would use a tool which offers this functionality.

This formed my motivation for starting this project.

### Implementation

#### Planning

My first step was researching the Spotify API: https://developer.spotify.com/documentation/web-api. 

Using this documentation, I formed a plan to use various GET and POST requests to the /artists, /playlists, and /tracks endpoints to achieve the required functionality. I also familiarised myself with the OAuth2.0 authorisation system, which was necessary for making these API calls on the user's behalf.

#### Proof of Concept

I then implemented the OAuth2.0 process within my application and sent GET requests to the /me and /playlists endpoints to display basic user data. This simple implementation demonstrated that I could achieve the desired functionality with complex logic and further API calls.

#### Playlist Manager

Using various GET requests to the /playlists, /tracks, and /artists endpoints, I could select a playlist from my library, filter it by various genres, and display the resulting sub-playlist. Then, using a POST request to the /playlists endpoint, I created an empty playlist within my library and populated it using a further POST request to the /playlist endpoint.
 
### Future Development

Currently, my application is very limited in its functionality. Only users authorised within my application dashboard can log in and use the playlist manager tool, and the application is limited to a certain number of API calls per minute. In addition, the UX/UI of the application can be greatly improved.

In future, I will look to move my application from development mode into extended quota mode to rectify the first two issues and develop wireframe designs to rectify the third.

### I styled the application using TailwindCSS and the Flowbite Component Library.

## For a detailed description of the development process, please see the following blog posts:

Research, planning and proof of concept:

https://www.linkedin.com/posts/alexcurwood_i-am-ready-to-share-the-progress-of-my-spotify-activity-7185669550141493248-hqab?utm_source=share&utm_medium=member_desktop

Playlist manager tool:

https://www.linkedin.com/posts/alexcurwood_an-update-on-my-spotify-project-in-my-previous-activity-7189954918475014144-1sqT?utm_source=share&utm_medium=member_desktop

Initial styling:

https://www.linkedin.com/posts/alexcurwood_another-short-update-on-my-spotify-project-activity-7190742730023579650-q-5s?utm_source=share&utm_medium=member_desktop
