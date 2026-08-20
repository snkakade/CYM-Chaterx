type ServiceIconProps = { type: string };

const paths: Record<string, React.ReactNode> = {
  distribution: <><circle cx="8" cy="8" r="2" /><circle cx="22" cy="7" r="2" /><circle cx="20" cy="22" r="2" /><path d="M10 8h10M9 10l9 10M21 9l-1 11" /></>,
  support: <><path d="M6 17v-3a9 9 0 0 1 18 0v3" /><path d="M6 16H3v6h5v-6H6Zm18 0h3v6h-5v-6h2ZM22 23c-1 3-3 4-7 4" /></>,
  website: <><rect x="3" y="5" width="24" height="19" rx="2" /><path d="M3 10h24M8 8h.01M12 8h.01M18 15l5 2-3 2 2 4-2 1-2-4-3 1 3-6Z" /></>,
  search: <><circle cx="13" cy="13" r="7" /><path d="m18 18 7 7M5 25h7M5 21h4" /></>,
  revenue: <><path d="M4 25V14M10 25V9M16 25V16M22 25V6" /><path d="m4 11 6-5 6 4 8-7M20 3h4v4" /></>,
  partnership: <><circle cx="10" cy="15" r="5" /><circle cx="20" cy="15" r="5" /><path d="M13 11a5 5 0 0 1 4 0M13 19a5 5 0 0 0 4 0" /></>,
};

export function ServiceIcon({ type }: ServiceIconProps) {
  return (
    <span className={`service-icon service-icon--${type}`} aria-hidden="true">
      <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {paths[type] ?? paths.partnership}
      </svg>
    </span>
  );
}
