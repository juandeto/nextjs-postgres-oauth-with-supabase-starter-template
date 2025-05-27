import { fillPdf } from '@/lib/fillPdf/fillPdf';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const formData = req.body;

  try {
    const pdfBuffer = await fillPdf(
      formData,
      './public/pdfs/fichaAfiliacionBuenosAires.pdf',
    );

    return new Response(pdfBuffer, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
}
