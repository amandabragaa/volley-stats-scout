export type StatCategory = "P" | "A" | "D" | "L" | "B" | "S";
export type StatValue = "++" | "+" | "-" | "/";

// Tipagem mais segura (evita string solta)
export type PlayerStats = Record<StatCategory, Record<StatValue, number>>;

export interface Player {
  id: string;
  name: string;
  stats: PlayerStats;
  expanded: boolean;
}

export const STAT_CATEGORIES: StatCategory[] = ["P", "A", "D", "L", "B", "S"];
export const STAT_VALUES: StatValue[] = ["++", "+", "-", "/"];

// Gerador de ID compatível com todos dispositivos
export const generateId = (): string =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// Criação de stats segura
export const createEmptyStats = (): PlayerStats => {
  return STAT_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = { "++": 0, "+": 0, "-": 0, "/": 0 };
    return acc;
  }, {} as PlayerStats);
};

// Criação de player
export const createPlayer = (name: string): Player => ({
  id: generateId(),
  name,
  stats: createEmptyStats(),
  expanded: false,
});
