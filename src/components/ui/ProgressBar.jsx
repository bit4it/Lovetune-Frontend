export default function ProgressBar({ pos, dur, onSeek, thin }) {
  const p = (pos / dur) * 100
  if (thin) return <div className="h-[2px] bg-white/15"><div className="h-full grad" style={{ width: `${p}%` }} /></div>
  const seek = (e) => { const r = e.currentTarget.getBoundingClientRect(); onSeek(Math.round(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * dur)) }
  return <div onClick={seek} className="relative h-6 flex items-center"><div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden"><div className="h-full grad" style={{ width: `${p}%` }} /></div><div className="absolute w-4 h-4 rounded-full bg-white shadow" style={{ left: `calc(${p}% - 8px)` }} /></div>
}
