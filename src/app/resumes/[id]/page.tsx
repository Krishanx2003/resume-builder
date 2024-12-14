// app/resume/[id]/page.tsx
import { createClient } from '@/lib/server';
import ResumeDetail from '@/components/ResumeDetail';

const ResumeDetailPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { id } = params;

  const { data, error } = await (await supabase)
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return <div>Error loading resume</div>;
  }

  return <ResumeDetail resume={data} />;
};

export default ResumeDetailPage;
