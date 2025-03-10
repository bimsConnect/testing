export default function Loading() {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <div className="h-10 w-40 bg-muted animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-96 max-w-full bg-muted animate-pulse rounded mx-auto"></div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden border bg-card text-card-foreground shadow">
              <div className="p-4 pb-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
                  <div>
                    <div className="h-5 w-32 bg-muted animate-pulse rounded mb-1"></div>
                    <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="h-4 w-full bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 w-full bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded mb-4"></div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <div key={starIndex} className="h-4 w-4 bg-muted animate-pulse rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  