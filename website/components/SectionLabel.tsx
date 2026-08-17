type SectionLabelProps = {
  children: React.ReactNode;
  index?: string;
  tone?: "light" | "dark";
};

export function SectionLabel({ children, index, tone = "dark" }: SectionLabelProps) {
  return (
    <div className={`section-label section-label--${tone}`}>
      {index && <span aria-hidden="true">{index}</span>}
      <p>{children}</p>
    </div>
  );
}
