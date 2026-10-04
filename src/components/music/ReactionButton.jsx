export default function ReactionButton({ emoji, onClick }) {
  return <button onClick={onClick} className="w-14 h-14 card text-2xl" style={{ borderRadius: 999 }}>{emoji}</button>
}
