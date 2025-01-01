import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

// POST request handler
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      full_name,
      email,
      phone_number,
      linkedin_profile,
      desired_job,
      country,
      city,
      state,
      zip_code
    } = await request.json();

    const { data, error } = await (await supabase)
      .from('personal_info')
      .insert([{
        full_name,
        email,
        phone_number,
        linkedin_profile,
        desired_job,
        country,
        city,
        state,
        zip_code
      }]);

    if (error) {
      console.error('Error inserting personal info:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Personal info created successfully:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
