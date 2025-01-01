
import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';


// POST request handler
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const educationEntries = await request.json();

    for (const entry of educationEntries) {
      const { schoolName, degree, graduationMonth, graduationYear, relevantCourses } = entry;

      const { data, error } = await (await supabase)
        .from('education_info')
        .insert([{ schoolName, degree, graduationMonth, graduationYear, relevantCourses }]);

      if (error) {
        console.error('Error inserting education info:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('Education info created successfully:', data);
    }

    return NextResponse.json({ message: 'Education info created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}