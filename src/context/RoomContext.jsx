import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { realtime } from '../services/realtime'
import { FRIEND } from '../data/mock'
const Ctx = createContext(null)
export const useRoom = () => useContext(Ctx)

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(null) // { code, live, members }
  const [bubbles, setBubbles] = useState([])
  const addBubble = (emoji) => {
    const id = Math.random()
    setBubbles((b) => [...b, { id, emoji, x: 30 + Math.random() * 200 }])
    setTimeout(() => setBubbles((b) => b.filter((x) => x.id !== id)), 2300)
  }
  useEffect(() => {
    const offs = [
      realtime.on('room:member_joined', (m) => setRoom((r) => r && { ...r, live: true, members: [...r.members, m] })),
      realtime.on('room:member_left', (m) => setRoom((r) => { if (!r) return r; const members = r.members.filter((x) => x.id !== m.id); return { ...r, members, live: members.length > 1 } })),
      realtime.on('reaction', ({ emoji }) => addBubble(emoji)),
    ]
    return () => offs.forEach((f) => f())
  }, [])

  const value = {
    room, bubbles, live: !!room?.live,
    create: async () => { const r = await api.createRoom(); setRoom({ ...r, live: false }); realtime.connect(r.code) },
    join: async (code) => { const r = await api.joinRoom(code); setRoom({ ...r, live: true }); realtime.connect(r.code) },
    leave: async () => { await api.leaveRoom(room.code); realtime.disconnect(); setRoom(null) },
    react: (emoji) => { addBubble(emoji); realtime.send('reaction', { emoji }) },
    simulateJoin: () => realtime.dispatch({ type: 'room:member_joined', payload: FRIEND }), // dev only
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
