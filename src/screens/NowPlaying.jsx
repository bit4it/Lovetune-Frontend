import Artwork from '../components/ui/Artwork'
import Avatar from '../components/ui/Avatar'
import Icon from '../components/ui/Icon'
import ProgressBar from '../components/ui/ProgressBar'
import { Button, IconButton } from '../components/ui/Button'
import PlayerControls from '../components/music/PlayerControls'
import ReactionButton from '../components/music/ReactionButton'

import { usePlayer } from '../context/PlayerContext'
import { useRoom } from '../context/RoomContext'
import { useUI } from '../context/UIContext'

import { fmt } from '../lib/format'

export default function NowPlaying() {
  const {
    current: s,
    pos,
    duration,
    seek,
    liked,
    like,
  } = usePlayer()

  const {
    room,
    live,
    bubbles,
    react,
    leave,
  } = useRoom()

  const {
    setNowPlaying,
    setQueueOpen,
    setRoomScreen,
    toast,
  } = useUI()

  // Nothing is currently playing
  if (!s) {
    return null
  }

  const isLiked = liked.has(s.id)

  // API may not have color information
  const accent = s.c?.[0] || '#ec4899'

  return (
    <div
      className="layer up ns z-40"
      style={{
        background: `radial-gradient(
          120% 60% at 50% 0%,
          ${accent}55,
          transparent 70%
        ), var(--bg)`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3">
        <IconButton
          icon="down"
          onClick={() => setNowPlaying(false)}
        />

        <div className="text-xs tracking-widest mut">
          {live ? 'LISTENING TOGETHER' : 'NOW PLAYING'}
        </div>

        <IconButton
          icon="list"
          onClick={() => setQueueOpen(true)}
        />
      </div>

      <div className="px-6 pb-6 flex flex-col items-center">

        {/* Listening together */}
        {live && room && (
          <div className="fade flex flex-col items-center mt-3">
            <div className="flex items-center gap-3">
              {room.members.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3"
                >
                  {i > 0 && (
                    <span className="on">
                      <Icon name="plus" size={16} />
                    </span>
                  )}

                  <div className="relative">
                    <span
                      className="ring absolute inset-0 rounded-full bg-fuchsia-500/50"
                      style={{
                        animationDelay: `${i * 0.6}s`,
                      }}
                    />

                    <Avatar
                      user={m}
                      size={52}
                      ring
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 text-sm font-medium">
              {room.members.map((m) => m.name).join(' & ')}
              <span className="text-pink-400"> ❤️</span>
            </div>
          </div>
        )}

        {/* Artwork */}
        <div className="relative mt-5">
          <Artwork
            key={s.id}
            imageUrl={s.best_image}
            size={live ? 264 : 300}
            radius={28}
            className="fade shadow-2xl"
          />

          {bubbles.map((b) => (
            <span
              key={b.id}
              className="absolute text-3xl pointer-events-none"
              style={{
                left: b.x,
                bottom: 20,
                animation: 'float 2.2s ease-out forwards',
              }}
            >
              {b.emoji}
            </span>
          ))}
        </div>

        {/* Song information */}
        <div className="w-full mt-6 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-2xl font-extrabold truncate">
              {s.title}
            </div>

            <div className="mut truncate">
              {s.artist}
            </div>
          </div>

          <IconButton
            key={String(isLiked)}
            icon="heart"
            size={24}
            fill={isLiked}
            className={isLiked ? 'pop' : 'mut'}
            style={
              isLiked
                ? { color: '#ec4899' }
                : {}
            }
            onClick={() => like(s.id)}
          />
        </div>

        {/* Progress */}
        <div className="w-full mt-3">
          <ProgressBar
            pos={pos}
            dur={duration}
            onSeek={seek}
          />

          <div className="flex justify-between text-xs mut">
            <span>{fmt(pos)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full mt-3">
          <PlayerControls />
        </div>

        {/* Listening together */}
        {live ? (
          <div className="w-full mt-6 fade">

            <div className="flex justify-between">
              {['❤️', '😂', '🔥', '🥹', '👀'].map((emoji) => (
                <ReactionButton
                  key={emoji}
                  emoji={emoji}
                  onClick={() => react(emoji)}
                />
              ))}
            </div>

            {room && (
              <div className="card mt-5 p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {room.members.length} people listening
                  </div>

                  <div className="text-xs mut mt-1">
                    Room Code:{' '}
                    <span className="font-mono text-white tracking-widest">
                      {room.code}
                    </span>
                  </div>
                </div>

                <div className="flex">
                  <IconButton
                    icon="share"
                    onClick={() => toast('Invite link copied')}
                  />

                  <IconButton
                    icon="x"
                    className="text-rose-400"
                    onClick={() => {
                      leave()
                      toast('You left the room')
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full mt-6">
            <Button
              ghost
              onClick={() =>
                setRoomScreen(room ? 'created' : 'entry')
              }
            >
              <Icon name="users" size={20} />
              Start listening together
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}