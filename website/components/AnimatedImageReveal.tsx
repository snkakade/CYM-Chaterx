import Image from "next/image";

type AnimatedImageRevealProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function AnimatedImageReveal({ src, alt, priority = false, className = "", sizes = "(max-width: 900px) 100vw, 50vw" }: AnimatedImageRevealProps) {
  return (
    <div className={`image-reveal ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} />
      <span className="image-coordinate" aria-hidden="true">43° 12&apos; N · 05° 21&apos; E</span>
    </div>
  );
}
