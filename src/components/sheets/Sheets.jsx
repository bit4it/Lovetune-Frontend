import Artwork from '../ui/Artwork'
import Icon from '../ui/Icon'
import { IconButton } from '../ui/Button'
import { usePlayer } from '../../context/PlayerContext'
import { useUI } from '../../context/UIContext'
import { useRoom } from '../../context/RoomContext'

export function ActionSheet() {
  const { sheetSong: s, setSheetSong, setRoomScreen, toast } = useUI(), p = usePlayer(), { room } = useRoom()
  const items = [
    ['play', 'Play', () => p.play(s)],
    ['next', 'Play next', () => { p.addNext(s); toast('Playing next') }],
    ['list', 'Add to queue', () => { p.addToQueue(s); toast('Added to queue') }],
    ['plus', 'Add to playlist', () => toast('Added to Heartstrings')], // TODO: playlist picker
    ['users', 'Start listening together', () => { p.play(s); setRoomScreen(room ? 'created' : 'entry') }],
  ]
  return (
    <div className="absolute inset-0 z-[60] bg-black/60 flex items-end" onClick={() => setSheetSong(null)}>
      <div className="up w-full rounded-t-3xl p-4 bg-[var(--s1)]" style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--bd)]"><Artwork item={s} size={48} /><div><div className="font-semibold">{s.title}</div><div className="text-sm mut">{s.artist}</div></div></div>
        {items.map(([i, l, f]) => <button key={l} onClick={() => { f(); setSheetSong(null) }} className={`flex items-center gap-4 w-full h-14 text-left ${i === 'users' ? 'gtext font-semibold' : ''}`}><Icon name={i} size={20} />{l}</button>)}
      </div>
    </div>
  )
}

export function QueueSheet() {
  const { setQueueOpen } = useUI(), { queue, idx, jump, removeFromQueue } = usePlayer()
  return (
    <div className="absolute inset-0 z-[55] bg-black/60 flex items-end" onClick={() => setQueueOpen(false)}>
      <div className="up w-full max-h-[75%] overflow-y-auto ns rounded-t-3xl pt-4 bg-[var(--s1)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pb-2 text-lg font-bold">Queue</div>
        {queue.map((s, i) => (
          <div key={`${s.id}-${i}`} className="flex items-center gap-3 px-5 py-2">
            <button className="flex items-center gap-3 flex-1 min-w-0 text-left" onClick={() => jump(i)}><Artwork item={s} size={44} radius={10} /><div className="min-w-0"><div className={`truncate text-sm font-medium ${i === idx ? 'gtext' : ''}`}>{s.title}</div><div className="truncate text-xs mut">{s.artist}</div></div></button>
            {i === idx ? <span className="text-xs gtext font-semibold">Playing</span> : <IconButton icon="x" size={18} className="mut" onClick={() => removeFromQueue(i)} />}
          </div>
        ))}
      </div>
    </div>
  )
}
