import { supabase } from '../services/supabaseClient';
import { Comment } from '@/types/types';

export const fetchComments = async (): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from('Comments')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const addComment = async (
  newComment: string,
  nickname: string
): Promise<Comment[] | null> => {
  const { data, error } = await supabase
    .from('Comments')
    .insert([
      {
        content: newComment,
        created_at: new Date().toISOString(),
        nickname,
      },
    ])
    .select('*');

  if (error) throw new Error(error.message);
  return data;
};
