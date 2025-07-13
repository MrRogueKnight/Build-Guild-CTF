interface FlagColors {
  [key: number]: string;
}

const FLAG_COLORS: FlagColors = {
  1: "text-red-600",
  2: "text-orange-600",
  3: "text-amber-600",
  4: "text-yellow-600",
  5: "text-lime-600",
  6: "text-green-600",
  7: "text-emerald-600",
  8: "text-teal-600",
  9: "text-cyan-600",
  10: "text-sky-600",
  11: "text-blue-600",
  12: "text-indigo-600",
  13: "text-violet-600",
  14: "text-purple-600",
  15: "text-fuchsia-600",
};

const FLAG_BG_COLORS: FlagColors = {
  1: "bg-red-600",
  2: "bg-orange-600",
  3: "bg-amber-600",
  4: "bg-yellow-600",
  5: "bg-lime-600",
  6: "bg-green-600",
  7: "bg-emerald-600",
  8: "bg-teal-600",
  9: "bg-cyan-600",
  10: "bg-sky-600",
  11: "bg-blue-600",
  12: "bg-indigo-600",
  13: "bg-violet-600",
  14: "bg-purple-600",
  15: "bg-fuchsia-600",
};

export function getFlagColor(challengeId: number) {
  if (FLAG_COLORS[challengeId]) {
    return FLAG_COLORS[challengeId];
  }
  return FLAG_COLORS[1];
}

export function getFlagBgColor(challengeId: number) {
  if (FLAG_BG_COLORS[challengeId]) {
    return FLAG_BG_COLORS[challengeId];
  }
  return FLAG_BG_COLORS[1];
}
