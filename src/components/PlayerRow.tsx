import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Player, STAT_CATEGORIES, STAT_VALUES, StatCategory, StatValue } from "@/types/scout";

interface PlayerRowProps {
  player: Player;
  onToggle: () => void;
  onRemove: () => void;
  onStat: (category: StatCategory, value: StatValue) => void;
}

const statValueColors: Record<StatValue, string> = {
  "++": "bg-stat-excellent text-primary-foreground",
  "+": "bg-stat-good text-primary-foreground",
  "-": "bg-stat-bad text-destructive-foreground",
  "/": "bg-secondary text-secondary-foreground",
};

const PlayerRow = ({ player, onToggle, onRemove, onStat }: PlayerRowProps) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {player.expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          <span className="font-semibold text-card-foreground">{player.name}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {player.expanded && (
        <div className="border-t border-border p-3 overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr>
                <th className="pb-2 text-muted-foreground font-medium w-12"></th>
                {STAT_CATEGORIES.map((cat) => (
                  <th key={cat} className="pb-2 text-foreground font-bold text-base">{cat}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STAT_VALUES.map((val) => (
                <tr key={val}>
                  <td className="py-1 font-bold text-muted-foreground">{val}</td>
                  {STAT_CATEGORIES.map((cat) => (
                    <td key={cat} className="py-1 px-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-full min-w-[48px] font-bold ${statValueColors[val]} hover:opacity-80`}
                        onClick={() => onStat(cat, val)}
                      >
                        {player.stats[cat][val]}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlayerRow;
