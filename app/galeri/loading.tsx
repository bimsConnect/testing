export default function Loading() {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <div className="h-10 w-40 bg-muted animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-96 max-w-full bg-muted animate-pulse rounded mx-auto"></div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden bg-muted animate-pulse h-64"></div>
          ))}
        </div>
      </div>
    )
  }
  
  