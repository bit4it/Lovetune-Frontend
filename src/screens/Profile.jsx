import Avatar from '../components/ui/Avatar'
import Icon from '../components/ui/Icon'
import { ME } from '../data/mock'
export default function Profile() {
  return (
    <div className="px-5 pt-10 text-center">
      <div className="flex justify-center"><Avatar user={ME} size={96} ring /></div>
      <h1 className="text-2xl font-extrabold mt-4">{ME.name}</h1>
      <div className="grid grid-cols-3 gap-3 mt-6">{[['1,284', 'Songs played'], ['96h', 'Listened'], ['Arijit', 'Top artist']].map(([v, l]) => <div key={l} className="card py-4"><div className="font-bold gtext">{v}</div><div className="text-[11px] mut mt-1">{l}</div></div>)}</div>
      <div className="card mt-6 text-left divide-y divide-[var(--bd)]">{['Audio quality', 'Notifications', 'Privacy', 'Connected devices', 'Sign out'].map((x) => <div key={x} className="flex items-center justify-between h-14 px-4"><span className={x === 'Sign out' ? 'text-rose-400' : ''}>{x}</span><span className="mut"><Icon name="chev" size={18} /></span></div>)}</div>
    </div>
  )
}
