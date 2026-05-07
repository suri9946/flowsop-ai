import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

export const extractFrames = (videoPath: string, outputDir: string, fps: string = '1/3'): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const ffmpegPath = process.env.FFMPEG_PATH;
    if (ffmpegPath) {
      ffmpeg.setFfmpegPath(ffmpegPath);
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
