import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  solid:
    "bg-accent text-on-accent hover:bg-white focus-visible:ring-accent",
  outline:
    "border border-white/30 text-white hover:border-white hover:bg-white/5 focus-visible:ring-accent",
  ghost:
    "text-zinc-300 hover:text-white hover:bg-white/5 focus-visible:ring-accent",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
  external,
  "aria-label": ariaLabel,
}: Props) {
  const classes = `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
