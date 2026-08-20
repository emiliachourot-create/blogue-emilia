// api/auth.js
// Première étape de la connexion GitHub : redirige vers la page
// d'autorisation de GitHub. Utilise 2 variables d'environnement
// (GITHUB_CLIENT_ID) configurées dans Vercel — pas de base de données,
// pas de serveur à gérer, juste une redirection.

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `https://${req.headers.host}/api/callback`;

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo,user`;

  res.writeHead(302, { Location: githubAuthUrl });
  res.end();
}

