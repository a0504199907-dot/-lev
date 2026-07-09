type LogoProps = {
  className?: string;
  as?: "span" | "h1";
};

/** Script wordmark for "Lev Designs" rendered with the Allura script face. */
export default function Logo({ className, as = "span" }: LogoProps) {
  const Tag = as;
  return (
    <Tag className={`logo script ${className ?? ""}`} aria-label="Lev Designs">
      Lev Designs
    </Tag>
  );
}
