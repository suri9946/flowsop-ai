import { supabase } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Authorization': session ? `Bearer ${session.access_token}` : '',
  };
};

export const api = {
  getAuthToken: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || '';
  },
  uploadVideo: async (file: File, parentSopId?: string) => {
    const headers = await getAuthHeaders();
    const formData = new FormData();
    formData.append('video', file);
    if (parentSopId) {
      formData.append('parent_sop_id', parentSopId);
    }

    const response = await fetch(`${API_URL}/sops/upload`, {
      method: 'POST',
      headers: {
        'Authorization': headers.Authorization
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to upload video');
    }
    return response.json();
  },

  getSops: async () => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/sops`, { headers });
    if (!response.ok) throw new Error('Failed to fetch SOPs');
    return response.json();
  },

  getSop: async (id: string) => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/sops/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch SOP');
    return response.json();
  },

  deleteSop: async (id: string) => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/sops/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to delete SOP');
    return response.json();
  },

  exportPdf: async (id: string) => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/export/${id}/pdf`, { headers });
    if (!response.ok) throw new Error('Failed to export PDF');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOP_${id}.pdf`;
    a.click();
  },
  getProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data || { credits: 3, is_pro: false };
  }
};

