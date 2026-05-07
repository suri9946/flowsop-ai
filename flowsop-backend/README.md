# FlowSOP AI Backend

Node.js backend for FlowSOP AI. Handles video processing, OCR, and AI generation.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup FFmpeg:
   - Ensure FFmpeg is installed on your system.
   - Update `FFMPEG_PATH` in your `.env` file to point to your FFmpeg binary.
   - On Windows, it might be `C:/ffmpeg/bin/ffmpeg.exe`.

3. Environment Variables:
   - Copy `.env.example` to `.env` and fill in the values.
   - You need a Supabase project and an OpenRouter API key.

4. Supabase Setup:
   - Run `supabase-schema.sql` in your Supabase SQL Editor.
   - Create two storage buckets:
     - `videos`: private, 500MB max file size.
     - `screenshots`: public, 10MB max per file.

5. Run development server:
   ```bash
   npm run dev
   ```
