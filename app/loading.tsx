export default function Loading() {
  return (
    <div className="container min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-2xl font-bold">Loading...</h1>
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
