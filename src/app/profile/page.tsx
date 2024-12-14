// app/profile/page.tsx
import { createClient } from '@/lib/server';

const Profile = async () => {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Last Sign In: {user.last_sign_in_at}</p>
      <p>Created At: {user.created_at}</p>
      <p>Updated At: {user.updated_at}</p>
    </div>
  );
};

export default Profile;
