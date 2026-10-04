import Artwork from '../ui/Artwork'
import { IconButton } from '../ui/Button'
export default function SongListItem({ song, active, onPlay, onMore }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2 active:bg-white/5">
      <button className="flex items-center gap-3 flex-1 min-w-0 text-left" onClick={onPlay}>
        <Artwork item={song} size={52} />
        <div className="min-w-0"><div className={`truncate font-medium ${active ? 'gtext' : ''}`}>{song.title}</div><div className="truncate text-sm mut">{song.artist}</div></div>
      </button>
      <IconButton icon="more" className="mut" aria-label="More" onClick={onMore} />
    </div>
  )
}
