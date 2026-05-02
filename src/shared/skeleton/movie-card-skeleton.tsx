export default function MovieCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden max-w-sm mx-auto w-full">
      {/* Header: User/Movie Profile Style */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded-full w-1/3 animate-pulse" />
          <div className="h-2 bg-gray-100 rounded-full w-1/4 animate-pulse" />
        </div>
      </div>

      {/* Main Content: The "Post" Image (1:1 Aspect Ratio) */}
      <div className="aspect-square w-full bg-gray-200 animate-pulse" />

      {/* Action Bar: Likes, Comments, etc. */}
      <div className="p-3 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-md bg-gray-200 animate-pulse" />
            <div className="w-6 h-6 rounded-md bg-gray-200 animate-pulse" />
            <div className="w-6 h-6 rounded-md bg-gray-200 animate-pulse" />
          </div>
          <div className="w-6 h-6 rounded-md bg-gray-200 animate-pulse" />
        </div>

        {/* Captions / Title */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-gray-200 rounded-full w-5/6 animate-pulse" />
          <div className="h-2 bg-gray-100 rounded-full w-1/4 animate-pulse pt-2" />
        </div>
      </div>
    </div>
  );
}
