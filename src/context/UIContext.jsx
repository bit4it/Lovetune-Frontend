import { createContext, useContext, useRef, useState } from 'react'
const Ctx = createContext(null)
export const useUI = () => useContext(Ctx)

export function UIProvider({ children }) {
  const [tab, setTab] = useState('home')
  const [nowPlaying, setNowPlaying] = useState(false)
  const [queueOpen, setQueueOpen] = useState(false)
  const [sheetSong, setSheetSong] = useState(null)
  const [roomScreen, setRoomScreen] = useState(null) // null | 'entry' | 'created'
  const [toastMsg, setToastMsg] = useState('')
  const timer = useRef()
  const toast = (m) => { setToastMsg(m); clearTimeout(timer.current); timer.current = setTimeout(() => setToastMsg(''), 1800) }
  return <Ctx.Provider value={{ tab, setTab, nowPlaying, setNowPlaying, queueOpen, setQueueOpen, sheetSong, setSheetSong, roomScreen, setRoomScreen, toastMsg, toast }}>{children}</Ctx.Provider>
}
