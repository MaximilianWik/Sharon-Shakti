"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import RoseWindow from "@/components/ornaments/RoseWindow";

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
        <a href={href} target="_blank" rel="noreferrer" className={cls} data-cursor="hover">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} data-cursor="hover">
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
      data-cursor={disabled ? undefined : "hover"}
    >
      {inner}
    </button>
  );
}

/** Circular icon button framed by a rose window. */
export function IconButton({
  children,
  onClick,
  label,
  href,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <>
      <RoseWindow className="frame" spokes={8} />
      <span className="relative z-10 flex h-5 w-5 items-center justify-center">
        {children}
      </span>
    </>
  );
  if (href) {
    return (
      <Link href={href} aria-label={label} className={`icon-btn ${className}`} data-cursor="hover">
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`icon-btn ${className}`}
      data-cursor="hover"
    >
      {content}
    </button>
  );
}
