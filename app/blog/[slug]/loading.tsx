export default function Loading() {
    return (
      <div className="container py-12">
        <div className="h-10 w-40 bg-muted animate-pulse rounded mb-6"></div>
  
        <div className="mx-auto max-w-3xl">
          <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-6"></div>
  
          <div className="h-5 w-32 bg-muted animate-pulse rounded mb-6"></div>
  
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-muted animate-pulse"></div>
  
          <div className="space-y-4">
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-3/4 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }
  
  