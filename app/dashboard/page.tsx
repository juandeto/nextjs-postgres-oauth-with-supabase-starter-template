import { redirect } from 'next/navigation';

import { createClient } from '@/lib/auth/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/sign-in');
  }

  return <div>Dashboard</div>;
}
