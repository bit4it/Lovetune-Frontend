// REST adapter. Swap each mock body for a fetch to `${API}/...` — the UI only depends on these signatures.
import { SONGS, ME, FRIEND } from '../data/mock'
const API = import.meta.env.VITE_API_URL
const code = () => Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.random() * 32 | 0]).join('')

export const api = {
  getSongs: async () => SONGS,                                                                                  // GET /songs/home
  search: async (q) => SONGS.filter((s) => (s.title + s.artist + s.album).toLowerCase().includes(q.toLowerCase())), // GET /search?q=
  getStreamUrl: async (song) => song.streamUrl,                                                                 // GET /songs/:id/stream
  createRoom: async () => ({ code: code(), members: [ME] }),                                                    // POST /rooms
  joinRoom: async (c) => ({ code: c, members: [ME, FRIEND] }),                                                  // POST /rooms/:code/join
  leaveRoom: async (c) => {},                                                                                   // POST /rooms/:code/leave
}
