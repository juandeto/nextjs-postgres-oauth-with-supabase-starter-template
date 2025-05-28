// lib/fillForm.ts
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { FichaFormValues } from '../schemas/schemas';
import { listFormFields } from './pdfUtils';

export async function fillPdf(formData: FichaFormValues, pdfDir: string) {
  const pdfPath = path.resolve(pdfDir);
  const existingPdfBytes = fs.readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 8;

  firstPage.drawText(formData.partido, {
    x: 10,
    y: 140,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
    rotate: degrees(90),
  });

  const form = pdfDoc.getForm();

  // reemplazo la ultima letra por 'a' para femeninos
  const estadoCivil =
    formData.estadoCivil && formData.sexo === 'F'
      ? formData.estadoCivil.slice(0, -1) + 'a'
      : formData.estadoCivil || '';

  form.getTextField('nombres').setText(formData.nombres);
  form.getTextField('apellidos').setText(formData.apellidos);
  form.getTextField('Text-JZXKlP1nUR').setText(formData.matricula);
  form.getTextField('sexo').setText(formData.sexo || '');
  form.getTextField('clase').setText(formData.clase || '');
  form.getTextField('fechaDeNacimiento').setText(
    new Date(formData.fechaNacimiento || '').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  );
  form.getTextField('nacionalidad').setText(formData.nacionalidad);
  form.getTextField('profesion').setText(formData.profesion || '');
  form.getTextField('estadoCivil').setText(estadoCivil);
  form.getTextField('distrito').setText(formData.distrito || '');
  form.getTextField('ciudad').setText(formData.localidad || '');
  form.getTextField('calle').setText(formData.calle || '');
  form.getTextField('numero').setText(formData.numero || '');
  form.getTextField('piso').setText(formData.piso || '');
  form.getTextField('depto').setText(formData.departamento || '');
  form.getTextField('observaciones').setText(formData.observaciones || '');
  form.getTextField('fecha').setText(
    new Date(formData.fechaAfiliacion || '').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  );

  console.log('form', form);

  // Opcional: "planchá" los campos para que no sean editables
  form.flatten();

  console.log('pdfDoc', pdfDoc);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
