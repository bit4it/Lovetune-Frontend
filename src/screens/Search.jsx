import { useEffect, useState } from 'react'
import { COL } from '../data/colors'
import SearchBar from '../components/music/SearchBar'
import SongList from '../components/music/SongList'
import Icon from '../components/ui/Icon'

import { api } from '../services/api'

const GENRES = [
  'Bollywood',
  'Romantic',
  'Indie',
  'Sufi',
  'Chill',
  'Workout',
]

const GENRE_STYLES = [
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-500',
  'from-purple-500 to-indigo-500',
  'from-violet-500 to-fuchsia-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-green-600',
]

export default function Search() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    let ok = true

    if (!q.trim()) {
      setResults([])
      return
    }

    api.search(q).then((r) => {
      if (ok) {
        console.log("reponse -> ", r)
        setResults(r || [])
      }
    })

    return () => {
      ok = false
    }
  }, [q])

  return (
    <div>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Search
        </h1>
      </div>

      <div className="px-5">
        <SearchBar
          value={q}
          onChange={setQ}
        />
      </div>

      {q ? (
        <div className="mt-4">
          <SongList
            songs={results}
            empty={`No results for "${q}"`}
          />
        </div>
      ) : (
        <>
          <h2 className="px-5 mt-7 mb-3 text-xl font-bold">
            Browse
          </h2>

          <div className="grid grid-cols-2 gap-3 px-5">
          {GENRES.map((genre, i) => (
            <button
              key={genre}
              onClick={() => setQ(genre)}
              className="h-20 rounded-2xl font-bold flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${COL[i % COL.length][0]}cc, ${COL[i % COL.length][1]}99)`,
              }}
            >
              {genre}
            </button>
          ))}
        </div>

          <h2 className="px-5 mt-7 mb-3 text-xl font-bold">
            Recent searches
          </h2>

          {[
            'Arijit Singh',
            'Rockstar',
            'Mohit Chauhan',
          ].map((term) => (
            <button
              key={term}
              onClick={() => setQ(term)}
              className="flex items-center gap-3 w-full px-5 h-12 text-left mx-2"
            >
              <Icon
                name="search"
                size={18}
              />

              {term}
            </button>
          ))}
        </>
      )}
    </div>
  )
}