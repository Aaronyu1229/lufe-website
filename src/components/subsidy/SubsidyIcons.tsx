/**
 * SubsidyIcons — inline SVG icons for the 4 subsidy categories.
 * Shared between SubsidyCard (popup) and /resources/subsidies page.
 * Stroke-based, inherits currentColor so accent classes can tint them.
 */

import type { Subsidy } from "@/data/subsidies";

interface IconProps {
  readonly size?: number;
  readonly className?: string;
}

export function GlobeIcon({ size = 28, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="5" ry="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 16H28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10H26" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M6 22H26" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function BoothIcon({ size = 28, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10L6 6H26L28 10V12H4V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 12V26H26V12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 26V18H20V26" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="22" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function FactoryIcon({ size = 28, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 28V14L12 18V14L20 18V10L28 10V28H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="8" y="22" width="3" height="4" stroke="currentColor" strokeWidth="1" />
      <rect x="15" y="22" width="3" height="4" stroke="currentColor" strokeWidth="1" />
      <rect x="22" y="22" width="3" height="4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function CartIcon({ size = 28, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 6H7L9 20H25L28 10H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="12" cy="26" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="26" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const iconMap: Record<Subsidy["iconKey"], (p: IconProps) => React.JSX.Element> = {
  globe: GlobeIcon,
  booth: BoothIcon,
  factory: FactoryIcon,
  cart: CartIcon,
};

export function SubsidyIcon({
  iconKey,
  size = 28,
  className = "",
}: {
  readonly iconKey: Subsidy["iconKey"];
  readonly size?: number;
  readonly className?: string;
}) {
  const Icon = iconMap[iconKey];
  return <Icon size={size} className={className} />;
}
