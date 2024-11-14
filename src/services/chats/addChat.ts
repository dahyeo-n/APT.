import { supabase } from '../../lib/supabaseClient';

import { Chat } from '@/types/chatTypes';

export const addChat = async (
  newChat: string,
  nickname: string
): Promise<Chat[] | null> => {
  const { data, error } = await supabase
    .from('anonymous_chats')
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
