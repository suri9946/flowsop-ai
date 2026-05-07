import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      await supabase.auth.admin.signOut(token); // Not strictly required for JWT
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // Provided by auth middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ user: req.user });
  } catch (error: any) {
    console.error('GetMe error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
};
