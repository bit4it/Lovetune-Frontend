import { createContext, useContext, useEffect, useState } from 'react'
import { SONGS } from '../data/mock'
import { realtime } from '../services/realtime'
const Ctx = createContext(null)
export const usePlayer = () => useContext(Ctx)

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [idx, setIdx] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0)
  const [liked, setLiked] = useState(new Set([0, 2]))
  const [recent, setRecent] = useState([SONGS[1], SONGS[2], SONGS[7], SONGS[5], SONGS[8]])
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const current = queue[idx] || null

  // Playback clock. When you have stream URLs, drive an <audio> element here instead and set pos from its timeupdate event.
  useEffect(() => { if (!playing) return; const t = setInterval(() => setPos((p) => p + 1), 1000); return () => clearInterval(t) }, [playing])
  useEffect(() => { if (current && pos >= current.dur) repeat ? setPos(0) : next() }, [pos])

  // Remote playback state (from realtime layer).
  useEffect(() => realtime.on('playback:state', ({ id, pos: p, playing: pl }) => {
    const s = SONGS.find((x) => x.id === id)
    if (s && s.id !== current?.id) { setQueue([s, ...SONGS.filter((x) => x.id !== s.id)]); setIdx(0) }
    if (p != null) setPos(p)
    if (pl != null) setPlaying(pl)
  }), [current?.id])

  const play = (s) => {
    setQueue([s, ...SONGS.filter((x) => x.id !== s.id)]); setIdx(0); setPos(0); setPlaying(true)
    setRecent((r) => [s, ...r.filter((x) => x.id !== s.id)].slice(0, 8)); realtime.send('playback:track', { id: s.id })
  }
  const jump = (i) => { setIdx(i); setPos(0); setPlaying(true); realtime.send('playback:track', { id: queue[i].id }) }
  const next = () => queue.length && jump(shuffle ? Math.floor(Math.random() * queue.length) : (idx + 1) % queue.length)
  const prev = () => (pos > 3 ? seek(0) : queue.length && jump((idx - 1 + queue.length) % queue.length))
  const seek = (t) => { setPos(t); realtime.send('playback:seek', { pos: t }) }
  const toggle = () => {
    if (!current) return play(SONGS[0])
    setPlaying(!playing); realtime.send(playing ? 'playback:pause' : 'playback:play', { pos })
  }
  const like = (id) => setLiked((l) => { const n = new Set(l); n.has(id) ? n.delete(id) : n.add(id); return n })
  const addNext = (s) => { if (!current) return play(s); setQueue((q) => { const n = [...q]; n.splice(idx + 1, 0, s); return n }) }
  const addToQueue = (s) => (current ? setQueue((q) => [...q, s]) : play(s))
  const removeFromQueue = (i) => { setQueue((q) => q.filter((_, j) => j !== i)); if (i < idx) setIdx(idx - 1) }

  return <Ctx.Provider value={{ queue, idx, current, playing, pos, liked, recent, shuffle, repeat, play, jump, next, prev, seek, toggle, like, addNext, addToQueue, removeFromQueue, toggleShuffle: () => setShuffle(!shuffle), toggleRepeat: () => setRepeat(!repeat) }}>{children}</Ctx.Provider>
}
