export default function StaticPage({ title, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold text-stone-900">{title}</h1>
      <div className="prose prose-stone max-w-none mt-4">
        {children}
      </div>
    </div>
  )
}
