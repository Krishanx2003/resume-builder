import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

// POST request handler
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { jobTitle, companyName, country, state, startMonth, startYear, endMonth, endYear, currentlyWorkHere, responsibilities } = await request.json();

    // Insert the work experience data into the database
    const { data, error } = await (await supabase)
      .from('work_experience')
      .insert([{
        job_title: jobTitle,
        company_name: companyName,
        country,
        state,
        start_month: startMonth,
        start_year: startYear,
        end_month: endMonth,
        end_year: endYear,
        currently_work_here: currentlyWorkHere,
        responsibilities
      }]);

    if (error) {
      console.error('Error inserting work experience:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Work experience added successfully:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}