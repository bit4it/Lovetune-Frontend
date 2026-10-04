import Icon from '../ui/Icon'
import { useUI } from '../../context/UIContext'
const TABS = [['home', 'Home'], ['search', 'Search'], ['lib', 'Library'], ['user', 'Profile']]
export default function BottomNav() {
  const { tab, setTab } = useUI()
  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 flex border-t border-[var(--bd)] bg-[#0b0b0ef5]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {TABS.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`flex-1 h-[72px] flex flex-col items-center justify-center gap-1 text-[11px] ${tab === k ? 'gtext font-semibold' : 'mut'}`}><span style={tab === k ? { color: '#d946ef' } : {}}><Icon name={k} /></span>{l}</button>)}
    </nav>
  )
}
