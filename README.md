# Pokédex Kanto

Projet de web design réalisé par **Richard Dartus**, **Elliot Hallais** et **Emmanuelle Poiffaut**.

Application web front-end autour d'un **Pokédex de la 1re génération** (151 Pokémon), modernisée en 2026 avec **React**, **TypeScript** et **Vite**.

<p align="center">
  <img src="public/img/Pokedex.PNG" alt="Aperçu du projet Pokédex Kanto" width="700">
</p>

## Aperçu

Le projet propose :

- Une **page d'accueil** avec ambiance sonore.
- Une **liste de Pokémon** avec chargement progressif et tri avancé.
- Une **recherche** sur le nom, la description et les types.
- Une **fiche détaillée** par Pokémon avec carte de localisation et évolutions.
- Un **comparateur** de statistiques avec graphique radar.
- Une page **À propos** présentant le projet et l'équipe.
- Une page **404** personnalisée.

Les données sont chargées depuis un JSON local en français (`data/pokAPI.json`).

## Fonctionnalités principales

### Liste des Pokémon
- Affichage responsive des 151 Pokémon de Kanto.
- Infinite scroll pour limiter le chargement initial.
- Recherche textuelle (nom, description, types).
- Tri croissant/décroissant : numéro, alphabétique, taille, poids.
- Bouton aléatoire pour découvrir un Pokémon au hasard.

### Fiche Pokémon
- Image, types, taille, poids et description.
- Barres de statistiques animées.
- Navigation précédent/suivant (swipe sur mobile).
- Chaîne d'évolutions interactive.
- Carte des zones de localisation avec clignotement.
- Avis "expert" pour certains Pokémon.

### Comparateur (Battle)
- Sélection de deux Pokémon.
- Comparaison stat par stat avec barres visuelles.
- Graphique radar superposé (Chart.js).

### À propos
- Présentation du contexte du projet.
- Présentation de l'équipe avec cartes personnalisées.

## Stack technique

- **React 18** + **TypeScript**
- **Vite** (build & dev server)
- **React Router 6** (routing SPA)
- **Motion** (animations)
- **Chart.js** + **react-chartjs-2** (radar comparateur)
- **Lucide React** (icônes)

## Structure du projet

```text
.
├── index.html              # Point d'entrée HTML (Vite)
├── package.json            # Dépendances et scripts
├── vite.config.ts          # Configuration Vite
├── src/
│   ├── main.tsx            # Entry point React
│   ├── App.tsx             # Routes
│   ├── styles.css          # Design system complet
│   ├── components/         # Layout, PokemonCard, StatRadar, TypePills
│   ├── pages/              # Home, Liste, Fiche, Battle, About, NotFound
│   └── data/               # Helpers données & commentaires
├── data/                   # JSON Pokémon, audio, zones PNG
└── public/
    └── img/                # Sprites, photos équipe, GIFs 404
```

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:5173`.

### Build de production

```bash
npm run build
npm run preview
```

## Données

- **151 Pokémon** de la région de **Kanto**.
- Données locales dans `data/pokAPI.json`.
- 26 zones de localisation (carte + overlays PNG).

## Contexte

Ce dépôt est la version modernisée (React/TS/Vite, 2026) d'un projet étudiant orienté **web design** et **responsive design** autour d'un thème Pokémon. Le projet d'origine en AngularJS est disponible sur [web-design](https://github.com/Nespouique/web-design).
