// api/callback.js
// Deuxième étape de la connexion GitHub : GitHub renvoie ici avec un
// code temporaire, qu'on échange contre un jeton d'accès, puis on le
// transmet à la fenêtre du panneau admin qui a ouvert cette connexion.

export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    res.status(400).send(`Erreur d'authentification : ${tokenData.error_description}`);
    return;
  }

  const token = tokenData.access_token;
  const message = { token, provider: "github" };

  // Renvoie le jeton à la fenêtre d'admin qui a ouvert cette connexion.
  const script = `
    <script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(message)}',
            e.origin
          );
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(script);
}
