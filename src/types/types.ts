export type Comment = {
  comment_id: string;
  nickname?: string;
  content: string;
  created_at: string;
};

export type AnonymousChatProps = {
  comments: Comment[];
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  handleSubmitComment: () => void;
};
