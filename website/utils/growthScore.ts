export const GROWTH_SCORE_STORAGE_KEY = "charterx:growth-score:v1";

export type GrowthScoreAnswer = {
  question: string;
  answer: "Yes" | "Not yet";
};

export type GrowthScorePayload = {
  score: number;
  total: number;
  state: string;
  answers: GrowthScoreAnswer[];
};

export function formatGrowthScoreNotes(payload: GrowthScorePayload) {
  const answers = payload.answers
    .map((item, index) => `${index + 1}. ${item.question}\n   Answer: ${item.answer}`)
    .join("\n");

  return `Yacht Growth Score: ${payload.score}/${payload.total}\nGrowth state: ${payload.state}\n\nDiagnostic answers:\n${answers}\n\nI would like CharterX to review the gaps highlighted by this score.`;
}
