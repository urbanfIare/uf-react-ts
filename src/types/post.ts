export interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
  category: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}

export interface PostListResponse {
  content: Post[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}
