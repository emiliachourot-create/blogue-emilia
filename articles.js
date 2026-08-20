// Source unique des articles — utilisée par index.html (grille + vedette)
// et article.html (gabarit d'article). Le "slug" devient l'identifiant
// unique dans l'URL (article.html?slug=...) — chaque article a donc sa
// propre adresse stable, sans qu'on ait besoin d'un fichier par article.
//
// Plus tard, ce tableau sera généré automatiquement à partir de ce que
// tu publies dans le panneau admin — la structure ne change pas, seule
// la source des données change.
const articles = [
  {
    slug: "evaluer-une-rpa-ebitda-normalise",
    category: "RPA / RI",
    title: "Évaluer une RPA : ce que l'EBITDA normalisé révèle vraiment",
    description: "Valorisation, conformité et pièges fréquents pour les acheteurs de résidences pour aînés au Québec.",
    keywords: "rpa ri ebitda valorisation conformité résidence aînés",
    photo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1000&q=80",
    date: "20 août 2026",
    readTime: "6 min de lecture",
    body: `
      <p>Lorsqu'un acheteur évalue une résidence pour aînés (RPA ou RI), le prix affiché ne dit presque rien à lui seul. Ce qui compte, c'est ce qui se cache derrière les états financiers — et c'est exactement là qu'intervient la normalisation de l'EBITDA.</p>
      <h2>Pourquoi normaliser</h2>
      <p>Un exploitant peut présenter des états financiers qui reflètent des choix personnels plutôt que la performance réelle de l'établissement : salaire du propriétaire au-dessus ou en dessous du marché, dépenses non récurrentes, contrats liés à des parties apparentées. Normaliser l'EBITDA consiste à retirer ces distorsions pour obtenir une image fidèle de la rentabilité opérationnelle.</p>
      <h2>Ce que je vérifie systématiquement</h2>
      <p>La masse salariale comparée aux ratios du secteur, les contrats de service avec des tiers liés, les dépenses en immobilisations reportées, et la conformité réglementaire — un enjeu qui peut directement affecter la valeur si des mises aux normes sont à prévoir.</p>
      <h2>Ce que ça change pour l'acheteur</h2>
      <p>Un EBITDA normalisé permet de négocier sur des bases réelles plutôt que sur les chiffres présentés, et d'anticiper les investissements nécessaires après la transaction plutôt que de les découvrir après coup.</p>
    `
  },
  {
    slug: "marche-condos-banlieue-comparables",
    category: "Résidentiel",
    title: "Marché des condos en banlieue : ce que montrent les comparables",
    description: "Lecture d'une ACM récente et ce qu'elle indique pour les vendeurs cet automne.",
    keywords: "condo banlieue acm comparables marché vendeurs",
    photo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&q=80",
    date: "12 août 2026",
    readTime: "4 min de lecture",
    body: `
      <p>Contenu à venir — cet article sera complété directement via le panneau de publication.</p>
    `
  },
  {
    slug: "zonage-126-cr-avant-une-offre",
    category: "Commercial",
    title: "Zonage 126-CR : ce qu'il faut vérifier avant une offre",
    description: "Contamination, RPRT et annexes I/II — un dossier concret pour illustrer la démarche.",
    keywords: "zonage commercial contamination rprt annexe offre",
    photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
    date: "5 août 2026",
    readTime: "5 min de lecture",
    body: `
      <p>Contenu à venir — cet article sera complété directement via le panneau de publication.</p>
    `
  }
];

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
  return tagPalette[index % tagPalette.length];
}

function tagStyle(category) {
  const c = getTagColor(category);
  return `background:${c.bg};color:${c.fg};`;
}
