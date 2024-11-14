import { supabase } from '../../lib/supabaseClient';

import { SUPABASE_TABLES } from '@/constants/supabaseTables';

import { Chat } from '@/types/chatTypes';

export const fetchChats = async (): Promise<Chat[]> => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLES.ANONYMOUS_CHATS)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};
