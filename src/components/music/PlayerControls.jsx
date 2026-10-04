import { IconButton } from '../ui/Button'
import Icon from '../ui/Icon'
import { usePlayer } from '../../context/PlayerContext'
export default function PlayerControls() {
  const p = usePlayer()
  return (
    <div className="flex items-center justify-between w-full">
      <IconButton icon="shuf" active={p.shuffle} className={p.shuffle ? '' : 'mut'} onClick={p.toggleShuffle} />
      <IconButton icon="prev" size={28} fill onClick={p.prev} />
      <button className="play grad" aria-label="Play/Pause" onClick={p.toggle}><Icon name={p.playing ? 'pause' : 'play'} size={34} fill /></button>
      <IconButton icon="next" size={28} fill onClick={p.next} />
      <IconButton icon="rep" active={p.repeat} className={p.repeat ? '' : 'mut'} onClick={p.toggleRepeat} />
    </div>
  )
}
