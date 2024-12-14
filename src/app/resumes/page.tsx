// app/resumes/page.tsx
import { createClient } from '@/lib/server';
import ResumeList from '@/components/ResumeList';

const Resumes = async () => {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const { data, error } = await (await supabase)
    .from('resumes')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    return <div>Error loading resumes</div>;
  }

  return <ResumeList resumes={data} />;
};

export default Resumes;
