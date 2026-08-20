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
    res.status(400).send(`Erreur d'authentification : ${tokenData.error_description}. Retourne à /admin/ et reconnecte-toi.`);
    return;
  }

  const token = tokenData.access_token;

  res.writeHead(302, { Location: `/admin/#gh_token=${token}` });
  res.end();
}
