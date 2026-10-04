import { useUI } from '../../context/UIContext'
export default function Toast() {
  const { toastMsg } = useUI()
  return toastMsg ? <div className="fade absolute left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-full bg-white text-black text-sm font-medium shadow-xl" style={{ top: 'calc(16px + env(safe-area-inset-top))' }}>{toastMsg}</div> : null
}
