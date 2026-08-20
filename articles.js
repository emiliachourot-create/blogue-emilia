// Charge les articles depuis articles.json — le vrai fichier de données
// que le panneau admin (/admin) écrit directement via l'API GitHub à
// chaque publication. index.html et article.html appellent loadArticles()
// avant de faire leur rendu.
let articles = [];

async function loadArticles(prefix = "") {
  const res = await fetch(prefix + "articles.json", { cache: "no-store" });
  articles = await res.json();
  return articles;
}

// Palette de couleurs pour les tags de catégorie — attribuée automatiquement
// selon l'ordre d'apparition des catégories. Ajouter une nouvelle catégorie
// (en l'écrivant simplement sur un article) lui donne la prochaine couleur
// disponible ; aucune configuration manuelle requise.
const tagPalette = [
  { bg: "#fdece7", fg: "#e8613f" }, // corail
  { bg: "#e9f2ec", fg: "#3f6b52" }, // sauge
  { bg: "#faf1de", fg: "#a5730f" }, // doré
  { bg: "#e8ecf5", fg: "#3d4f8f" }, // bleu ardoise
  { bg: "#f3e8f5", fg: "#7a3f8f" }, // prune
];

function getCategories() {
  return [...new Set(articles.map(a => a.category))];
}

function getTagColor(category) {
  const index = getCategories().indexOf(category);
  return tagPalette[Math.max(index, 0) % tagPalette.length];
}

function tagStyle(category) {
  const c = getTagColor(category);
  return `background:${c.bg};color:${c.fg};`;
}

// Transforme un titre en identifiant d'URL propre (slug).
function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // enlève les accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
