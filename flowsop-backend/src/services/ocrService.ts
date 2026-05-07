import Tesseract from 'tesseract.js';

export interface OcrResult {
  frameIndex: number;
  text: string;
  imagePath: string;
}

export const performOCR = async (imagePaths: string[]): Promise<OcrResult[]> => {
  const results: OcrResult[] = [];
  
  // To avoid memory overflow, we can run them sequentially or in small batches.
  // For simplicity and stability, we'll run sequentially.
  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    try {
      const { data: { text } } = await Tesseract.recognize(
        imagePath,
        'eng',
        { logger: m => console.log(m) } // Optional: log progress
      );
      results.push({
        frameIndex: i,
        text: text.trim(),
        imagePath
      });
    } catch (error) {
      console.error(`Error processing OCR on ${imagePath}:`, error);
      // Still push an empty result to keep the index synced
      results.push({
        frameIndex: i,
        text: '',
        imagePath
      });
    }
  }

  return results;
};
