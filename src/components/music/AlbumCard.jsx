import Artwork from '../ui/Artwork'
export default function AlbumCard({ song, onPlay }) {
  return <button onClick={onPlay} className="w-36 shrink-0 text-left"><Artwork item={song} size={144} radius={18} /><div className="mt-2 truncate font-medium text-sm">{song.title}</div><div className="truncate text-xs mut">{song.artist}</div></button>
}
