import { type SummaryCard, SummaryCardTone } from "../data";

type AnalysisSummaryCardsProps = {
  cards: readonly SummaryCard[];
};

const TONE_CLASS: Record<SummaryCardTone, string> = {
  [SummaryCardTone.Secondary]: "text-analysis-secondary",
  [SummaryCardTone.Default]: "text-on-surface",
  [SummaryCardTone.PrimaryContainer]: "text-primary-container",
};

export function AnalysisSummaryCards({ cards }: AnalysisSummaryCardsProps) {
  return (
    <>
      {cards.map((card) => (
        <div
          key={card.label}
          className="col-span-12 border border-[#E5E7EB] bg-white p-4 md:col-span-4"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-on-surface-variant">
            {card.label}
          </p>
          <p
            className={`font-heading text-5xl font-bold leading-14 ${TONE_CLASS[card.tone]}`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </>
  );
}
