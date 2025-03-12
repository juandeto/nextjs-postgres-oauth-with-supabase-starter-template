import { Login } from '../auth-page';
import { Suspense } from 'react';

export default function SignIn() {
  return (
    <Suspense>
      <Login mode="signin" />
    </Suspense>
  );
}
