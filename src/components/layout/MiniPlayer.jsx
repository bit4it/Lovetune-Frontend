import Artwork from '../ui/Artwork'
import ProgressBar from '../ui/ProgressBar'
import Icon from '../ui/Icon'
import { IconButton } from '../ui/Button'
import { usePlayer } from '../../context/PlayerContext'
import { useRoom } from '../../context/RoomContext'
import { useUI } from '../../context/UIContext'
export default function MiniPlayer() {
  const { current: s, playing, pos, toggle } = usePlayer(), { live, room } = useRoom(), { setNowPlaying, setQueueOpen } = useUI()
  if (!s) return null
  return (
    <div className="fade absolute left-3 right-3 z-30" style={{ bottom: 'calc(72px + env(safe-area-inset-bottom))' }}>
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--bd)] bg-[var(--s2)]">
        <div className="flex items-center gap-3 p-2 pr-1">
          <button className="flex items-center gap-3 flex-1 min-w-0 text-left" onClick={() => setNowPlaying(true)}>
            <Artwork imageUrl={s.image} size={44} radius={10} />
            <div className="min-w-0"><div className="truncate text-sm font-semibold">{s.title}</div><div className="truncate text-xs mut">{s.artist}</div></div>
          </button>
          {live && <div className="flex items-center gap-1 px-2 py-1 rounded-full grad text-xs font-semibold"><Icon name="users" size={13} />{room.members.length}</div>}
          <IconButton icon={playing ? 'pause' : 'play'} fill onClick={toggle} />
          <IconButton icon="list" size={20} className="mut" onClick={() => setQueueOpen(true)} />
        </div>
        <ProgressBar pos={pos} dur={s.dur} thin />
      </div>
    </div>
  )
}
