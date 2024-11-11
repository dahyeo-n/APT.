import { supabase } from '../lib/supabaseClient';
import { Chat } from '@/types/chatTypes';

export const fetchChats = async (): Promise<Chat[]> => {
  const { data, error } = await supabase
    .from('Chats')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const addChat = async (
  newChat: string,
  nickname: string
): Promise<Chat[] | null> => {
  const { data, error } = await supabase
    .from('Chats')
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
