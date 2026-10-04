import SongListItem from './SongListItem'
import { usePlayer } from '../../context/PlayerContext'
import { useUI } from '../../context/UIContext'
export default function SongList({ songs, empty }) {
  const { current, play } = usePlayer(), { setSheetSong } = useUI()
  if (!songs.length) return <p className="px-5 mut">{empty}</p>
  return songs.map((s) => <SongListItem key={s.id} song={s} active={current?.id === s.id} onPlay={() => play(s)} onMore={() => setSheetSong(s)} />)
}
