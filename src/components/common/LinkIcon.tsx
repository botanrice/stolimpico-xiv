export const LinkIcon = ({ src, alt, href, text }: { src: string; alt: string; href: string, text: string }) => (
  <a className="flex flex-col justify-center items-center" href={href} target="_blank" rel="noopener noreferrer">
    <img className="max-w-12 max-h-12" src={src} alt={alt} />
    <span className="text-xs text-slate-200 italic underline">{text}</span>
  </a>
)