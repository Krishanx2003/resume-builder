import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

// POST request handler
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { skills } = await request.json();

    const { data, error } = await (await supabase)
      .from('skills')
      .insert([{ skills }]);

    if (error) {
      console.error('Error inserting skills:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Skills created successfully:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
