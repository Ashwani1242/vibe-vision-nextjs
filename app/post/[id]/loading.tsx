export default function Loading() {
  return (
    <div className="container py-8 animate-pulse">
      <div className="bg-card rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded" />
            </div>
          </div>
          <div className="h-8 w-3/4 bg-muted rounded mb-4" />
          <div className="h-64 w-full bg-muted rounded mb-6" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}