import Artwork from '../ui/Artwork'

export default function AlbumCard({ album, onPlay }) {
  const artist =
    album.artist ||
    album.music ||
    album.artists?.map((artist) => artist.name).join(', ') ||
    ''
  

  return (
    <button
      onClick={onPlay}
      className="w-36 shrink-0 text-left"
    >
      <Artwork
        imageUrl={album.best_image}
        size={144}
        radius={18}
      />

      <div className="mt-2 truncate font-medium text-sm">
        {album.title}
      </div>

      <div className="truncate text-xs mut">
        {artist}
      </div>
    </button>
  )
}