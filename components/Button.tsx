"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "destructive";
  disabled?: boolean;
  className?: string;
  external?: boolean;
};

/** Reliquary button. Renders a Link when `href` is set, else a <button>. */
export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  external = false,
}: ButtonProps) {
  const cls = `btn-reliquary ${variant === "destructive" ? "btn-reliquary--destructive" : ""} ${className}`;
  const inner = (
    <>
      <span className="btn-reliquary__wash" aria-hidden />
      <span className="btn-reliquary__pin btn-reliquary__pin--tl" aria-hidden />
      <span className="btn-reliquary__pin btn-reliquary__pin--tr" aria-hidden />
      <span className="btn-reliquary__pin btn-reliquary__pin--bl" aria-hidden />
      <span className="btn-reliquary__pin btn-reliquary__pin--br" aria-hidden />
      <span className="lbl">{children}</span>
      <span className="btn-reliquary__arrow" aria-hidden />
    </>
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={cls}
    >
      {inner}
    </button>
  );
}
