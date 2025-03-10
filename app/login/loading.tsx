export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
        <div className="w-full max-w-md rounded-lg overflow-hidden border bg-card text-card-foreground shadow">
          <div className="p-6 space-y-2">
            <div className="h-8 w-24 bg-muted animate-pulse rounded mx-auto mb-1"></div>
            <div className="h-5 w-48 bg-muted animate-pulse rounded mx-auto mb-6"></div>
  
            <div className="space-y-4">
              <div>
                <div className="h-5 w-24 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              </div>
  
              <div>
                <div className="h-5 w-24 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              </div>
  
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>
          </div>
  
          <div className="p-6 flex justify-center border-t">
            <div className="h-5 w-40 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }
  
  