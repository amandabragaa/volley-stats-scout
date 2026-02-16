import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RotateCcw, FileText, ArrowLeft } from "lucide-react";
import ScoreBoard from "@/components/ScoreBoard";
import PlayerRow from "@/components/PlayerRow";
import { Player, StatCategory, StatValue, createPlayer } from "@/types/scout";
import { generateStatsPdf } from "@/utils/generatePdf";

const DEFAULT_COUNT = 14;

const Scout = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>(() =>
    Array.from({ length: DEFAULT_COUNT }, (_, i) =>
      createPlayer(`Jogador ${i + 1}`),
    ),
  );
  const [newPlayerName, setNewPlayerName] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const handleAddPlayer = () => {
    const name = newPlayerName.trim();
    if (!name) return;
    setPlayers((prev) => [...prev, createPlayer(name)]);
    setNewPlayerName("");
  };

  const handleToggle = (id: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, expanded: !p.expanded } : p)),
    );
  };

  const handleRemove = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStat = (id: string, category: StatCategory, value: StatValue) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              stats: {
                ...p.stats,
                [category]: {
                  ...p.stats[category],
                  [value]: (p.stats[category][value] || 0) + 1,
                },
              },
            }
          : p,
      ),
    );
  };

  const handleReset = () => {
    setPlayers(
      Array.from({ length: DEFAULT_COUNT }, (_, i) =>
        createPlayer(`Jogador ${i + 1}`),
      ),
    );
    setHomeScore(0);
    setAwayScore(0);
    setHomeTeam("");
    setAwayTeam("");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleNameChange = (id: string, name: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground shadow-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl tracking-wider">VOLLEY SCOUT</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Scoreboard */}
        <ScoreBoard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeScore={homeScore}
          awayScore={awayScore}
          onHomeTeamChange={setHomeTeam}
          onAwayTeamChange={setAwayTeam}
          onHomeScoreChange={(d) => setHomeScore((s) => Math.max(0, s + d))}
          onAwayScoreChange={(d) => setAwayScore((s) => Math.max(0, s + d))}
        />

        {/* Players */}
        <div className="space-y-2">
          {players.map((player) => (
            <PlayerRow
              key={player.id}
              player={player}
              onToggle={() => handleToggle(player.id)}
              onRemove={() => handleRemove(player.id)}
              onStat={(cat, val) => handleStat(player.id, cat, val)}
              onNameChange={(name) => handleNameChange(player.id, name)}
            />
          ))}
        </div>

        {/* Add Player */}
        <div className="flex gap-2">
          <Input
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nome do jogador"
            onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
          />
          <Button
            onClick={handleAddPlayer}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 gap-2"
          >
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() =>
              generateStatsPdf(
                players,
                homeTeam,
                awayTeam,
                homeScore,
                awayScore,
              )
            }
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-base py-6"
          >
            <FileText className="h-5 w-5" /> Estatísticas
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-destructive text-destructive hover:bg-destructive/10 gap-2 text-base py-6"
          >
            <RotateCcw className="h-5 w-5" /> Resetar Scout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Scout;
