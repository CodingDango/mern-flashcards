export default function Spinner({size}) {
  return (
    <span className="inline-block border-3 border-t-transparent border-white animate-spin rounded-full" style={{width: size, height: size}}>
      <span className="invisible absolute">Loading...</span>
    </span>
  )
}