'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  function getError() {
    switch (error) {
      case 'email-already-exists':
        return 'Email already exists';
      default:
        return 'Sorry, something went wrong';
    }
  }

  return (
    <div className="container min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Error!</h1>
      <p>{getError()}</p>
    </div>
  );
}
