export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gold-500">Loading...</p>
      </div>
    </div>
  )
}
