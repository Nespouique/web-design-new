import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pokedex } from "../data/pokedex";
import type { Pokemon } from "../types";
import PokemonCard from "../components/PokemonCard";
import { Search, Hash, ArrowDownAZ, Ruler, Weight, Shuffle } from "lucide-react";

type SortKey = "id" | "nom" | "taille" | "poids";

const BATCH = 24;

const SORT_OPTIONS: { key: SortKey; icon: React.ElementType; label: string }[] = [
  { key: "id", icon: Hash, label: "Numéro" },
  { key: "nom", icon: ArrowDownAZ, label: "Alphabétique" },
  { key: "taille", icon: Ruler, label: "Taille" },
  { key: "poids", icon: Weight, label: "Poids" },
];

const Liste = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [reverse, setReverse] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BATCH);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let list: Pokemon[] = pokedex;
    if (query) {
      list = pokedex.filter((p) => {
        const haystack = `${p.nom} ${p.description} ${p.type1} ${p.type2}`.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        return haystack.includes(query);
      });
    }
    const sorted = [...list].sort((a, b) => {
      if (sortKey === "nom") return a.nom.localeCompare(b.nom, "fr");
      return Number(a[sortKey]) - Number(b[sortKey]);
    });
    return reverse ? sorted.reverse() : sorted;
  }, [search, sortKey, reverse]);

  const visible = filtered.slice(0, visibleCount);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) { setReverse(r => !r); }
    else { setSortKey(key); setReverse(false); }
  };

  const loadMore = useCallback(() => {
    setVisibleCount(v => Math.min(v + BATCH, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400) {
        loadMore();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore]);

  const goRandom = () => {
    const random = pokedex[Math.floor(Math.random() * pokedex.length)];
    navigate(`/fiche/${random.id}`);
  };

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-eyebrow">// DATABASE</div>
        <h2 className="section-title">POKÉDEX <span className="accent">INDEX</span></h2>
      </div>

      <div className="toolbar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input className="search-input" type="text" placeholder="Rechercher un Pokémon..." value={search} onChange={(e) => { setSearch(e.target.value); setVisibleCount(BATCH); }} />
        </div>
        <div className="chip-row">
          {SORT_OPTIONS.map(({ key, icon: Icon, label }) => {
            const active = sortKey === key;
            return (
              <button key={key} className={`btn btn-sort${active ? " active" : ""}`} onClick={() => toggleSort(key)} title={label} aria-label={label}>
                <Icon size={14} />
                {active && <span className="sort-arrow">{reverse ? "↓" : "↑"}</span>}
              </button>
            );
          })}
          <button className="btn btn-sort" onClick={goRandom} title="Pokémon aléatoire" aria-label="Pokémon aléatoire">
            <Shuffle size={14} />
          </button>
        </div>
      </div>

      <div className="grid">
        {visible.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <button className="btn btn-ghost" onClick={loadMore}>
            Charger plus
          </button>
        </div>
      )}
    </section>
  );
};

export default Liste;
