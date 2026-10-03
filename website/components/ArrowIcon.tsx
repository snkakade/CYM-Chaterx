type ArrowIconProps = {
  direction?: "up-right" | "right" | "down";
};

export function ArrowIcon({ direction = "up-right" }: ArrowIconProps) {
  return (
    <span className={`arrow-icon arrow-icon--${direction}`} aria-hidden="true">
      <svg viewBox="0 0 20 20" focusable="false">
        {direction === "right" ? (
          <path d="M3 10h14m-6-6 6 6-6 6" />
        ) : direction === "down" ? (
          <path d="M10 3v14m-6-6 6 6 6-6" />
        ) : (
          <path d="M4 16 16 4M7 4h9v9" />
        )}
      </svg>
    </span>
  );
}
