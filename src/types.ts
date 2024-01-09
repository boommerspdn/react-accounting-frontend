export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CommentType = {
  id: number;
  name: string;
  body: string;
  email: string;
  postId: number;
};