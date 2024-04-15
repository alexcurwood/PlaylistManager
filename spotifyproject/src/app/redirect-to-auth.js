export default async function redirectToAuthPage() {
  console.log("redirectToAuthPage called");
  const clientId = "69749fff42f24a4f9f3b13642211bb0d";
  if (typeof window !== "undefined") {
    // generate code
    const generateRandomString = (length) => {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const sha256 = async (plain) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return crypto.subtle.digest("SHA-256", data);
    };

    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    function generateCodeVerifier() {
      const codeVerifier = generateRandomString(64);
      return codeVerifier;
    }

    async function generateCodeChallenge(codeVerifier) {
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);
      return codeChallenge;
    }

    const codeVerifier = generateCodeVerifier();

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const redirectUri = "http://localhost:3000/main";

    const scope = "user-read-private user-read-email";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // generated in the previous step
    window.localStorage.setItem("code_verifier", codeVerifier);
    window.localStorage.setItem("code_challenge", codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }
}
