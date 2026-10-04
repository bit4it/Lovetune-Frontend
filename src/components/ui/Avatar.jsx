export default function Avatar({ user, size = 40, ring }) {
  return <div className="shrink-0 rounded-full flex items-center justify-center font-bold" style={{ width: size, height: size, fontSize: size * .4, background: `linear-gradient(135deg,${user.c[0]},${user.c[1]})`, boxShadow: ring ? '0 0 0 3px #0b0b0e,0 0 0 5px #a855f7' : 'none' }}>{user.initial}</div>
}
