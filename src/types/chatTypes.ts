export interface Chat {
  chat_id: string;
  nickname: string;
  content: string;
  created_at: string;
}

export interface AnonymousChatProps {
  chats: Chat[];
  newChat: string;
  setNewChat: React.Dispatch<React.SetStateAction<string>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  handleSubmitChat: () => void;
}
