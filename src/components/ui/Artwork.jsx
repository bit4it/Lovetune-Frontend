// Placeholder artwork. Swap for <img src={item.image}> once the API returns cover URLs.
export default function Artwork({ item, size = 48, radius = 12, className = '' }) {
  return <div className={`shrink-0 flex items-end p-1.5 overflow-hidden ${className}`} style={{ width: size, height: size, borderRadius: radius, background: `linear-gradient(135deg,${item.c[0]},${item.c[1]})` }}><span style={{ fontSize: size * .38, fontWeight: 800, opacity: .55, lineHeight: 1 }}>{(item.title || item.name)[0]}</span></div>
}
