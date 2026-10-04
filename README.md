# Together — Listen Together music player (React + Vite + Tailwind v4)
`npm install && npm run dev`

## Structure
- `src/services/api.js` — REST adapter (search, stream URL, rooms). Replace mock bodies with fetch calls.
- `src/services/realtime.js` — WebSocket seam: `connect/send/on/dispatch`. Implement transport here only.
- `src/context/` — `UIContext` (tabs, sheets), `PlayerContext` (queue, playback, likes), `RoomContext` (room, members, reactions).
- `src/components/` — `ui/` primitives, `music/` song/album/playlist pieces, `layout/` mini-player + nav, `sheets/`.
- `src/screens/` — Home, Search, Library, Profile, NowPlaying, RoomEntry, RoomCreated.
- `src/data/mock.js` — mock songs/playlists/users (delete once API is wired).

## Realtime events (names used by the UI)
Incoming (`realtime.on`): `room:member_joined`, `room:member_left`, `playback:state {id,pos,playing}`, `reaction {emoji}`
Outgoing (`realtime.send`): `playback:track {id}`, `playback:play|pause {pos}`, `playback:seek {pos}`, `reaction {emoji}`
