import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Player, STAT_CATEGORIES, STAT_VALUES } from "@/types/scout";

export const generateStatsPdf = (
  players: Player[],
  homeTeam: string,
  awayTeam: string,
  homeScore: number,
  awayScore: number,
) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Estatísticas do Scout", 105, 15, { align: "center" });

  doc.setFontSize(14);
  doc.text(
    `${homeTeam || "Time Casa"} ${homeScore} × ${awayScore} ${
      awayTeam || "Time Visitante"
    }`,
    105,
    25,
    { align: "center" },
  );

  let yPos = 35;

  players.forEach((player) => {
    const totalActions: Record<string, number> = {};

    STAT_CATEGORIES.forEach((cat) => {
      totalActions[cat] = STAT_VALUES.reduce(
        (sum, val) => sum + (player.stats[cat][val] || 0),
        0,
      );
    });

    const rows = STAT_VALUES.map((val) => {
      const row: (string | number)[] = [val];

      STAT_CATEGORIES.forEach((cat) => {
        const count = player.stats[cat][val] || 0;
        const total = totalActions[cat];
        const pct = total > 0 ? ((count / total) * 100).toFixed(1) + "%" : "0%";

        row.push(`${count} (${pct})`);
      });

      return row;
    });

    // Linha de total
    const totalsRow: (string | number)[] = ["Total"];
    STAT_CATEGORIES.forEach((cat) => {
      totalsRow.push(totalActions[cat]);
    });

    rows.push(totalsRow);

    doc.setFontSize(12);
    doc.text(player.name, 14, yPos);
    yPos += 2;

    autoTable(doc, {
      startY: yPos,
      head: [["", ...STAT_CATEGORIES]],
      body: rows,
      theme: "grid",
      headStyles: {
        fillColor: [249, 122, 31],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        halign: "center",
        fontSize: 9,
      },
      margin: { left: 14, right: 14 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    if (yPos > 260) {
      doc.addPage();
      yPos = 15;
    }
  });

  // NOVO FINAL (Preview + Download)
  const fileName = `scout_${homeTeam || "casa"}_vs_${
    awayTeam || "visitante"
  }.pdf`;

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);

  // Preview
  const newWindow = window.open(url, "_blank");

  // Download automático
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  // Limpeza
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};
