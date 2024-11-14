import { supabase } from '../../lib/supabaseClient';

import { Chat } from '@/types/chatTypes';

export const fetchChats = async (): Promise<Chat[]> => {
  const { data, error } = await supabase
    .from('anonymous_chats')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};