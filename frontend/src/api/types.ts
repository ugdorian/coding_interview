export type User = {
  id: number;
  name: string;
  age: number;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

export type Comment = {
  id: number;
  content: string;
  userId: number;
  postId: number;
};

export type CreateUserRequest = {
  name: string;
  age: number;
};

export type CreatePostRequest = {
  title: string;
  content: string;
  userId: number;
};

export type CreateCommentRequest = {
  content: string;
  userId: number;
  postId: number;
};
