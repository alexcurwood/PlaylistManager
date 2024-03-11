const clientId = "69749fff42f24a4f9f3b13642211bb0d";
const code = undefined;

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
  populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId) {
  // TODO: Redirect to Spotify authorization page
}

async function getAccessToken(clientId, code) {
  // TODO: Get access token for code
}

async function fetchProfile(token) {
  // TODO: Call Web API
}

function populateUI(profile) {
  // TODO: Update UI with profile data
}
