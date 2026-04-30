# Design Brief — Pokédex Kanto Reboot

## Direction artistique

**Ton** : Retro-futuriste Pokédex device. On évoque un vrai appareil Pokédex — écran
sombre, lueurs rouges, contours lumineux, typographie technique. Pas un site web
générique mais un **instrument de terrain** pour dresseur.

**Référence visuelle** : l'intérieur du Pokédex dans les jeux/anime — fond sombre,
texte lumineux, bords arrondis de device, scan-lines subtiles, glow effects.

## Palette

| Token            | Valeur                  | Usage                           |
|------------------|-------------------------|---------------------------------|
| `--bg-deep`      | `#0d0d0f`               | Fond principal                  |
| `--bg-surface`   | `#16161a`               | Cards, surfaces élevées         |
| `--bg-elevated`  | `#1e1e24`               | Inputs, hover states            |
| `--accent`       | `#e53935` (rouge Pokédex)| CTA, liens actifs, glow         |
| `--accent-soft`  | `rgba(229,57,53,0.15)` | Backgrounds teintés             |
| `--accent-glow`  | `rgba(229,57,53,0.4)`  | Box-shadow glow                 |
| `--text`         | `#e8e6e3`               | Texte principal                 |
| `--text-muted`   | `#8a8a8e`               | Texte secondaire                |
| `--border`       | `rgba(255,255,255,0.06)`| Bordures subtiles               |
| `--border-accent`| `rgba(229,57,53,0.3)`  | Bordures accentuées             |

### Couleurs de types Pokémon (sur fond sombre)
Garder les mêmes types que le CSS actuel mais en version plus saturée/lumineuse
pour bien ressortir sur dark. Chaque pill aura un léger glow de sa couleur.

## Typographie

- **Display / titres** : `"Rajdhani"` (Google Fonts) — angulaire, technique, évoque
  un HUD/device. Weight 600-700.
- **Body** : `"Outfit"` (Google Fonts) — géométrique propre, lisible, moderne.
  Weight 300-500.
- **Monospace accents** (IDs, stats) : `"JetBrains Mono"` ou system monospace.

## Composants clés

### Cards Pokémon (liste)
- Fond `--bg-surface` avec bordure très fine `--border`
- Au hover : bordure passe à `--border-accent`, léger glow rouge, scale 1.02
- Image du Pokémon avec léger drop-shadow coloré (couleur du type1)
- Numéro en monospace, semi-transparent
- Type pills avec glow subtil de leur couleur

### Fiche détaillée
- Header avec le nom en gros + numéro en mono
- Image centrée avec halo lumineux derrière (radial-gradient du type)
- Cards pour Description, Avis, Stats dans le même style surface
- Radar chart : garder les couleurs rouge/teal mais adapter au dark
- Map : ajouter un filtre pour intégrer au dark theme
- Navigation prev/next : boutons avec icônes flèches stylisées

### Comparateur
- Layout en 2 colonnes + VS central
- Responsive : empiler sur mobile
- Radar superposé en bas

### Navbar
- Fond `--bg-deep` avec blur + transparence
- Brand en rouge accent
- Liens avec underline animé au hover
- Hamburger mobile : animation X

### Home (Hero)
- Grand titre avec accent rouge sur un mot-clé
- Scan-line effect subtil en CSS (pseudo-element)
- Audio player stylisé

## Effets & Animations

- **Scan-lines** : pseudo-element repeating-linear-gradient sur le body, très subtil
- **Glow** : box-shadow avec `--accent-glow` sur les éléments interactifs
- **Fade-in staggeré** : garder mais plus rapide (0.5s), avec un léger blur initial
- **Hover cards** : border-color transition + glow pulse
- **Page transitions** : fade-in simple au mount

## Responsive (déjà géré, à conserver)

- Mobile-first
- Grid auto-fill/auto-fit
- Navbar hamburger avec overlay fullscreen
- Comparateur empilé sur mobile

## Fichiers à modifier

1. `index.html` — fonts Google (Rajdhani + Outfit)
2. `src/styles.css` — TOUT le CSS (dark theme, palette, typo, effets)
3. `src/components/Layout.tsx` — navbar dark, brand rouge
4. `src/components/PokemonCard.tsx` — hover glow
5. `src/components/TypePills.tsx` — couleurs lumineuses + glow
6. `src/components/StatRadar.tsx` — adapter couleurs au dark
7. `src/pages/Home.tsx` — hero retro-futuriste
8. `src/pages/Liste.tsx` — toolbar dark
9. `src/pages/Fiche.tsx` — halo image, dark cards
10. `src/pages/Comparateur.tsx` — dark adaptation
11. `src/pages/About.tsx` — dark adaptation
12. `src/pages/NotFound.tsx` — dark adaptation
