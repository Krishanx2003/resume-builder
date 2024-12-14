import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  const { title, full_name, email, phone, location, template } = await request.json();

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Render a custom HTML template based on the data
    const html = `
      <html>
        <body>
          <h1>${title}</h1>
          <p><strong>Full Name:</strong> ${full_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${location}</p>
        </body>
      </html>
    `;

    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
