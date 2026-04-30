import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { asset } from "../utils";

const NotFound = () => {
  const gifIndex = useMemo(
    () => String(Math.floor(Math.random() * 9) + 1).padStart(3, "0"),
    []
  );

  return (
    <section className="section not-found">
      <div className="not-found-code">404</div>
      <h2 style={{ fontFamily: "var(--font-display)", marginTop: 16 }}>
        PAGE INTROUVABLE
      </h2>
      <p className="text-muted" style={{ margin: "16px auto", maxWidth: 400 }}>
        La page demandée n'existe pas dans le Pokédex. Pour compenser, voici un
        GIF.
      </p>
      <img src={asset(`img/error/Error404_${gifIndex}.gif`)} alt="Erreur 404" />
      <p className="text-mono text-muted" style={{ marginTop: 16, fontSize: 12 }}>
        // Cordialement — Larbins de Pr. Kultouh
      </p>
      <Link
        className="btn btn-primary"
        to="/liste"
        style={{ marginTop: 24 }}
      >
        <ArrowLeft size={16} /> RETOUR AU DEX
      </Link>
    </section>
  );
};

export default NotFound;
