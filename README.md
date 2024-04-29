## Spotify Project

### This web application seeks to solve the following problem: the Spotify Application does not allow for functionality requested by users.

### Thus far, the application features a playlist manager tool which, after authorisation, allows users to filter one of their playlists by any number of genres, and create a subplaylist using the filtered songs.

### The application has been created using Next.js, utilising the Spotify API for functionality, and TailwindCSS and Flowbite for styling

### Research Methods

Research was conducted regarding which features, missing from the Spotify application, end-users would like to have available in a web application. The research covered a wide range of demographics and primarily focused on Spotify users.

### Research Results

The three most requested features were:

1. A playlist manager tool, which allows the user to filter a given playlist by x number of genres and create a subplaylist out of the filtered songs.
2. A statistic viewer tool, which allows the user to view their most listened-to songs/ artists/ genres over a given period of time.
3. A new music finder tool, which creates a recommendations playlist based on the user's listening habits
   Analysing the research further, it was found that in general: younger users prioritised a new music finder tool, older users prioritised a playlist manager tool, and the most frequent users also prioritised a playlist manager tool.

### Project Planning

Based on user research, the first feature chosen to be implemented was a playlist manager tool. A detailed breakdown of the plan for this feature can be found within the plan.drawio file.

### Playlist Manager Tool

The playlist manager tool was created using various calls to the Spotify API: https://developer.spotify.com/documentation/web-api. The user first grants permission using OAuth2.0 for the application to make API calls on their behalf. Various GET requests are then made to retrieve data regarding the user's playlists, and the songs within them. This data is then used within the genre-filtering process. After filtering, a POST request is then made to add the filtered playlist to the user's profile.

### Styling

The application was styled using TailwindCSS and the Flowbite Component Library.

## For a detailed description of the development process, please see the following blog posts:

Research, planning and proof of concept:

https://www.linkedin.com/posts/alexcurwood_i-am-ready-to-share-the-progress-of-my-spotify-activity-7185669550141493248-hqab?utm_source=share&utm_medium=member_desktop

Playlist manager tool:

https://www.linkedin.com/posts/alexcurwood_an-update-on-my-spotify-project-in-my-previous-activity-7189954918475014144-1sqT?utm_source=share&utm_medium=member_desktop
