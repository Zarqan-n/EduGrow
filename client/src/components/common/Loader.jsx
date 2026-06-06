export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-primary-600 rounded-full opacity-75 animate-pulse"></div>
        <div className="absolute inset-2 bg-bg-pale rounded-full"></div>
      </div>
    </div>
  )
}
