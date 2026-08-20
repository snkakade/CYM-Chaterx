type GrowthStepIconProps = {
  step: string;
};

export function GrowthStepIcon({ step }: GrowthStepIconProps) {
  const common = {
    viewBox: "0 0 72 72",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  if (step === "Position") {
    return <svg {...common}><circle cx="36" cy="36" r="22" /><circle cx="36" cy="36" r="8" /><path d="M36 8v10M36 54v10M8 36h10M54 36h10M47 25 30 42l-5 5 5-12 17-10Z" /></svg>;
  }
  if (step === "List") {
    return <svg {...common}><rect x="16" y="13" width="40" height="46" rx="2" /><path d="M25 26h22M25 36h22M25 46h13" /><path d="m45 46 4 4 8-10" /></svg>;
  }
  if (step === "Attract") {
    return <svg {...common}><path d="M12 52c11-23 26-34 48-34" /><path d="m49 12 11 6-6 11" /><circle cx="22" cy="45" r="4" /><path d="M22 45c8-11 17-17 30-20" /></svg>;
  }
  if (step === "Convert") {
    return <svg {...common}><path d="M14 20h20v18H22l-8 7V20Z" /><path d="M38 34h20v18H46l-8 7V34Z" /><path d="m23 29 4 4 8-9" /></svg>;
  }
  return <svg {...common}><path d="M13 54h46M18 49V37M30 49V28M42 49V34M54 49V18" /><path d="m17 30 12-9 12 4 14-13" /><path d="m48 12h7v7" /></svg>;
}
