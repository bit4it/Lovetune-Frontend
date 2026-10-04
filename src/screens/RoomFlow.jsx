import { useState } from 'react'
import Avatar from '../components/ui/Avatar'
import Icon from '../components/ui/Icon'
import { Button, IconButton } from '../components/ui/Button'
import { usePlayer } from '../context/PlayerContext'
import { useRoom } from '../context/RoomContext'
import { useUI } from '../context/UIContext'
import { SONGS } from '../data/mock'

const bg = { background: 'radial-gradient(100% 50% at 50% 0%,#a855f740,transparent 70%),var(--bg)' }
const Shell = ({ children }) => { const { setRoomScreen } = useUI(); return <div className="layer up z-50" style={bg}><div className="px-3 pt-3"><IconButton icon="x" onClick={() => setRoomScreen(null)} /></div>{children}</div> }

// Starting playback when a session begins; replace with "sync to host's current track" once realtime is wired.
function useEnterNowPlaying() {
  const { current, play } = usePlayer(), { setRoomScreen, setNowPlaying } = useUI()
  return () => { setRoomScreen(null); if (!current) play(SONGS[0]); setNowPlaying(true) }
}

export function RoomEntry() {
  const [code, setCode] = useState(''), { create, join } = useRoom(), { setRoomScreen, toast } = useUI(), enter = useEnterNowPlaying()
  return (
    <Shell>
      <div className="px-6 pt-10">
        <div className="text-5xl">🎧</div><h1 className="text-3xl font-extrabold mt-4">Listen Together</h1>
        <p className="mut mt-2">Create a private room and invite someone to listen with you.</p>
        <div className="mt-8"><Button onClick={async () => { await create(); setRoomScreen('created') }}><Icon name="plus" size={20} />Create Room</Button></div>
        <div className="flex items-center gap-3 my-6 mut text-xs"><div className="flex-1 h-px bg-[var(--bd)]" />OR<div className="flex-1 h-px bg-[var(--bd)]" /></div>
        <div className="font-semibold mb-3">Join a friend's room</div>
        <input value={code} maxLength={6} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Enter room code" className="w-full h-14 card px-5 text-center font-mono text-xl tracking-[.3em] outline-none focus:border-fuchsia-500/60" />
        <div className="mt-3"><Button ghost disabled={code.length < 6} onClick={async () => { await join(code); enter(); toast(`Joined room ${code}`) }}>Join Room</Button></div>
      </div>
    </Shell>
  )
}

export function RoomCreated() {
  const { room, simulateJoin } = useRoom(), { toast } = useUI(), enter = useEnterNowPlaying()
  if (!room) return null
  const last = room.members[room.members.length - 1]
  return (
    <Shell>
      <div className="px-6 pt-10 text-center fade">
        <h1 className="text-3xl font-extrabold">Your room is ready 🎧</h1>
        <div className="card mt-8 py-8" style={{ borderRadius: 24 }}><div className="text-xs tracking-widest mut">ROOM CODE</div><div className="font-mono text-5xl font-extrabold tracking-[.25em] mt-3 gtext pl-[.25em]">{room.code}</div></div>
        <p className="mut mt-4">Share this code with someone you want to listen with.</p>
        <div className="grid grid-cols-2 gap-3 mt-6"><Button ghost onClick={() => { navigator.clipboard?.writeText(room.code); toast('Code copied') }}><Icon name="copy" size={18} />Copy Code</Button><Button onClick={() => toast('Share sheet opened')}><Icon name="share" size={18} />Share Room</Button></div>
        {room.live ? (
          <div className="mt-8 fade"><div className="flex justify-center -space-x-2">{room.members.map((m) => <Avatar key={m.id} user={m} size={48} />)}</div><p className="mt-3 font-medium">{last.name} joined 🎉</p><div className="mt-4"><Button onClick={enter}>Start listening</Button></div></div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-3 mut"><div className="flex gap-2">{[0, 1, 2].map((i) => <span key={i} className="ring w-3 h-3 rounded-full bg-fuchsia-500" style={{ animationDelay: `${i * .3}s` }} />)}</div>Waiting for someone...<button onClick={simulateJoin} className="mt-4 text-xs underline">[dev] simulate friend joining</button></div>
        )}
      </div>
    </Shell>
  )
}
