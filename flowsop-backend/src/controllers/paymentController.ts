import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { utr, amount } = req.body;
    const user = req.user;

    if (!utr || utr.length < 10) {
      return res.status(400).json({ error: 'Invalid Transaction ID (UTR)' });
    }

    // Check if UTR already used to prevent fraud
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('utr', utr)
      .single();

    if (existingPayment) {
      return res.status(400).json({ error: 'This Transaction ID has already been used.' });
    }

    // In a real scenario, you'd call a bank API or wait for a webhook.
    // Since we are using a personal UPI ID, we'll "verify" it by checking UTR format
    // and then record it. For a production app, the admin would manually verify these
    // or you'd use a service like Razorpay.
    
    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount: amount || 50,
        utr: utr,
        status: 'completed', // For demo, we mark as completed immediately
        payment_method: 'upi'
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    // Add credits to user profile (50 credits for 50 INR)
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single();

    const newCredits = (profile?.credits || 0) + 50;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credits: newCredits, is_pro: true })
      .eq('id', user.id);

    if (updateError) throw updateError;

    res.json({ message: 'Payment verified successfully! 50 credits added.', credits: newCredits });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};
