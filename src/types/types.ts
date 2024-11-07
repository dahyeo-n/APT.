export type Chat = {
  chat_id: string;
  nickname: string;
  content: string;
  created_at: string;
};

export type AnonymousChatProps = {
  chats: Chat[];
  newChat: string;
  setNewChat: React.Dispatch<React.SetStateAction<string>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  handleSubmitChat: () => void;
};
