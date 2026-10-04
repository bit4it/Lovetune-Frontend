import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { realtime } from '../services/realtime'

const Ctx = createContext(null)

export const usePlayer = () => useContext(Ctx)

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)

  const [queue, setQueue] = useState([])
  const [idx, setIdx] = useState(-1)

  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0)
  const [duration, setDuration] = useState(0)

  const [liked, setLiked] = useState(new Set())
  const [recent, setRecent] = useState([])

  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const current = queue[idx] || null

  // Load current song
  useEffect(() => {
    const audio = audioRef.current

    if (!audio || !current?.playable_url) return

    audio.src = current.playable_url
    audio.load()

    setPos(0)
    setDuration(0)

    if (playing) {
      audio.play().catch((err) => {
        console.error('Audio playback failed:', err)
        setPlaying(false)
      })
    }
  }, [current?.id])

  // Audio events
  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    const handleTimeUpdate = () => {
      setPos(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handlePlay = () => {
      setPlaying(true)
    }

    const handlePause = () => {
      setPlaying(false)
    }

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        next()
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [repeat, queue.length, idx])

  // Play a song
  const play = async (song) => {
    if (!song?.playable_url) {
      console.warn('Song does not have playable_url:', song)
      return
    }

    setQueue((q) => {
      // Put selected song first and keep existing queue
      const filtered = q.filter((x) => x.id !== song.id)
      return [song, ...filtered]
    })

    setIdx(0)
    setPos(0)
    setPlaying(true)

    setRecent((r) => [
      song,
      ...r.filter((x) => x.id !== song.id),
    ].slice(0, 8))

    realtime.send('playback:track', {
      id: song.id,
    })
  }

  // Jump to queue item
  const jump = (i) => {
    const song = queue[i]

    if (!song?.playable_url) return

    setIdx(i)
    setPos(0)
    setPlaying(true)

    realtime.send('playback:track', {
      id: song.id,
    })
  }

  // Next
  const next = () => {
    if (!queue.length) return

    const nextIndex = shuffle
      ? Math.floor(Math.random() * queue.length)
      : (idx + 1) % queue.length

    jump(nextIndex)
  }

  // Previous
  const prev = () => {
    if (!queue.length) return

    if (pos > 3) {
      seek(0)
      return
    }

    const prevIndex = (idx - 1 + queue.length) % queue.length

    jump(prevIndex)
  }

  // Seek
  const seek = (time) => {
    const audio = audioRef.current

    if (!audio) return

    audio.currentTime = time
    setPos(time)

    realtime.send('playback:seek', {
      pos: time,
    })
  }

  // Play / Pause
  const toggle = async () => {
    const audio = audioRef.current

    if (!audio || !current) return

    if (audio.paused) {
      try {
        await audio.play()
        setPlaying(true)

        realtime.send('playback:play', {
          pos: audio.currentTime,
        })
      } catch (err) {
        console.error('Unable to play audio:', err)
      }
    } else {
      audio.pause()
      setPlaying(false)

      realtime.send('playback:pause', {
        pos: audio.currentTime,
      })
    }
  }

  // Like / Unlike
  const like = (id) => {
    setLiked((l) => {
      const n = new Set(l)

      if (n.has(id)) {
        n.delete(id)
      } else {
        n.add(id)
      }

      return n
    })
  }

  // Add next
  const addNext = (song) => {
    setQueue((q) => {
      const n = [...q]
      n.splice(idx + 1, 0, song)
      return n
    })
  }

  // Add to queue
  const addToQueue = (song) => {
    setQueue((q) => [...q, song])
  }

  // Remove from queue
  const removeFromQueue = (i) => {
    setQueue((q) => q.filter((_, j) => j !== i))

    if (i < idx) {
      setIdx((currentIdx) => currentIdx - 1)
    }
  }

  return (
    <Ctx.Provider
      value={{
        queue,
        idx,
        current,

        playing,
        pos,
        duration,

        liked,
        recent,

        shuffle,
        repeat,

        play,
        jump,
        next,
        prev,
        seek,
        toggle,

        like,
        addNext,
        addToQueue,
        removeFromQueue,

        toggleShuffle: () => setShuffle((s) => !s),
        toggleRepeat: () => setRepeat((r) => !r),
      }}
    >
      <audio ref={audioRef} preload="metadata" />

      {children}
    </Ctx.Provider>
  )
}