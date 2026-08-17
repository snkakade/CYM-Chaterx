import { ArrowIcon } from "./ArrowIcon";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text" | "light";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <a className={`button button--${variant} ${className}`} href={href}>
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}
