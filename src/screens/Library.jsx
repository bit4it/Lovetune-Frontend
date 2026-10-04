import { useState } from 'react'
import SongList from '../components/music/SongList'
import PlaylistCard from '../components/music/PlaylistCard'
import { usePlayer } from '../context/PlayerContext'
import { SONGS, PLAYLISTS } from '../data/mock'

export default function Library() {
  const [tab, setTab] = useState('Liked'), { liked, recent } = usePlayer()
  return (
    <div>
      <div className="px-5 pt-6 pb-4"><h1 className="text-3xl font-extrabold tracking-tight">Your Library</h1></div>
      <div className="flex gap-2 px-5 mb-3">{['Liked', 'Playlists', 'Recent'].map((x) => <button key={x} onClick={() => setTab(x)} className={`h-10 px-5 text-sm font-medium ${tab === x ? 'grad' : 'card'}`} style={{ borderRadius: 999 }}>{x}</button>)}</div>
      {tab === 'Liked' && <SongList songs={SONGS.filter((s) => liked.has(s.id))} empty="Tap the heart on a song to save it here." />}
      {tab === 'Recent' && <SongList songs={recent} />}
      {tab === 'Playlists' && <div className="grid grid-cols-2 gap-3 px-5">{PLAYLISTS.map((p) => <PlaylistCard key={p.id} playlist={p} className="" />)}</div>}
      <p className="px-5 mt-8 text-xs mut">Downloads &amp; offline coming later.</p>
    </div>
  )
}
