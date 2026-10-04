import Icon from '../ui/Icon'
export default function SearchBar({ value, onChange }) {
  return <div className="flex items-center gap-3 h-14 px-5 card focus-within:border-fuchsia-500/60" style={{ borderRadius: 999 }}><span className="mut"><Icon name="search" /></span><input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search songs, artists, albums..." className="flex-1 bg-transparent outline-none text-[16px]" /></div>
}
