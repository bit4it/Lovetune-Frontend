import { useEffect, useState } from 'react'
import SearchBar from '../components/music/SearchBar'
import SongList from '../components/music/SongList'
import Icon from '../components/ui/Icon'
import { COL, SONGS } from '../data/mock'
import { api } from '../services/api'

const GENRES = ['Bollywood', 'Romantic', 'Indie', 'Sufi', 'Chill', 'Workout']
export default function Search() {
  const [q, setQ] = useState(''), [results, setResults] = useState(SONGS)
  useEffect(() => { let ok = true; api.search(q).then((r) => ok && setResults(r)); return () => { ok = false } }, [q])
  return (
    <div>
      <div className="px-5 pt-6 pb-4"><h1 className="text-3xl font-extrabold tracking-tight">Search</h1></div>
      <div className="px-5"><SearchBar value={q} onChange={setQ} /></div>
      {q ? <div className="mt-4"><SongList songs={results} empty={`No results for "${q}"`} /></div> : (
        <>
          <h2 className="px-5 mt-7 mb-3 text-xl font-bold">Browse</h2>
          <div className="grid grid-cols-2 gap-3 px-5">{GENRES.map((g, i) => <button key={g} onClick={() => setQ(i ? g : '')} className="h-20 rounded-2xl p-3 text-left font-bold" style={{ background: `linear-gradient(135deg,${COL[i][0]}cc,${COL[i][1]}99)` }}>{g}</button>)}</div>
          <h2 className="px-5 mt-7 mb-3 text-xl font-bold">Recent searches</h2>
          {['Arijit Singh', 'Rockstar', 'Mohit Chauhan'].map((t) => <button key={t} onClick={() => setQ(t)} className="flex items-center gap-3 w-full px-5 h-12 text-left"><Icon name="search" size={18} />{t}</button>)}
        </>
      )}
    </div>
  )
}
