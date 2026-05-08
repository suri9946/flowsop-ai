import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

export const extractFrames = (videoPath: string, outputDir: string, fps: string = '1/3'): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Use FFMPEG_PATH env var if set and exists, otherwise fall back to ffmpeg-static (works on Windows)
    const envPath = process.env.FFMPEG_PATH;
    let resolvedPath = ffmpegStatic;
    
    if (envPath && fs.existsSync(envPath)) {
      resolvedPath = envPath;
    } else if (!ffmpegStatic) {
      // Fallback for some Linux environments if ffmpeg is in PATH
      resolvedPath = 'ffmpeg';
    }

    console.log(`Using FFMPEG path: ${resolvedPath}`);
    if (resolvedPath) {
      ffmpeg.setFfmpegPath(resolvedPath);
    }

    const outputPattern = path.join(outputDir, 'frame_%04d.png');

    ffmpeg(videoPath)
      .outputOptions([`-vf fps=${fps}`])
      .output(outputPattern)
      .on('end', () => {
        // Read the directory to get the list of generated files
        fs.readdir(outputDir, (err, files) => {
          if (err) return reject(err);
          const pngFiles = files
            .filter(f => f.endsWith('.png'))
            .sort()
            .map(f => path.join(outputDir, f));
          resolve(pngFiles);
        });
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
};
