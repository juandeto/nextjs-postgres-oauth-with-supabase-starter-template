export default async function UserDashboardPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}
