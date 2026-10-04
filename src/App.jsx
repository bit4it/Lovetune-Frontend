import { useUI } from './context/UIContext'
import { usePlayer } from './context/PlayerContext'
import Home from './screens/Home'
import Search from './screens/Search'
import Library from './screens/Library'
import Profile from './screens/Profile'
import NowPlaying from './screens/NowPlaying'
import { RoomEntry, RoomCreated } from './screens/RoomFlow'
import MiniPlayer from './components/layout/MiniPlayer'
import BottomNav from './components/layout/BottomNav'
import Toast from './components/layout/Toast'
import { ActionSheet, QueueSheet } from './components/sheets/Sheets'

const SCREENS = { home: Home, search: Search, lib: Library, user: Profile }

export default function App() {
  const { tab, nowPlaying, queueOpen, sheetSong, roomScreen } = useUI()
  const { current } = usePlayer()
  const Screen = SCREENS[tab]
  return (
    <div className="relative h-full w-full max-w-[430px] mx-auto overflow-hidden bg-[var(--bg)] sm:border-x sm:border-[var(--bd)]">
      <main key={tab} className="fade absolute inset-0 overflow-y-auto ns" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'calc(150px + env(safe-area-inset-bottom))' }}><Screen /></main>
      {!nowPlaying && <MiniPlayer />}
      <BottomNav />
      {nowPlaying && current && <NowPlaying />}
      {roomScreen === 'entry' && <RoomEntry />}
      {roomScreen === 'created' && <RoomCreated />}
      {queueOpen && <QueueSheet />}
      {sheetSong && <ActionSheet />}
      <Toast />
    </div>
  )
}
