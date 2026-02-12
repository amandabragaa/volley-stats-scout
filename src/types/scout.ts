export type StatCategory = "P" | "A" | "D" | "L" | "B";
export type StatValue = "++" | "+" | "-" | "/";

export interface PlayerStats {
  [category: string]: {
    "++": number;
    "+": number;
    "-": number;
    "/": number;
  };
}

export interface Player {
  id: string;
  name: string;
  stats: PlayerStats;
  expanded: boolean;
}

export const STAT_CATEGORIES: StatCategory[] = ["P", "A", "D", "L", "B"];
export const STAT_VALUES: StatValue[] = ["++", "+", "-", "/"];

export const createEmptyStats = (): PlayerStats => {
  const stats: PlayerStats = {};
  for (const cat of STAT_CATEGORIES) {
    stats[cat] = { "++": 0, "+": 0, "-": 0, "/": 0 };
  }
  return stats;
};

export const createPlayer = (name: string): Player => ({
  id: crypto.randomUUID(),
  name,
  stats: createEmptyStats(),
  expanded: false,
});
