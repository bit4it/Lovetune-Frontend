import AlbumCard from '../components/music/AlbumCard'
import PlaylistCard from '../components/music/PlaylistCard'
import SongList from '../components/music/SongList'
import Avatar from '../components/ui/Avatar'
import { IconButton } from '../components/ui/Button'
import { usePlayer } from '../context/PlayerContext'
import { useRoom } from '../context/RoomContext'
import { useUI } from '../context/UIContext'
import { SONGS, PLAYLISTS, ME } from '../data/mock'

const Section = ({ title, children }) => <section className="mt-7"><h2 className="px-5 mb-3 text-xl font-bold">{title}</h2>{children}</section>

export default function Home() {
  const { recent, play } = usePlayer(), { room } = useRoom(), { setTab, setRoomScreen } = useUI()
  return (
    <div>
      <div className="flex items-center justify-between px-5 pt-6">
        <div><div className="text-sm mut">Welcome back</div><h1 className="text-2xl font-extrabold">Good evening, {ME.name}</h1></div>
        <div className="flex items-center"><IconButton icon="search" onClick={() => setTab('search')} /><button onClick={() => setTab('user')}><Avatar user={ME} ring /></button></div>
      </div>
      <div className="grad mx-5 mt-5 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/15" /><div className="absolute right-10 top-16 w-20 h-20 rounded-full bg-white/10" />
        <div className="relative">
          <div className="text-xs font-bold tracking-[.2em]">LISTEN TOGETHER 🎧</div>
          <div className="text-3xl font-extrabold mt-2 leading-tight">Music is better<br />together.</div>
          <button onClick={() => setRoomScreen(room ? 'created' : 'entry')} className="mt-5 h-12 px-6 rounded-full bg-white text-black font-semibold">{room ? 'Open room' : 'Start a Room'}</button>
          <button onClick={() => setRoomScreen('entry')} className="block mt-3 text-sm underline underline-offset-4">Join someone else's room</button>
        </div>
      </div>
      <Section title="Recently Played"><div className="hs">{recent.map((s) => <AlbumCard key={s.id} song={s} onPlay={() => play(s)} />)}</div></Section>
      <Section title="Made for You"><SongList songs={SONGS.slice(0, 5)} /></Section>
      <Section title="Your Playlists"><div className="hs">{PLAYLISTS.map((p) => <PlaylistCard key={p.id} playlist={p} />)}</div></Section>
    </div>
  )
}
