import { supabase } from './supabase';

export const auth = {
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) throw error;
    return data;
  }
};
