import { Login } from '../auth-page';
import { Suspense } from 'react';

export default function SignUp() {
  return (
    <Suspense>
      <Login mode="signup" />
    </Suspense>
  );
}
