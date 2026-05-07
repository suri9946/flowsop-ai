export interface SopStep {
  stepNumber: number;
  instruction: string;
  screenshotIndex: number;
}

export interface SopDocument {
  id?: string;
  user_id?: string;
  title: string;
  summary: string;
  estimatedTime: string;
  tags: string[];
  steps: SopStep[];
  checklist: string[];
  video_url?: string;
  screenshot_urls?: string[];
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProcessingJob {
  id: string;
  userId: string;
  videoPath: string;
  originalFilename: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
