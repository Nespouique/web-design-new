export type Pokemon = {
  id: string;
  nom: string;
  type1: string;
  type2: string;
  zone: number[];
  taille: number;
  poids: number;
  pv: number;
  attaque: number;
  defense: number;
  attaqueSpe: number;
  defenseSpe: number;
  vitesse: number;
  avis?: {
    auteur: string;
    ouvrage: string;
    citation: string;
  } | null;
  evolutions: string[];
  description: string;
};

export type CommentEntry = {
  id: string;
  comments: Array<{
    author: string;
    date: number;
    body: string;
  }>;
};
