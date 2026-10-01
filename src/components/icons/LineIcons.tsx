// Lucide icons are ISC licensed: https://lucide.dev/license

type LineIconProps = { size?: number; className?: string };

function Icon({ size = 20, className, children }: LineIconProps & { readonly children: React.ReactNode }) {
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

export function CompassIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></Icon>;
}

export function TrendIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></Icon>;
}

export function BuildingIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></Icon>;
}

export function HeadsetIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></Icon>;
}

export function SproutIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" /><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" /><path d="M5 21h14" /></Icon>;
}

export function SlidersIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" /><path d="M21 12h-9" /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" /></Icon>;
}

export function PackageIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><polyline points="3.29 7 12 12 20.71 7" /><path d="m7.5 4.27 9 5.15" /></Icon>;
}

export function ClockIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Icon>;
}

export function TargetIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>;
}

export function PenIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M13 21h8" /><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /></Icon>;
}

export function FileIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></Icon>;
}

export function ReceiptIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M12 17V7" /><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" /><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" /></Icon>;
}

export function MailIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></Icon>;
}

export function MapPinIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></Icon>;
}

export function CalendarClockIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M16 14v2.2l1.6 1" /><path d="M16 2v3" /><path d="M21 7.338V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2.338" /><path d="M3 9h5.859" /><path d="M8 2v3" /><circle cx="16" cy="16" r="6" /></Icon>;
}

export function MessageIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /></Icon>;
}

export function LinkedInIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></Icon>;
}

export function ArrowRightIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>;
}

export function PlusIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M5 12h14" /><path d="M12 5v14" /></Icon>;
}

export function UsersIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></Icon>;
}

export function InboxIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></Icon>;
}

export function BadgeCheckIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m16 9-5.5 5.5L8 12" /></Icon>;
}

export function ListChecksIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M13 5h8" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" /></Icon>;
}

export function ChartColumnIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></Icon>;
}

export function SearchIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></Icon>;
}

export function PresentationIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="m7 21 5-5 5 5" /></Icon>;
}

export function HandshakeIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></Icon>;
}

export function StoreIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" /><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" /><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" /></Icon>;
}

export function CheckIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Icon size={size} className={className}><path d="M20 6 9 17l-5-5" /></Icon>;
}
