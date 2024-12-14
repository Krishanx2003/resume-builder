// app/api/resume/route.ts
import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { name, email, phone } = await req.json();
    const { data, error } = await supabase
      .from('contact')
      .insert([{ name, email, phone }]);

    if (error) {
      console.error('Supabase insert error:', error);
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.log('Inserted data:', data); // Debugging line
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('contact')
      .select('*');

    if (error) {
      console.error('Supabase select error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
