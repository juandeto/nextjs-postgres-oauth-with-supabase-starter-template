import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function generateDebugGrid(dir: string) {
  const inputPath = path.resolve(dir);
  const outputPath = path.resolve('./public/pdfs/debug-ficha.pdf');
  const existingPdfBytes = fs.readFileSync(inputPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const size = 6;

  for (let x = 0; x <= 600; x += 50) {
    for (let y = 0; y <= 800; y += 50) {
      firstPage.drawText(`(${x},${y})`, {
        x,
        y,
        size,
        font,
        color: rgb(1, 0, 0), // rojo
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);

  console.log('✅ PDF con grilla generado: debug-ficha.pdf');
}
