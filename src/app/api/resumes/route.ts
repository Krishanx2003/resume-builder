// app/api/resumes/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { title, full_name, email, phone, location } = await request.json();

    const { data, error } = await (await supabase)
      .from('resumes')
      .insert([{
        title,
        full_name,
        email,
        phone,
        location
      }]);

    if (error) {
      console.error('Error inserting resume:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Resume created successfully:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
