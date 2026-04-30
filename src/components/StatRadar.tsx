import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import type { Pokemon } from "../types";
import { STAT_KEYS, STAT_LABELS, type StatKey } from "../data/pokedex";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type RadarEntry = {
  pokemon: Pokemon;
  colorIndex: number;
};

const COLORS = [
  {
    fill: "rgba(230,57,70,0.15)",
    stroke: "#e63946",
  },
  {
    fill: "rgba(64,164,223,0.15)",
    stroke: "#40a4df",
  },
];

const StatRadar = ({ entries }: { entries: RadarEntry[] }) => {
  const labels = STAT_KEYS.map((k) => STAT_LABELS[k]);

  const datasets = entries.map((entry) => {
    const palette = COLORS[entry.colorIndex % COLORS.length];
    return {
      label: entry.pokemon.nom,
      data: STAT_KEYS.map((key: StatKey) => entry.pokemon[key] as number),
      backgroundColor: palette.fill,
      borderColor: palette.stroke,
      pointBackgroundColor: palette.stroke,
      borderWidth: 2,
    };
  });

  return (
    <Radar
      data={{ labels, datasets }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#888",
              font: {
                family: "Space Mono",
                size: 11,
              },
            },
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              backdropColor: "transparent",
              color: "#666",
            },
            grid: {
              color: "rgba(241,241,239,0.06)",
            },
            pointLabels: {
              color: "#f1f1ef",
              font: {
                family: "Space Mono",
              },
            },
          },
        },
      }}
    />
  );
};

export default StatRadar;
