import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { createPdfStream } from '../services/pdfService';
import { SopDocument } from '../types';

export const exportPdf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data: sop, error } = await supabase
      .from('sops')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (error || !sop) {
      return res.status(404).json({ error: 'SOP not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sop.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf"`);

    await createPdfStream(sop as SopDocument, res);

  } catch (error) {
    console.error('PDF Export Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
