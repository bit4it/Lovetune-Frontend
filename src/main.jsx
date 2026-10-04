import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { UIProvider } from './context/UIContext'
import { PlayerProvider } from './context/PlayerContext'
import { RoomProvider } from './context/RoomContext'

createRoot(document.getElementById('root')).render(
  <UIProvider><PlayerProvider><RoomProvider><App /></RoomProvider></PlayerProvider></UIProvider>
)
