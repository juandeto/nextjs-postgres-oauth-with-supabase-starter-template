import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export async function listFormFields(dir: string) {
  const pdfBytes = fs.readFileSync(dir);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  const fields = form.getFields();
  fields.forEach((field) => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`Field: ${name} (${type})`);
  });
}
