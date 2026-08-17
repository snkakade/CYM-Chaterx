type ServiceIconProps = { type: string };

export function ServiceIcon({ type }: ServiceIconProps) {
  return (
    <span className={`service-icon service-icon--${type}`} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}
