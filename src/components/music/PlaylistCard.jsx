import Artwork from '../ui/Artwork'
export default function PlaylistCard({ playlist, className = 'w-40 shrink-0' }) {
  return <div className={`card p-3 ${className}`}><Artwork item={playlist} size={64} radius={14} /><div className="mt-3 font-semibold text-sm">{playlist.name}</div><div className="text-xs mut">{playlist.count} songs</div></div>
}
