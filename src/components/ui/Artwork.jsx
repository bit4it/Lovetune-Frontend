export default function Artwork({
  imageUrl,
  size = 48,
  radius = 12,
  className = '',
}) {
  return (
    <div
      className={`shrink-0 overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
      }}
    >
      <img
        src={imageUrl}
        alt={imageUrl || imageUrl || 'Artwork'}
        className="w-full h-full object-cover"
      />
    </div>
  )
}