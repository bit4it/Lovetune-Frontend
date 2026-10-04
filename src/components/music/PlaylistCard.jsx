import Artwork from '../ui/Artwork'
export default function PlaylistCard({ playlist, className = 'w-40 shrink-0' }) {
  return <div className={`card p-3 ${className}`}><Artwork imageUrl={playlist.image} size={84} radius={14} /><div className="mt-3 font-semibold text-sm">{playlist.title}</div><div className="text-xs mut">{playlist.song_count} songs</div></div>
}
