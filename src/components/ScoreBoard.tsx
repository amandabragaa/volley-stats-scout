import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ScoreBoardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  onHomeTeamChange: (name: string) => void;
  onAwayTeamChange: (name: string) => void;
  onHomeScoreChange: (delta: number) => void;
  onAwayScoreChange: (delta: number) => void;
}

const ScoreBoard = ({
  homeTeam, awayTeam, homeScore, awayScore,
  onHomeTeamChange, onAwayTeamChange,
  onHomeScoreChange, onAwayScoreChange,
}: ScoreBoardProps) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-card rounded-xl p-4 shadow-sm border border-border">
      {/* Home */}
      <div className="flex items-center gap-2 flex-1">
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => onHomeScoreChange(-1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <div className="text-center flex-1">
          <input
            className="w-full text-center bg-transparent border-b border-border text-sm font-semibold focus:outline-none focus:border-primary pb-1"
            value={homeTeam}
            onChange={(e) => onHomeTeamChange(e.target.value)}
            placeholder="Time Casa"
          />
          <span className="text-4xl font-bold text-score-home font-sans">{homeScore}</span>
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => onHomeScoreChange(1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <span className="text-2xl text-muted-foreground font-bold">×</span>

      {/* Away */}
      <div className="flex items-center gap-2 flex-1">
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => onAwayScoreChange(-1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <div className="text-center flex-1">
          <input
            className="w-full text-center bg-transparent border-b border-border text-sm font-semibold focus:outline-none focus:border-primary pb-1"
            value={awayTeam}
            onChange={(e) => onAwayTeamChange(e.target.value)}
            placeholder="Time Visitante"
          />
          <span className="text-4xl font-bold text-score-away font-sans">{awayScore}</span>
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => onAwayScoreChange(1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ScoreBoard;
