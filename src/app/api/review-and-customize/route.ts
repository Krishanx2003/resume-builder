// api/review-and-customize/route.ts

import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

// POST request handler
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { font, headingColor, textColor, accentColor, layout, template, email } = await request.json();

    // Fetch personal information from the database
    const { data: personalInfo, error: personalInfoError } = await (await supabase)
      .from('personal_info')
      .select('full_name, email, phone_number, linkedin_profile')
      .eq('email', email)
      .single();

    if (personalInfoError) {
      console.error('Error fetching personal info:', personalInfoError.message);
      return NextResponse.json({ error: personalInfoError.message }, { status: 500 });
    }

    if (!personalInfo) {
      return NextResponse.json({ error: 'Personal info not found' }, { status: 404 });
    }

    // Save customization settings (you can modify this part to save the settings as needed)
    const { data: customizationData, error: customizationError } = await (await supabase)
      .from('customization_settings')
      .insert([{ font, headingColor, textColor, accentColor, layout, template, email }]);

    if (customizationError) {
      console.error('Error saving customization settings:', customizationError.message);
      return NextResponse.json({ error: customizationError.message }, { status: 500 });
    }

    // Generate template preview (this is a placeholder, you can customize it as needed)
    const templatePreview = {
      full_name: personalInfo.full_name,
      email: personalInfo.email,
      phone_number: personalInfo.phone_number,
      linkedin_profile: personalInfo.linkedin_profile,
      font,
      headingColor,
      textColor,
      accentColor,
      layout,
      template,
    };

    console.log('Template preview generated:', templatePreview);
    return NextResponse.json(templatePreview, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
