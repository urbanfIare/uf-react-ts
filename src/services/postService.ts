import api from "./api";
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostListResponse,
} from "../types/post";

export const postService = {
  // 게시글 목록 조회
  getPosts: async (page = 1, size = 10): Promise<PostListResponse> => {
    const response = await api.get(`/api/posts?page=${page - 1}&size=${size}`);
    return response.data;
  },

  // 게시글 상세 조회
  getPost: async (id: number): Promise<Post> => {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  },

  // 게시글 생성
  createPost: async (postData: CreatePostRequest): Promise<Post> => {
    const response = await api.post("/api/posts", postData);
    return response.data;
  },

  // 게시글 수정
  updatePost: async (
    id: number,
    postData: UpdatePostRequest
  ): Promise<Post> => {
    const response = await api.put(`/api/posts/${id}`, postData);
    return response.data;
  },

  // 게시글 삭제
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/api/posts/${id}`);
  },

  // 게시글 검색
  searchPosts: async (
    keyword: string,
    page = 1,
    size = 10
  ): Promise<PostListResponse> => {
    const response = await api.get(
      `/api/posts/search?keyword=${encodeURIComponent(keyword)}&page=${
        page - 1
      }&size=${size}`
    );
    return response.data;
  },

  // 카테고리별 게시글 조회
  getPostsByCategory: async (
    category: string,
    page = 1,
    size = 10
  ): Promise<PostListResponse> => {
    const response = await api.get(
      `/api/posts/category/${category}?page=${page - 1}&size=${size}`
    );
    return response.data;
  },
};
