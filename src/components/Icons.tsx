type IconProps = {
  size?: number;
  className?: string;
  stroke?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

const strokeProps = (w: number) => ({
  stroke: "currentColor",
  strokeWidth: w,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ---- UI icons ---- */
export const Bag = ({ size = 24, className, stroke = 1.4 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M6 8h12l-1 12H7L6 8Z" />
    <path {...strokeProps(stroke)} d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const User = ({ size = 24, className, stroke = 1.4 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle {...strokeProps(stroke)} cx="12" cy="8" r="4" />
    <path {...strokeProps(stroke)} d="M4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5" />
  </svg>
);

export const Heart = ({ size = 24, className, stroke = 1.4 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      {...strokeProps(stroke)}
      d="M12 20s-7-4.4-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7 2.7C19 15.6 12 20 12 20Z"
    />
  </svg>
);

export const Search = ({ size = 24, className, stroke = 1.4 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle {...strokeProps(stroke)} cx="11" cy="11" r="6" />
    <path {...strokeProps(stroke)} d="m20 20-3.5-3.5" />
  </svg>
);

export const ArrowLeft = ({ size = 24, className, stroke = 1.4 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </svg>
);

export const Phone = ({ size = 24, className, stroke = 1.4 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      {...strokeProps(stroke)}
      d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V19a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 5 4Z"
    />
  </svg>
);

export const Envelope = ({ size = 24, className, stroke = 1.4 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect {...strokeProps(stroke)} x="3" y="5" width="18" height="14" rx="2" />
    <path {...strokeProps(stroke)} d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

/* ---- category icons ---- */
export const Glass = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect {...strokeProps(stroke)} x="5" y="3" width="14" height="18" rx="2" />
    <path {...strokeProps(stroke)} d="M8 7h5M8 11h8M8 15h6" />
  </svg>
);

export const Canvas = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect {...strokeProps(stroke)} x="3" y="4" width="18" height="14" rx="1" />
    <path {...strokeProps(stroke)} d="m6 15 4-5 3 3.5 2-2.5 3 4" />
    <path {...strokeProps(stroke)} d="M9 18v2M15 18v2" />
  </svg>
);

export const Laser = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M12 3v6" />
    <path {...strokeProps(stroke)} d="M9 9h6l1.5 4-4.5 8-4.5-8L9 9Z" />
  </svg>
);

export const Frame = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect {...strokeProps(stroke)} x="4" y="4" width="16" height="16" rx="1" />
    <rect {...strokeProps(stroke)} x="8" y="8" width="8" height="8" rx="1" />
  </svg>
);

export const Print = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M7 9V4h10v5" />
    <rect {...strokeProps(stroke)} x="4" y="9" width="16" height="7" rx="1" />
    <rect {...strokeProps(stroke)} x="7" y="15" width="10" height="5" rx="1" />
  </svg>
);

export const Synagogue = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M12 2 6 7v13h12V7l-6-5Z" />
    <path {...strokeProps(stroke)} d="M12 2v3M10.5 3.5h3" />
    <path {...strokeProps(stroke)} d="M12 13a2 2 0 0 0-2 2v5h4v-5a2 2 0 0 0-2-2Z" />
  </svg>
);

export const Judaica = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M4 8v6M8 8v6M12 8v6M16 8v6M20 8v6" />
    <path {...strokeProps(stroke)} d="M4 14c0 2 1.5 3 4 3s4-1 4-3 1.5-3 4-3 4 1 4 3" />
    <path {...strokeProps(stroke)} d="M12 17v3H8v1h8v-1h-4Z" />
  </svg>
);

export const Buildings = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect {...strokeProps(stroke)} x="4" y="7" width="8" height="13" rx="1" />
    <rect {...strokeProps(stroke)} x="12" y="3" width="8" height="17" rx="1" />
    <path {...strokeProps(stroke)} d="M7 11h2M7 15h2M15 7h2M15 11h2M15 15h2" />
  </svg>
);

export const Stamp = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M9 3h6l-1 7h2a3 3 0 0 1 0 6H8a3 3 0 0 1 0-6h2L9 3Z" />
    <path {...strokeProps(stroke)} d="M5 20h14" />
  </svg>
);

export const Signs = ({ size = 48, className, stroke = 1.3 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path {...strokeProps(stroke)} d="M12 3v18" />
    <path {...strokeProps(stroke)} d="M12 5H6l-2 2.5L6 10h6" />
    <path {...strokeProps(stroke)} d="M12 12h6l2 2.5-2 2.5h-6" />
  </svg>
);

export const CATEGORY_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  glass: Glass,
  canvas: Canvas,
  laser: Laser,
  frame: Frame,
  print: Print,
  synagogue: Synagogue,
  judaica: Judaica,
  buildings: Buildings,
  stamp: Stamp,
  signs: Signs,
};
