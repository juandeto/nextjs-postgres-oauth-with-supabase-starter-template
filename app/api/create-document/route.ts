import { fillPdf } from '@/lib/fillPdf/fillPdf';
import { listFormFields } from '@/lib/fillPdf/pdfUtils';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const formData = await req.json();

  try {
    console.log('formData', formData);
    const pdfBuffer = await fillPdf(
      formData,
      './public/pdfs/fichaAfiliacionBuenosAires.pdf',
    );

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set(
      'Content-Disposition',
      'inline; filename="documento_generado.pdf"',
    );

    return new Response(pdfBuffer, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
    });
  }
}
