import { supabase } from '../../lib/supabaseClient';

import { SUPABASE_TABLES } from '@/constants/supabaseTables';

import { Chat } from '@/types/chatTypes';

export const addChat = async (
  newChat: string,
  nickname: string
): Promise<Chat[] | null> => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLES.ANONYMOUS_CHATS)
    .insert([
      {
        nickname,
        content: newChat,
        created_at: new Date().toISOString(),
      },
    ])
    .select('*');

  if (error) throw new Error(error.message);

  return data;
};
