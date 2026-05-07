import { supabase } from '../lib/supabase';
import fs from 'fs';

const getMimeType = (filePath: string): string => {
  if (filePath.endsWith('.mp4')) return 'video/mp4';
  if (filePath.endsWith('.mov')) return 'video/quicktime';
  if (filePath.endsWith('.png')) return 'image/png';
  return 'application/octet-stream';
};

export const uploadFile = async (filePath: string, bucket: string, destPath: string): Promise<string> => {
  const fileBuffer = fs.readFileSync(filePath);
  const mimeType = getMimeType(filePath);
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(destPath, fileBuffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(destPath);

  return publicUrl;
};
