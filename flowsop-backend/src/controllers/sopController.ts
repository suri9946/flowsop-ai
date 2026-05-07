import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { extractFrames } from '../services/videoProcessor';
import { performOCR } from '../services/ocrService';
import { generateSop } from '../services/aiService';
import { uploadFile } from '../services/storageService';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const uploadSop = async (req: Request, res: Response) => {
  const uploadedFile = req.file;
  let tmpJobDir: string | null = null;

  try {
    const user = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const jobId = uuidv4();
    const videoExt = path.extname(file.originalname);
    const videoDestPath = `${user.id}/${jobId}${videoExt}`;
    
    // Create initial DB record
    const { data: dbSop, error: dbError } = await supabase.from('sops').insert({
      user_id: user.id,
      title: 'Processing...',
      status: 'processing'
    }).select().single();

    if (dbError) throw dbError;

    // We can respond immediately and process in background, or await everything.
    // The prompt asks to return the full SOP object, so we wait. (For prod, background processing is better).
    
    // Step 2: Upload original video
    const videoUrl = await uploadFile(file.path, 'videos', videoDestPath);

    // Step 3: Extract frames
    tmpJobDir = path.join(process.cwd(), 'tmp', jobId);
    const frames = await extractFrames(file.path, tmpJobDir, '1/3');

    // Step 4: OCR
    const ocrResults = await performOCR(frames);

    // Step 5: Upload screenshots
    const screenshotUrls: string[] = [];
    for (let i = 0; i < frames.length; i++) {
      const framePath = frames[i];
      const destPath = `${user.id}/${jobId}/frame_${i}.png`;
      const url = await uploadFile(framePath, 'screenshots', destPath);
      screenshotUrls.push(url);
    }

    // Step 6 & 7: AI Service
    const generatedSop = await generateSop(ocrResults, screenshotUrls);

    // Step 8: Update DB
    const { data: finalSop, error: updateError } = await supabase.from('sops').update({
      title: generatedSop.title,
      summary: generatedSop.summary,
      estimated_time: generatedSop.estimatedTime,
      tags: generatedSop.tags,
      steps: generatedSop.steps,
      checklist: generatedSop.checklist,
      video_url: videoUrl,
      screenshot_urls: screenshotUrls,
      status: 'completed'
    }).eq('id', dbSop.id).select().single();

    if (updateError) throw updateError;

    // Cleanup temp files
    if (uploadedFile?.path && fs.existsSync(uploadedFile.path)) {
      fs.unlinkSync(uploadedFile.path);
    }
    if (tmpJobDir && fs.existsSync(tmpJobDir)) {
      fs.rmSync(tmpJobDir, { recursive: true, force: true });
    }

    // Step 9: Return final
    res.json(finalSop);
  } catch (error: any) {
    console.error('Error processing SOP:', error);
    
    // Ensure cleanup even on error
    if (uploadedFile?.path && fs.existsSync(uploadedFile.path)) {
      try {
        fs.unlinkSync(uploadedFile.path);
      } catch (e) {
        console.error('Failed to delete uploaded file:', e);
      }
    }
    if (tmpJobDir && fs.existsSync(tmpJobDir)) {
      try {
        fs.rmSync(tmpJobDir, { recursive: true, force: true });
      } catch (e) {
        console.error('Failed to delete temp directory:', e);
      }
    }
    
    res.status(500).json({ error: error.message || 'Processing failed' });
  }
};

export const getSops = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('sops').select('*').eq('user_id', req.user.id).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const getSopById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('sops').select('*').eq('id', id).eq('user_id', req.user.id).single();
  if (error) return res.status(404).json({ error: 'SOP not found' });
  res.json(data);
};

export const deleteSop = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('sops').delete().eq('id', id).eq('user_id', req.user.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted successfully' });
};

export const regenerateSop = async (req: Request, res: Response) => {
  // For simplicity, just return the existing for now, or you could rerun AI if text was saved.
  res.status(501).json({ error: 'Regeneration not implemented in this minimal version. Keep OCR text in DB to support this.' });
};
