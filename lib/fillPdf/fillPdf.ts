// lib/fillForm.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { FichaFormValues } from '../schemas/schemas';

export async function fillPdf(formData: FichaFormValues, pdfDir: string) {
  const pdfPath = path.resolve(pdfDir);
  const existingPdfBytes = fs.readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  // Ejemplo de agregar texto
  firstPage.drawText(formData.nombres, {
    x: 100, // Coordenadas a ajustar
    y: 700,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(formData.apellidos, {
    x: 100,
    y: 680,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Agregar más campos aquí con coordenadas exactas...

  const pdfBytes = await pdfDoc.save();
  return pdfBytes; // Este buffer lo podés devolver como `application/pdf`
}
