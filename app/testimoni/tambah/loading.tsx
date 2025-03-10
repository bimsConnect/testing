export default function Loading() {
    return (
      <div className="container max-w-2xl py-12">
        <div className="rounded-lg overflow-hidden border bg-card text-card-foreground shadow">
          <div className="p-6 space-y-2">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-1"></div>
            <div className="h-5 w-96 max-w-full bg-muted animate-pulse rounded mb-6"></div>
  
            <div className="space-y-4">
              <div>
                <div className="h-5 w-32 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              </div>
  
              <div>
                <div className="h-5 w-40 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              </div>
  
              <div>
                <div className="h-5 w-24 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-32 w-full bg-muted animate-pulse rounded"></div>
              </div>
  
              <div>
                <div className="h-5 w-16 bg-muted animate-pulse rounded mb-2"></div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-6 w-6 bg-muted animate-pulse rounded-full"></div>
                  ))}
                </div>
              </div>
  
              <div>
                <div className="h-5 w-36 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              </div>
  
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>
          </div>
  
          <div className="p-6 flex justify-between border-t">
            <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }
  
  