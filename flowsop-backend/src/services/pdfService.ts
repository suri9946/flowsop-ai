import PDFDocument from 'pdfkit';
import { SopDocument } from '../types';
import axios from 'axios';

export const createPdfStream = async (sop: SopDocument, writeStream: NodeJS.WritableStream) => {
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(writeStream);

  // Title
  doc.fontSize(24).text(sop.title, { align: 'center' });
  doc.moveDown(0.5);

  // Metadata
  doc.fontSize(12).fillColor('gray')
    .text(`Estimated Time: ${sop.estimatedTime} | Tags: ${sop.tags.join(', ')}`, { align: 'center' });
  doc.moveDown(2);

  // Summary
  doc.fontSize(14).fillColor('black').text('Summary', { underline: true });
  doc.fontSize(12).text(sop.summary);
  doc.moveDown(2);

  // Steps
  doc.fontSize(16).text('Step-by-Step Instructions', { underline: true });
  doc.moveDown(1);

  for (const step of sop.steps) {
    doc.fontSize(14).text(`Step ${step.stepNumber}`);
    doc.fontSize(12).text(step.instruction);
    doc.moveDown(1);

    if (sop.screenshot_urls && sop.screenshot_urls[step.screenshotIndex]) {
      try {
        const imageUrl = sop.screenshot_urls[step.screenshotIndex];
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        doc.image(imageBuffer, { fit: [400, 300], align: 'center' });
        doc.moveDown(1);
      } catch (e) {
        console.error(`Failed to load image for PDF: ${sop.screenshot_urls[step.screenshotIndex]}`);
      }
    }
  }

  doc.addPage();
  doc.fontSize(16).text('Checklist', { underline: true });
  doc.moveDown(1);
  sop.checklist.forEach(item => {
    doc.fontSize(12).text(`[ ] ${item}`);
    doc.moveDown(0.5);
  });

  doc.end();
};
